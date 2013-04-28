define(
	[ "jquery", "bootstrap", "jgrowl", "layout", "Markdown.Editor", "config",
		"underscore", "FileSaver", "css_browser_selector" ],
	function($) {
	
	var core = {};
	
	// Usage: callback = callback || core.doNothing;
	core.doNothing = function() {};
	
	// Time shared by others modules
	core.currentTime = new Date().getTime();
	function updateCurrentTime() {
		core.currentTime = new Date().getTime();
	}
	
	// Used for periodic tasks
	var intervalId = undefined;
	var periodicCallbacks = [];
	core.addPeriodicCallback = function(callback) {
		periodicCallbacks.push(callback);
	};
	
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
		value = core.trim(value);
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
	core.trim = function(str) {
		return str.replace(/^\s+|\s+$/g, '');
	};
	core.checkUrl = function(url) {
		if(url.indexOf("http") !== 0) {
			return "http://" + url;
		}
		return url;
	};
	
	core.saveFile = function(content, filename) {
		if(saveAs !== undefined) {
			var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
			saveAs(blob, filename);
		}
		else {
			var uriContent = "data:application/octet-stream;base64,"
				+ core.encodeBase64(content);
			window.open(uriContent, 'file');
		}
	};

	// Used by asyncRunner
	core.showWorkingIndicator = function(show) {
		if (show === false) {
			$(".working-indicator").removeClass("show");
			$("body").removeClass("working");
		} else {
			$(".working-indicator").addClass("show");
			$("body").addClass("working");
		}
	};

	// Used to show a notification message
	core.showMessage = function(msg, iconClass, options) {
		if(!msg) {
			return;
		}
		var endOfMsg = msg.indexOf("|");
		if(endOfMsg !== -1) {
			msg = msg.substring(0, endOfMsg);
			if(!msg) {
				return;
			}
		}
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
	core.addOfflineListener = function(callback) {
		offlineListeners.push(callback);		
	};
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
		converterType : "markdown-extra-prettify",
		layoutOrientation : "horizontal",
		scrollLink : true,
		editorFontSize : 14,
		commitMsg : "Published by StackEdit",
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
		
		// Scroll Link
		$("#input-settings-scroll-link").prop("checked", core.settings.scrollLink);
		
		// Converter type
		$("#input-settings-converter-type").val(core.settings.converterType);
		
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
		
		// Converter type
		newSettings.converterType = $("#input-settings-converter-type").val();
		
		// Scroll Link
		newSettings.scrollLink = $("#input-settings-scroll-link").prop("checked");
		
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
	
	// Used by Scroll Link feature
	var mdSectionList = [];
	var htmlSectionList = [];
	function pxToFloat(px) {
		return parseFloat(px.substring(0, px.length-2));
	}
	var buildSections = _.debounce(function() {
		
		// Try to find Markdown sections by looking for titles
		var editorElt = $("#wmd-input");
		mdSectionList = [];
		// This textarea is used to measure sections height
		var textareaElt = $("#md-section-helper");
		// It has to be the same width than wmd-input
		textareaElt.width(editorElt.width());
		// Consider wmd-input top padding
		var padding = pxToFloat(editorElt.css('padding-top'));
		var offset = 0, mdSectionOffset = 0;
		function addMdSection(sectionText) {
			var sectionHeight = padding;
			if(sectionText !== undefined) {
				textareaElt.val(sectionText);
				sectionHeight += textareaElt.prop('scrollHeight');
			}
			var newSectionOffset = mdSectionOffset + sectionHeight;
			mdSectionList.push({
				startOffset: mdSectionOffset,
				endOffset: newSectionOffset,
				height: sectionHeight
			});
			mdSectionOffset = newSectionOffset;
			padding = 0;
		}
		// Create MD sections by finding title patterns (excluding gfm blocs)
		var text = editorElt.val() + "\n\n";
		text.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm,
			function(match, title, matchOffset) {
				if(title) {
					// We just found a title which means end of the previous section
					// Exclude last \n of the section
					var sectionText = undefined;
					if(matchOffset > offset) {
						sectionText = text.substring(offset, matchOffset-1);
					}
					addMdSection(sectionText);
					offset = matchOffset;
				}
				return "";
			}
		);
		// Last section
		// Consider wmd-input bottom padding and exclude \n\n previously added
		padding += pxToFloat(editorElt.css('padding-bottom'));
		addMdSection(text.substring(offset, text.length-2));
		
		// Try to find corresponding sections in the preview
		var previewElt = $("#wmd-preview");
		htmlSectionList = [];
		var htmlSectionOffset = 0;
		var previewScrollTop = previewElt.scrollTop();
		// Each title element is a section separator
		previewElt.children("h1,h2,h3,h4,h5,h6").each(function() {
			// Consider div scroll position and header element top margin
			var newSectionOffset = $(this).position().top + previewScrollTop + pxToFloat($(this).css('margin-top'));
			htmlSectionList.push({
				startOffset: htmlSectionOffset,
				endOffset: newSectionOffset,
				height: newSectionOffset - htmlSectionOffset
			});
			htmlSectionOffset = newSectionOffset; 
		});
		// Last section
		var scrollHeight = previewElt.prop('scrollHeight');
		htmlSectionList.push({
			startOffset: htmlSectionOffset,
			endOffset: scrollHeight,
			height: scrollHeight - htmlSectionOffset
		});
		
		/*
		console.log("mdSectionList: " + _.map(mdSectionList, function(section) {
			return section.endOffset;
		}));
		*/
		
		// apply Scroll Link 
		lastEditorScrollTop = -9;
		lastPreviewScrollTop = -9;
		scrollLink();
	}, 500);
	
	// -9 is less than -5
	var lastEditorScrollTop = -9;
	var lastPreviewScrollTop = -9;
	var scrollLink = _.debounce(function() {
		if(mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
			return;
		}
		var editorElt = $("#wmd-input");
		var editorScrollTop = editorElt.scrollTop();
		var previewElt = $("#wmd-preview");
		var previewScrollTop = previewElt.scrollTop();
		function animate(srcScrollTop, srcSectionList, destElt, destSectionList) {
			// Find the section corresponding to the offset
			var sectionIndex = undefined;
			var srcSection = _.find(srcSectionList, function(section, index) {
				sectionIndex = index; 
				return srcScrollTop < section.endOffset;
			});
			if(srcSection === undefined) {
				// Something wrong in the algorithm...
				return -9;
			}
			var posInSection = (srcScrollTop - srcSection.startOffset) / srcSection.height;
			var destSection = destSectionList[sectionIndex];
			var destScrollTop = destSection.startOffset + destSection.height * posInSection;
			destScrollTop = _.min([destScrollTop, destElt.prop('scrollHeight') - destElt.outerHeight()]);
			destElt.animate({scrollTop: destScrollTop}, 800, function() {
				lastEditorScrollTop = editorElt.scrollTop();
				lastPreviewScrollTop = previewElt.scrollTop();
			});
			return destScrollTop;
		}
		if(Math.abs(editorScrollTop - lastEditorScrollTop) > 5) {
			previewScrollTop = animate(editorScrollTop, mdSectionList, previewElt, htmlSectionList);
		}
		else if(Math.abs(previewScrollTop - lastPreviewScrollTop) > 5) {
			editorScrollTop = animate(previewScrollTop, htmlSectionList, editorElt, mdSectionList);
		}
	}, 1000);

	// Create the layout
	var layout = undefined;
	core.createLayout = function() {
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
		if(core.settings.scrollLink === true) {
			layoutGlobalConfig.onresize = buildSections;
		}
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
		
		// ScrollLink
		if(core.settings.scrollLink === true) {
			$("#wmd-input, #wmd-preview").scroll(scrollLink);
		}
	};
	core.layoutRefresh = function() {
		if(layout !== undefined) {
			// Use defer to make sure UI has been updated
			_.defer(layout.resizeAll);
		}
	};
	
	// Create the PageDown editor
	var insertLinkCallback = undefined;
	core.createEditor = function(onTextChange) {
		$("#wmd-button-bar").empty();
		var converter = new Markdown.Converter();
		if(core.settings.converterType.indexOf("markdown-extra") === 0) {
			// Markdown extra customized converter
			var options = {};
			if(core.settings.converterType == "markdown-extra-prettify") {
				options.highlighter = "prettify";
			}
			Markdown.Extra.init(converter, options);
		}
		var firstChange = true;
		converter.hooks.chain("preConversion", function(text) {
			// Used to save changes when typing 
			if (!firstChange) {
				onTextChange();
			}
			return text;
		});
		var editor = new Markdown.Editor(converter);
		if(core.settings.scrollLink === true) {
			editor.hooks.chain("onPreviewRefresh", function() {
				// Modify scroll position of the preview not the editor
				lastEditorScrollTop = -9;
				buildSections();
				// Preview may change if images are loading
				$("#wmd-preview img").load(function() {
					lastEditorScrollTop = -9;
					buildSections();
				});
			});
		}
		// Custom insert link dialog
		editor.hooks.set("insertLinkDialog", function (callback) {
			insertLinkCallback = callback;
			core.resetModalInputs();
			$("#modal-insert-link").modal();
			return true;
	    });
		// Custom insert image dialog
		editor.hooks.set("insertImageDialog", function (callback) {
			insertLinkCallback = callback;
			core.resetModalInputs();
			$("#modal-insert-image").modal();
			return true;
		});
		if(core.settings.converterType == "markdown-extra-prettify") {
			editor.hooks.chain("onPreviewRefresh", prettyPrint);
		}
		
		editor.run();
		firstChange = false;

		// Hide default buttons
		$(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)")
			.addClass("btn").css("left", 0).find("span").hide();
		
		// Add customized buttons
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
	
	// Used to setup an empty localStorage or to upgrade an existing one
	function setupLocalStorage() {
		
		// Create the file system if not exist
		if (localStorage["file.list"] === undefined) {
			localStorage["file.list"] = ";";
		}
		
		// localStorage versioning
		var version = localStorage["version"];
		
		// Upgrade from v0 to v1
		if(version === undefined) {
			
			// Not used anymore
			localStorage.removeItem("sync.queue");
			localStorage.removeItem("sync.current");
			localStorage.removeItem("file.counter");			
			
			var fileIndexList = _.compact(localStorage["file.list"].split(";"));
			_.each(fileIndexList, function(fileIndex) {
				localStorage[fileIndex + ".publish"] = ";";
				var syncIndexList = _.compact(localStorage[fileIndex + ".sync"].split(";"));
				_.each(syncIndexList, function(syncIndex) {
					localStorage[syncIndex + ".contentCRC"] = "0";
					// We store title CRC only for Google Drive synchronization
					if(localStorage[syncIndex + ".etag"] !== undefined) {
						localStorage[syncIndex + ".titleCRC"] = "0";
					}
				});
			});
			version = "v1";
		}
		
		// Upgrade from v1 to v2
		if(version == "v1") {
			var gdriveLastChangeId = localStorage["sync.gdrive.lastChangeId"];
			if(gdriveLastChangeId) {
				localStorage["gdrive.lastChangeId"] = gdriveLastChangeId;
				localStorage.removeItem("sync.gdrive.lastChangeId");
			}
			var dropboxLastChangeId = localStorage["sync.dropbox.lastChangeId"];
			if(dropboxLastChangeId) {
				localStorage["dropbox.lastChangeId"] = dropboxLastChangeId;
				localStorage.removeItem("sync.dropbox.lastChangeId");
			}
			
			var SYNC_PROVIDER_GDRIVE = "sync." + PROVIDER_GDRIVE + ".";
			var SYNC_PROVIDER_DROPBOX = "sync." + PROVIDER_DROPBOX + ".";
			var fileIndexList = _.compact(localStorage["file.list"].split(";"));
			_.each(fileIndexList, function(fileIndex) {
				var syncIndexList = _.compact(localStorage[fileIndex + ".sync"].split(";"));
				_.each(syncIndexList, function(syncIndex) {
					var syncAttributes = {};
					if (syncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
						syncAttributes.provider = PROVIDER_GDRIVE;
						syncAttributes.id = syncIndex.substring(SYNC_PROVIDER_GDRIVE.length);
						syncAttributes.etag = localStorage[syncIndex + ".etag"];
						syncAttributes.contentCRC = localStorage[syncIndex + ".contentCRC"];
						syncAttributes.titleCRC = localStorage[syncIndex + ".titleCRC"];
					}
					else if (syncIndex.indexOf(SYNC_PROVIDER_DROPBOX) === 0) {
						syncAttributes.provider = PROVIDER_DROPBOX;
						syncAttributes.path = decodeURIComponent(syncIndex.substring(SYNC_PROVIDER_DROPBOX.length));
						syncAttributes.version = localStorage[syncIndex + ".version"];
						syncAttributes.contentCRC = localStorage[syncIndex + ".contentCRC"];
					}
					localStorage[syncIndex] = JSON.stringify(syncAttributes);
					localStorage.removeItem(syncIndex + ".etag");
					localStorage.removeItem(syncIndex + ".version");
					localStorage.removeItem(syncIndex + ".contentCRC");
					localStorage.removeItem(syncIndex + ".titleCRC");
				});
			});
			version = "v2";
		}
		
		// Upgrade from v2 to v3
		if(version == "v2") {
			var fileIndexList = _.compact(localStorage["file.list"].split(";"));
			_.each(fileIndexList, function(fileIndex) {
				if(!_.has(localStorage, fileIndex + ".sync")) {
					localStorage.removeItem(fileIndex + ".title");
					localStorage.removeItem(fileIndex + ".publish");
					localStorage.removeItem(fileIndex + ".content");
					localStorage["file.list"] = localStorage["file.list"].replace(";"
						+ fileIndex + ";", ";");
				}
			});
			version = "v3";
		}
		
		// Upgrade from v3 to v4
		if(version == "v3") {
			var currentFileIndex = localStorage["file.current"];
			if(currentFileIndex !== undefined && 
				localStorage["file.list"].indexOf(";" + currentFileIndex + ";") === -1)
			{
				localStorage.removeItem("file.current");
			}
			version = "v4";
		}
		localStorage["version"] = version;
	}
	// Setup the localStorage when starting
	setupLocalStorage();
	
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
	
	// Keep a reference to the fileManager
	core.setFileManager = function(fileManager) {
		core.fileManager = fileManager;
		runReadyCallbacks();
	};
	
	// onReady event callbacks
	var readyCallbacks = [];
	core.onReady = function(callback) {
		readyCallbacks.push(callback);
		runReadyCallbacks();
	};
	var documentLoaded = false;
	function runReadyCallbacks() {
		if(documentLoaded === true && core.fileManager !== undefined) {
			_.each(readyCallbacks, function(callback) {
				callback();
			});
			readyCallbacks = [];
		}
	}
	$(function() {
		documentLoaded = true;
		runReadyCallbacks();
	});
		
	core.onReady(function() {
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
		$(".dropdown-submenu > a").click(function(e) {
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

		// Settings loading/saving
		core.loadSettings();
		$(".action-load-settings").click(function() {
			core.loadSettings();
		});

		$(".action-apply-settings").click(function(e) {
			core.saveSettings(e);
			if(!e.isPropagationStopped()) {
				window.location.reload();
			}
		});
		
		$(".action-default-settings").click(function() {
			localStorage.removeItem("settings");
			window.location.reload();
		});
		
		$(".action-app-reset").click(function() {
			localStorage.clear();
			window.location.reload();
		});
		
		// UI layout
		$("#menu-bar, .ui-layout-center, .ui-layout-east, .ui-layout-south").removeClass("hide");
		core.createLayout();

		// Editor's textarea
		$("#wmd-input, #md-section-helper").css({
			// Apply editor font size
			"font-size": core.settings.editorFontSize + "px",
			"line-height": Math.round(core.settings.editorFontSize * (20/14)) + "px"
		});
		
		// Manage tab key
		$("#wmd-input").keydown(function(e) {
		    if(e.keyCode === 9) {
		        var value = $(this).val();
		        var start = this.selectionStart;
		        var end = this.selectionEnd;
		        // IE8 does not support selection attributes
		        if(start === undefined || end === undefined) {
		        	return;
		        }
		        $(this).val(value.substring(0, start) + "\t" + value.substring(end));
		        this.selectionStart = this.selectionEnd = start + 1;
		        e.preventDefault();
		    }
		});

		// Tooltips
		$(".tooltip-scroll-link").tooltip({
			html: true,
			container: '#modal-settings',
			placement: 'right',
			title: ['Scroll Link is a feature that binds together editor and preview scrollbars. ',
			        'It allows you to keep an eye on the preview while scrolling the editor and vice versa. ',
			        '<br><br>',
			        'The mapping between Markdown and HTML is based on the position of the title elements (h1, h2, ...) in the page. ',
			        'Therefore, if your document does not contain any title, the mapping will be linear and consequently less efficient.',
			        ].join("")
		});
		$(".tooltip-template").tooltip({
			html: true,
			container: '#modal-settings',
			placement: 'right',
			trigger: 'manual',
			title: ['Available variables:<br>',
			        '<ul><li><b>documentTitle</b>: document title</li>',
			        '<li><b>documentMarkdown</b>: document in Markdown format</li>',
			        '<li><b>documentHTML</b>: document in HTML format</li>',
			        '<li><b>publishAttributes</b>: attributes of the publish location (undefined when using "Save")</li></ul>',
			        'Examples:<br>',
			        _.escape('<title><%= documentTitle %></title>'),
			        '<br>',
			        _.escape('<div><%- documentHTML %></div>'),
			        '<br>',
			        _.escape('<% if(publishAttributes.provider == "github") print(documentMarkdown); %>'),
			        '<br><br><a target="_blank" href="http://underscorejs.org/#template">More info</a>',
			        ].join("")
		}).click(function(e) {
			$(this).tooltip('show');
			e.stopPropagation();
		});
		
		$(document).click(function(e) {
			$(".tooltip-template").tooltip('hide');
		});

		// Reset inputs
		$(".action-reset-input").click(function() {
			core.resetModalInputs();
		});
		
		// Do periodic tasks
		intervalId = window.setInterval(function() {
			updateCurrentTime();
			core.checkWindowUnique();
			if(isUserActive() === true) {
				_.each(periodicCallbacks, function(callback) {
					callback();
				});
				checkOnline();
			}
		}, 1000);
	});

	return core;
});

