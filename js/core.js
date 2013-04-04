define(["jquery", "bootstrap", "jgrowl", "layout", "Markdown.Editor"], function($) {
	
	var core = {};
	
	// Time shared by others modules
	core.currentTime = new Date().getTime();
	core.updateCurrentTime = function() {
		core.currentTime = new Date().getTime();
	};
	
	// Usage: callback = callback || core.doNothing;
	core.doNothing = function() {};
	

	// Useful function
	core.getInputValue = function(element, event) {
		var value = element.val();
		if (value !== undefined) {
			value = value.replace(/^\s+|\s+$/g, '');
			element.val(undefined);
		}
		if (value === undefined || value.length === 0) {
			element.stop(true, true).addClass("error").delay(400)
				.switchClass("error");
			if(event !== undefined) {
				event.stopPropagation();
			}
			return undefined;
		}
		return value;
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
		$.jGrowl("<i class='icon-white " + iconClass + "'></i> " + msg, options);
	};

	// Used to show an error message
	core.showError = function(msg) {
		core.showMessage(msg, "icon-warning-sign");
	};

	// Offline management
	core.isOffline = false;
	var offlineTime = core.currentTime;
	var offlineListeners = [];
	
	core.addOfflineListener = function(listener) {
		offlineListeners.push(listener);
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

	core.checkOnline = function() {
		// Try to reconnect if we are offline but we have some network
		if (core.isOffline === true && navigator.onLine === true
			&& offlineTime + CHECK_ONLINE_PERIOD < core.currentTime) {
			offlineTime = core.currentTime;
			// Try to download anything to test the connection
			$.ajax({ 
				url : "https://apis.google.com/js/client.js",
				timeout : AJAX_TIMEOUT, dataType : "script"
			}).done(function() {
				core.setOnline();
			});
		}
	};
	
	// Setting management
	var settings = { layoutOrientation : "horizontal" };
	core.loadSettings = function() {
		if (localStorage.settings) {
			$.extend(settings, JSON.parse(localStorage.settings));
		}

		// Layout orientation
		$("input:radio[name=radio-layout-orientation][value="
				+ settings.layoutOrientation + "]").prop("checked", true);
	};

	core.saveSettings = function() {

		// Layout orientation
		settings.layoutOrientation = $(
			"input:radio[name=radio-layout-orientation]:checked").prop("value");

		localStorage.settings = JSON.stringify(settings);
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
		if (settings.layoutOrientation == "horizontal") {
			$(".ui-layout-south").remove();
			$(".ui-layout-east").addClass("well").prop("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, {
					east__resizable : true,
					east__size : .5, 
					east__minSize : 200
				})
			);
		} else if (settings.layoutOrientation == "vertical") {
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
			$("#modal-insert-link").modal('show');
			return true;
	    });
		editor.hooks.set("insertImageDialog", function (callback) {
			insertLinkCallback = callback;
			$("#modal-insert-image").modal('show');
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
	
	core.init = function() {

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
		this.loadSettings();
		this.createLayout();

		$(".action-load-settings").click(function() {
			core.loadSettings();
		});

		$(".action-apply-settings").click(function() {
			core.saveSettings();
			location.reload();
		});
	};

	return core;
});

