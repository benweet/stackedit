define(
	[ "jquery", "file-manager", "google-helper", "dropbox-helper",
		"github-helper", "synchronizer", "publisher", "async-runner",
		"bootstrap", "jgrowl", "layout", "Markdown.Editor", "config",
		"underscore" ],
	function($, fileManager, googleHelper, dropboxHelper, githubHelper,
		synchronizer, publisher, asyncTaskRunner) {
	
	var core = {};
	
	// The interval Id for periodic tasks
	var intervalId = undefined;

	// Usage: callback = callback || core.doNothing;
	core.doNothing = function() {};
	
	// Time shared by others modules
	core.currentTime = new Date().getTime();
	function updateCurrentTime() {
		core.currentTime = new Date().getTime();
	}
	
	// Used to detect user activity
	var userReal = false;
	var userActive = false;
	var windowUnique = true;
	var userLastActivity = 0;
	function setUserActive() {
		userReal = true;
		userActive = true;
		userLastActivity = core.currentTime;
	};
	function isUserActive() {
		if(userActive === true 
			&& core.currentTime - userLastActivity > USER_IDLE_THRESHOLD) {
			userActive = false;
		}
		return userActive && windowUnique;
	}
	
	// Used to only have 1 window of the application in the same browser
	var windowId = undefined;
	core.checkWindowUnique = function() {
		if(userReal === false || windowUnique === false) {
			return;
		}
		if(windowId === undefined) {
			windowId = core.randomString();
			localStorage["frontWindowId"] = windowId;
		}
		var frontWindowId = localStorage["frontWindowId"];
		if(frontWindowId != windowId) {
			windowUnique = false;
			if(intervalId !== undefined) {
				clearInterval(intervalId);
			}
			$(".modal").modal("hide");
			$('#modal-non-unique').modal({
				backdrop: "static",
				keyboard: false
			});
		}
	};

	// Useful function for input control
	function inputError(element, event) {
		element.stop(true, true).addClass("error").delay(400).switchClass("error");
		if(event !== undefined) {
			event.stopPropagation();
		}
	}
	core.getInputValue = function(element, event, validationRegex) {
		var value = element.val();
		if (value === undefined) {
			inputError(element, event);
			return undefined;
		}
		// trim
		value = value.replace(/^\s+|\s+$/g, '');
		if((value.length === 0)
			|| (validationRegex !== undefined && !value.match(validationRegex))) {
			inputError(element, event);
			return undefined;
		}
		return value;
	};
	core.getInputIntValue = function(element, event, min, max) {
		var value = core.getInputValue(element, event);
		if(value === undefined) {
			return undefined;
		}
		value = parseInt(value);
		if((value === NaN)
			|| (min !== undefined && value < min)
			|| (max !== undefined && value > max)) {
			inputError(element, event);
			return undefined;
		}
		return value;
	};
	core.resetModalInputs = function() {
		$(".modal input[type=text]:not([disabled])").val("");
	};

	// Used by asyncTaskRunner
	core.showWorkingIndicator = function(show) {
		if (show === false) {
			$(".working-indicator").addClass("hide");
			$("body").removeClass("working");
		} else {
			$(".working-indicator").removeClass("hide");
			$("body").addClass("working");
		}
	};

	// Used to show a notification message
	core.showMessage = function(msg, iconClass, options) {
		options = options || {};
		iconClass = iconClass || "icon-info-sign";
		$.jGrowl("<i class='icon-white " + iconClass + "'></i> " + _.escape(msg), options);
	};

	// Used to show an error message
	core.showError = function(msg) {
		core.showMessage(msg, "icon-warning-sign");
	};

	// Offline management
	core.isOffline = false;
	var offlineTime = core.currentTime;
	var offlineListeners = [];
	
	core.setOffline = function() {
		offlineTime = core.currentTime;
		if(core.isOffline === false) {
			core.isOffline = true;
			core.showMessage("You are offline.", "icon-exclamation-sign msg-offline", {
				sticky : true,
				close : function() {
					core.showMessage("You are back online!", "icon-signal");
				}
			});
			for(var i=0; i<offlineListeners.length; i++) {
				offlineListeners[i]();
			}
		}
	};

	core.setOnline = function() {
		if(core.isOffline === true) {
			$(".msg-offline").parents(".jGrowl-notification").trigger(
				'jGrowl.beforeClose');
			core.isOffline = false;
			for(var i=0; i<offlineListeners.length; i++) {
				offlineListeners[i]();
			}
		}
	};

	function checkOnline() {
		// Try to reconnect if we are offline but we have some network
		if (core.isOffline === true && navigator.onLine === true
			&& offlineTime + CHECK_ONLINE_PERIOD < core.currentTime) {
			offlineTime = core.currentTime;
			// Try to download anything to test the connection
			$.ajax({ 
				url : "//www.google.com/jsapi",
				timeout : AJAX_TIMEOUT, dataType : "script"
			}).done(function() {
				core.setOnline();
			});
		}
	}
	
	// Setting management
	core.settings = {
		layoutOrientation : "horizontal",
		editorFontSize : 14,
		commitMsg : "Published by StackEdit.",
		template : ['<!DOCTYPE html>\n',
			'<html>\n',
			'<head>\n',
			'<title><%= documentTitle %></title>\n',
			'</head>\n',
			'<body><%= documentHTML %></body>\n',
			'</html>'].join("")
	};
	
	core.loadSettings = function() {
		if (localStorage.settings) {
			$.extend(core.settings, JSON.parse(localStorage.settings));
		}

		// Layout orientation
		$("input:radio[name=radio-layout-orientation][value="
				+ core.settings.layoutOrientation + "]").prop("checked", true);
		
		// Editor font size
		$("#input-settings-editor-font-size").val(core.settings.editorFontSize);
		
		// Commit message
		$("#input-settings-publish-commit-msg").val(core.settings.commitMsg);
		
		// Template
		$("#textarea-settings-publish-template").val(core.settings.template);
	};

	core.saveSettings = function(event) {
		var newSettings = {};
		
		// Layout orientation
		newSettings.layoutOrientation = $(
			"input:radio[name=radio-layout-orientation]:checked").prop("value");
		
		// Editor font size
		newSettings.editorFontSize = core.getInputIntValue($("#input-settings-editor-font-size"), event, 1, 99);

		// Commit message
		newSettings.commitMsg = core.getInputValue($("#input-settings-publish-commit-msg"), event);
		
		// Template
		newSettings.template = core.getInputValue($("#textarea-settings-publish-template"), event);
		
		if(!event.isPropagationStopped()) {
			core.settings = newSettings;
			localStorage.settings = JSON.stringify(newSettings);
		}
	};
	
	// Create the layout
	core.createLayout = function() {
		var layout = undefined;
		var layoutGlobalConfig = {
			closable : true, 
			resizable : false,
			slidable : false, 
			livePaneResizing : true,
			enableCursorHotkey : false, 
			spacing_open : 15, 
			spacing_closed : 15,
			togglerLength_open : 90, 
			togglerLength_closed : 90,
			stateManagement__enabled : false
		};
		if (core.settings.layoutOrientation == "horizontal") {
			$(".ui-layout-south").remove();
			$(".ui-layout-east").addClass("well").prop("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, {
					east__resizable : true,
					east__size : .5, 
					east__minSize : 200
				})
			);
		} else if (core.settings.layoutOrientation == "vertical") {
			$(".ui-layout-east").remove();
			$(".ui-layout-south").addClass("well").prop("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, { 
					south__resizable : true,
					south__size : .5, 
					south__minSize : 200
				})
			);
		}
		$(".ui-layout-toggler-north").addClass("btn").append(
			$("<b>").addClass("caret"));
		$(".ui-layout-toggler-south").addClass("btn").append(
			$("<b>").addClass("caret"));
		$(".ui-layout-toggler-east").addClass("btn").append(
			$("<b>").addClass("caret"));
		$("#navbar").click(function() {
			layout.allowOverflow('north');
		});
	};

	// Create the PageDown editor
	var insertLinkCallback = undefined;
	core.createEditor = function(onTextChange) {
		$("#wmd-button-bar").empty();
		var converter = Markdown.getSanitizingConverter();
		var firstChange = true;
		converter.hooks.chain("preConversion", function(text) {
			if (!firstChange) {
				onTextChange();
			}
			return text;
		});
		var editor = new Markdown.Editor(converter);
		editor.hooks.set("insertLinkDialog", function (callback) {
			insertLinkCallback = callback;
			core.resetModalInputs();
			$("#modal-insert-link").modal();
			return true;
	    });
		editor.hooks.set("insertImageDialog", function (callback) {
			insertLinkCallback = callback;
			core.resetModalInputs();
			$("#modal-insert-image").modal();
			return true;
		});
		
		editor.run();
		firstChange = false;

		$(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)")
			.addClass("btn").css("left", 0).find("span").hide();
		$("#wmd-bold-button").append($("<i>").addClass("icon-bold"));
		$("#wmd-italic-button").append($("<i>").addClass("icon-italic"));
		$("#wmd-link-button").append($("<i>").addClass("icon-globe"));
		$("#wmd-quote-button").append($("<i>").addClass("icon-indent-left"));
		$("#wmd-code-button").append($("<i>").addClass("icon-code"));
		$("#wmd-image-button").append($("<i>").addClass("icon-picture"));
		$("#wmd-olist-button").append($("<i>").addClass("icon-numbered-list"));
		$("#wmd-ulist-button").append($("<i>").addClass("icon-list"));
		$("#wmd-heading-button").append($("<i>").addClass("icon-text-height"));
		$("#wmd-hr-button").append($("<i>").addClass("icon-hr"));
		$("#wmd-undo-button").append($("<i>").addClass("icon-undo"));
		$("#wmd-redo-button").append($("<i>").addClass("icon-share-alt"));
	};
	
	// Base64 conversion
	core.encodeBase64 = function(str) {
	    if (str.length === 0) {
	        return "";
	    }
	    
		// UTF-8 to byte array
		var bytes = [], offset = 0, length, char;

		str = encodeURI(str);
		length = str.length;

		while (offset < length) {
			char = str[offset];
			offset += 1;

			if ('%' !== char) {
				bytes.push(char.charCodeAt(0));
			} else {
				char = str[offset] + str[offset + 1];
				bytes.push(parseInt(char, 16));
				offset += 2;
			}
		}

		// byte array to base64
	    var padchar = '=';
	    var alpha   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	    var i, b10;
	    var x = [];

	    var imax = bytes.length - bytes.length % 3;

	    for (i = 0; i < imax; i += 3) {
	        b10 = (bytes[i] << 16) | (bytes[i+1] << 8) | bytes[i+2];
	        x.push(alpha.charAt(b10 >> 18));
	        x.push(alpha.charAt((b10 >> 12) & 0x3F));
	        x.push(alpha.charAt((b10 >> 6) & 0x3f));
	        x.push(alpha.charAt(b10 & 0x3f));
	    }
	    switch (bytes.length - imax) {
	    case 1:
	        b10 = bytes[i] << 16;
	        x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
	               padchar + padchar);
	        break;
	    case 2:
	        b10 = (bytes[i] << 16) | (bytes[i+1] << 8);
	        x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
	               alpha.charAt((b10 >> 6) & 0x3f) + padchar);
	        break;
	    }
	    return x.join('');
	};
	
	// CRC32 algorithm
	var mHash = [ 0, 1996959894, 3993919788, 2567524794, 124634137,
		1886057615, 3915621685, 2657392035, 249268274, 2044508324,
		3772115230, 2547177864, 162941995, 2125561021, 3887607047,
		2428444049, 498536548, 1789927666, 4089016648, 2227061214,
		450548861, 1843258603, 4107580753, 2211677639, 325883990,
		1684777152, 4251122042, 2321926636, 335633487, 1661365465,
		4195302755, 2366115317, 997073096, 1281953886, 3579855332,
		2724688242, 1006888145, 1258607687, 3524101629, 2768942443,
		901097722, 1119000684, 3686517206, 2898065728, 853044451,
		1172266101, 3705015759, 2882616665, 651767980, 1373503546,
		3369554304, 3218104598, 565507253, 1454621731, 3485111705,
		3099436303, 671266974, 1594198024, 3322730930, 2970347812,
		795835527, 1483230225, 3244367275, 3060149565, 1994146192,
		31158534, 2563907772, 4023717930, 1907459465, 112637215,
		2680153253, 3904427059, 2013776290, 251722036, 2517215374,
		3775830040, 2137656763, 141376813, 2439277719, 3865271297,
		1802195444, 476864866, 2238001368, 4066508878, 1812370925,
		453092731, 2181625025, 4111451223, 1706088902, 314042704,
		2344532202, 4240017532, 1658658271, 366619977, 2362670323,
		4224994405, 1303535960, 984961486, 2747007092, 3569037538,
		1256170817, 1037604311, 2765210733, 3554079995, 1131014506,
		879679996, 2909243462, 3663771856, 1141124467, 855842277,
		2852801631, 3708648649, 1342533948, 654459306, 3188396048,
		3373015174, 1466479909, 544179635, 3110523913, 3462522015,
		1591671054, 702138776, 2966460450, 3352799412, 1504918807,
		783551873, 3082640443, 3233442989, 3988292384, 2596254646,
		62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523,
		3814918930, 2489596804, 225274430, 2053790376, 3826175755,
		2466906013, 167816743, 2097651377, 4027552580, 2265490386,
		503444072, 1762050814, 4150417245, 2154129355, 426522225,
		1852507879, 4275313526, 2312317920, 282753626, 1742555852,
		4189708143, 2394877945, 397917763, 1622183637, 3604390888,
		2714866558, 953729732, 1340076626, 3518719985, 2797360999,
		1068828381, 1219638859, 3624741850, 2936675148, 906185462,
		1090812512, 3747672003, 2825379669, 829329135, 1181335161,
		3412177804, 3160834842, 628085408, 1382605366, 3423369109,
		3138078467, 570562233, 1426400815, 3317316542, 2998733608,
		733239954, 1555261956, 3268935591, 3050360625, 752459403,
		1541320221, 2607071920, 3965973030, 1969922972, 40735498,
		2617837225, 3943577151, 1913087877, 83908371, 2512341634,
		3803740692, 2075208622, 213261112, 2463272603, 3855990285,
		2094854071, 198958881, 2262029012, 4057260610, 1759359992,
		534414190, 2176718541, 4139329115, 1873836001, 414664567,
		2282248934, 4279200368, 1711684554, 285281116, 2405801727,
		4167216745, 1634467795, 376229701, 2685067896, 3608007406,
		1308918612, 956543938, 2808555105, 3495958263, 1231636301,
		1047427035, 2932959818, 3654703836, 1088359270, 936918000,
		2847714899, 3736837829, 1202900863, 817233897, 3183342108,
		3401237130, 1404277552, 615818150, 3134207493, 3453421203,
		1423857449, 601450431, 3009837614, 3294710456, 1567103746,
		711928724, 3020668471, 3272380065, 1510334235, 755167117 ];
	core.crc32 = function(str) {
		var n = 0, crc = -1;
		for ( var i = 0; i < str.length; i++) {
			n = (crc ^ str.charCodeAt(i)) & 0xFF;
			crc = (crc >>> 8) ^ mHash[n];
		}
		crc = crc ^ (-1);
		if (crc < 0) {
	    	crc = 0xFFFFFFFF + crc + 1;
	    }
	    return crc.toString(16);
	};
	
	// Generates a random string
	core.randomString = function() {
		return _.random(4294967296).toString(36);
	};
	
	// Used to setup an empty localStorage 
	function setupLocalStorage() {
		if (localStorage["file.list"] === undefined) {
			localStorage["file.list"] = ";";
			localStorage["version"] = "v1";
		}		
	}

	// Used to upgrade an existing localStorage
	function upgradeLocalStorage() {
		var version = localStorage["version"];
		
		// from v0 to v1
		if(version === undefined) {
			
			// Not used anymore
			localStorage.removeItem("sync.queue");
			localStorage.removeItem("sync.current");
			localStorage.removeItem("file.counter");			
			
			var fileIndexList = localStorage["file.list"].split(";");
			for ( var i = 1; i < fileIndexList.length - 1; i++) {
				var fileIndex = fileIndexList[i];
				localStorage[fileIndex + ".publish"] = ";";
				var fileSyncIndexList = localStorage[fileIndex + ".sync"].split(";");
				for ( var j = 1; j < fileSyncIndexList.length - 1; j++) {
					var fileSyncIndex = fileSyncIndexList[j];
					localStorage[fileSyncIndex + ".contentCRC"] = "0";
					// We store title CRC only for Google Drive synchronization
					if(localStorage[fileSyncIndex + ".etag"] !== undefined) {
						localStorage[fileSyncIndex + ".titleCRC"] = "0";
					}
				}
			}
			version = "v1";
		}
		localStorage["version"] = version;
	}
	
	// Create an centered popup window
	core.popupWindow = function(url, title, w, h) {
		var left = (screen.width / 2) - (w / 2);
		var top = (screen.height / 2) - (h / 2);
		return window
			.open(
				url,
				title,
				'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='
					+ w
					+ ', height='
					+ h
					+ ', top='
					+ top
					+ ', left='
					+ left);
	};
	
	core.init = function() {
		setupLocalStorage();
		upgradeLocalStorage();

		// jGrowl configuration
		$.jGrowl.defaults.life = 5000;
		$.jGrowl.defaults.closer = false;
		$.jGrowl.defaults.closeTemplate = '';
		$.jGrowl.defaults.position = 'bottom-right';
		
		// listen to online/offline events
		$(window).on('offline', core.setOffline);
		$(window).on('online', core.setOnline);
		if (navigator.onLine === false) {
			core.setOffline();
		}
		
		// Detect user activity
		$(document).mousemove(setUserActive).keypress(setUserActive);
		
		// Avoid dropdown to close when clicking on submenu
		$('.dropdown-submenu > a').click(function(e) {
			e.stopPropagation();
		});
		
		// Click events on "insert link" and "insert image" dialog buttons
		$(".action-insert-link").click(function(e) {
			var value = core.getInputValue($("#input-insert-link"), e);
			if(value !== undefined) {
				insertLinkCallback(value);
			}
		});
		$(".action-insert-image").click(function(e) {
			var value = core.getInputValue($("#input-insert-image"), e);
			if(value !== undefined) {
				insertLinkCallback(value);
			}
		});
		$(".action-close-insert-link").click(function(e) {
			insertLinkCallback(null);
		});
		
		$("#menu-bar, .ui-layout-center, .ui-layout-east, .ui-layout-south").removeClass("hide");
		core.loadSettings();
		core.createLayout();
		
		// Apply editor font size
		$("#wmd-input").css({
			"font-size": core.settings.editorFontSize + "px",
			"line-height": Math.round(core.settings.editorFontSize * (20/14)) + "px"
		});

		$(".action-load-settings").click(function() {
			core.loadSettings();
		});

		$(".action-apply-settings").click(function(e) {
			core.saveSettings(e);
			if(!e.isPropagationStopped()) {
				window.location.reload();
			}
		});
		
		$(".action-reset-input").click(function() {
			core.resetModalInputs();
		});
		
		// Init asyncTaskRunner
		asyncTaskRunner.init(core);
		
		// Init helpers
		googleHelper.init(core, fileManager);
		dropboxHelper.init(core, fileManager);
		githubHelper.init(core, fileManager);
		
		// Init synchronizer
		synchronizer.init(core, fileManager);
		
		// Init publisher
		publisher.init(core, fileManager);
		
		offlineListeners.push(synchronizer.updateSyncButton);		
		offlineListeners.push(publisher.updatePublishButton);		
		
		// Init file manager
		fileManager.init(core);
		
		// Do periodic tasks
		intervalId = window.setInterval(function() {
			updateCurrentTime();
			core.checkWindowUnique();
			if(isUserActive() === false) {
				return;
			}
			synchronizer.sync();
			asyncTaskRunner.runTask();
			checkOnline();
		}, 1000);
	};

	return core;
});

