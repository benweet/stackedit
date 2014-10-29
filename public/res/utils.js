define([
	"jquery",
	"underscore",
	"storage",
	"crel",
	"xregexp",
	"stacktrace",
	"FileSaver"
], function($, _, storage, crel, XRegExp, printStackTrace, saveAs) {

	var utils = {};

	utils.msie = (function() {
		/**
		 * IE 11 changed the format of the UserAgent string.
		 * See http://msdn.microsoft.com/en-us/library/ms537503.aspx
		 */
		var msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1], 10);
		if (isNaN(msie)) {
			msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1], 10);
		}
		return msie;
	})();

	utils.urlResolve = (function() {
		var urlParsingNode = document.createElement("a");
		return function urlResolve(url) {
			var href = url;

			if (utils.msie) {
				// Normalize before parse.  Refer Implementation Notes on why this is
				// done in two steps on IE.
				urlParsingNode.setAttribute("href", href);
				href = urlParsingNode.href;
			}

			urlParsingNode.setAttribute('href', href);

			// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
			return {
				href: urlParsingNode.href,
				protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
				host: urlParsingNode.host,
				search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
				hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
				hostname: urlParsingNode.hostname,
				port: urlParsingNode.port,
				pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
					urlParsingNode.pathname : '/' + urlParsingNode.pathname
			};
		};
	})();

	// Faster than setTimeout (see http://dbaron.org/log/20100309-faster-timeouts)
	utils.defer = (function() {
		var timeouts = [];
		var messageName = "deferMsg";
		window.addEventListener("message", function(evt) {
			if(evt.source == window && evt.data == messageName) {
				evt.stopPropagation();
				if(timeouts.length > 0) {
					timeouts.shift()();
				}
			}
		}, true);
		return function(fn) {
			timeouts.push(fn);
			window.postMessage(messageName, "*");
		};
	})();

	// Implements underscore debounce using our defer function
	utils.debounce = function(func, context) {
		var isExpected = false;

		function later() {
			isExpected = false;
			func.call(context);
		}

		return function() {
			if(isExpected === true) {
				return;
			}
			isExpected = true;
			utils.defer(later);
		};
	};

	// Generates a 24 char length random id
	var idAlphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	utils.id = function() {
		var result = [];
		for(var i = 0; i < 24; i++) {
			result.push(idAlphabet[Math.random() * idAlphabet.length | 0]);
		}
		return result.join('');
	};

	// Return a parameter from the URL
	utils.getURLParameter = function(name) {
		// Parameter can be either a search parameter (&name=...) or a hash fragment parameter (#!name=...)
		var regex = new RegExp("(?:\\?|\\#\\!|&)" + name + "=(.+?)(?:&|\\#|$)");
		try {
			return decodeURIComponent(regex.exec(location.search + location.hash)[1]);
		}
		catch(e) {
			return undefined;
		}
	};

	// Transform a selector into a jQuery object
	function jqElt(element) {
		if(_.isString(element) || !element.val) {
			return $(element);
		}
		return element;
	}

	// For input control
	function inputError(element, event) {
		if(event !== undefined) {
			element.stop(true, true).addClass("error").delay(3000).queue(function() {
				$(this).removeClass("error");
				$(this).dequeue();
			});
			event.stopPropagation();
		}
	}

	// Return input value
	utils.getInputValue = function(element) {
		element = jqElt(element);
		return element.val();
	};

	// Set input value
	utils.setInputValue = function(element, value) {
		element = jqElt(element);
		element.val(value);
	};

	// Return input text value
	utils.getInputTextValue = function(element, event, validationRegex) {
		element = jqElt(element);
		var value = element.val();
		if(value === undefined) {
			inputError(element, event);
			return undefined;
		}
		// trim
		value = utils.trim(value);
		if((value.length === 0) || (validationRegex !== undefined && !value.match(validationRegex))) {
			inputError(element, event);
			return undefined;
		}
		return value;
	};

	// Return input number value
	function getInputNumValue(isFloat, element, event, min, max) {
		element = jqElt(element);
		var value = utils.getInputTextValue(element, event);
		if(value === undefined) {
			return undefined;
		}
		value = isFloat ? parseFloat(value) : parseInt(value, 10);
		if(isNaN(value) || (min !== undefined && value < min) || (max !== undefined && value > max)) {
			inputError(element, event);
			return undefined;
		}
		return value;
	}

	// Return input integer value
	utils.getInputIntValue = _.partial(getInputNumValue, false);

	// Return input float value
	utils.getInputFloatValue = _.partial(getInputNumValue, true);

	// Return input value and check that it's a valid RegExp
	utils.getInputRegExpValue = function(element, event) {
		element = jqElt(element);
		var value = utils.getInputTextValue(element, event);
		if(value === undefined) {
			return undefined;
		}
		try {
			new RegExp(value);
		}
		catch(e) {
			inputError(element, event);
			return undefined;
		}
		return value;
	};

	// Return input value and check that it's a valid JavaScript object
	utils.getInputJsValue = function(element, event) {
		element = jqElt(element);
		var value = utils.getInputTextValue(element, event);
		if(value === undefined) {
			return undefined;
		}
		try {
			/*jshint evil:true */
			eval("var test=" + value);
			/*jshint evil:false */
		}
		catch(e) {
			inputError(element, event);
			return undefined;
		}
		return value;
	};

	// Return input value and check that it's a valid JSON
	utils.getInputJSONValue = function(element, event) {
		element = jqElt(element);
		var value = utils.getInputTextValue(element, event);
		if(value === undefined) {
			return undefined;
		}
		try {
			JSON.parse(value);
		}
		catch(e) {
			inputError(element, event);
			return undefined;
		}
		return value;
	};

	// Return checkbox boolean value
	utils.getInputChecked = function(element) {
		element = jqElt(element);
		return element.prop("checked");
	};

	// Set checkbox state
	utils.setInputChecked = function(element, checked) {
		element = jqElt(element);
		element.prop("checked", checked).change();
	};

	// Get radio button value
	utils.getInputRadio = function(name) {
		return $("input:radio[name=" + name + "]:checked").prop("value");
	};

	// Set radio button value
	utils.setInputRadio = function(name, value) {
		$("input:radio[name=" + name + "][value=" + value + "]").prop("checked", true).change();
	};

	// Reset input control in all modals
	utils.resetModalInputs = function() {
		$(".modal input[type=text]:not([disabled]), .modal input[type=password], .modal textarea").val("");
		$(".modal input[type=checkbox]").prop("checked", false).change();
	};

	// Basic trim function
	utils.trim = function(str) {
		return $.trim(str);
	};

	// Slug function
	var nonWordChars = XRegExp('[^\\p{L}\\p{N}-]', 'g');
	utils.slugify = function(text) {
		return text.toLowerCase().replace(/\s/g, '-') // Replace spaces with -
			.replace(nonWordChars, '') // Remove all non-word chars
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	};

	// Check an URL
	utils.checkUrl = function(url, addSlash) {
		if(!url) {
			return url;
		}
		if(url.indexOf("http") !== 0) {
			url = "http://" + url;
		}
		if(addSlash && url.indexOf("/", url.length - 1) === -1) {
			url += "/";
		}
		return url;
	};

	// Create the modal element and add to the body
	utils.addModal = function(id, content) {
		var modal = crel('div', {
			class: 'modal ' + id
		});
		modal.innerHTML = content;
		document.body.appendChild(modal);
	};

	// Create a backdrop and add to the body
	utils.createBackdrop = function(parent) {
		var result = crel('div', {
			'class': 'modal-backdrop fade'
		});
		parent = parent || document.body;
		parent.appendChild(result);
		result.offsetWidth; // force reflow
		result.className = result.className + ' in';
		result.removeBackdrop = function() {
			result.className = 'modal-backdrop fade';
			setTimeout(function() {
				result.parentNode.removeChild(result);
			}, 150);
		};
		return result;
	};

	var openedTooltip;
	utils.createTooltip = function(selector, content) {
		_.each(document.querySelectorAll(selector), function(tooltipElt) {
			var $tooltipElt = $(tooltipElt);
			$tooltipElt.tooltip({
				html: true,
				container: $tooltipElt.parents('.modal-content'),
				placement: 'right',
				trigger: 'manual',
				title: content
			}).click(function() {
				var elt = this;
				if(openedTooltip && openedTooltip[0] === elt) {
					return;
				}
				utils.defer(function() {
					openedTooltip = $(elt).tooltip('show');
				});
			});
		});
	};

	// Create an centered popup window
	utils.popupWindow = function(url, title, width, height) {
		var left = (screen.width / 2) - (width / 2);
		var top = (screen.height / 2) - (height / 2);
		return window.open(url, title, [
			'toolbar=no, ',
			'location=no, ',
			'directories=no, ',
			'status=no, ',
			'menubar=no, ',
			'scrollbars=no, ',
			'resizable=no, ',
			'copyhistory=no, ',
			'width=' + width + ', ',
			'height=' + height + ', ',
			'top=' + top + ', ',
			'left=' + left
		].join(""));
	};

	var $windowElt = $(window);
	utils.iframe = function(url, width, height) {
		var $backdropElt = $(utils.createBackdrop());
		var result = crel('iframe', {
			src: url,
			frameborder: 0,
			class: 'modal-content modal-iframe'
		});
		document.body.appendChild(result);
		function placeIframe() {
			var actualWidth = window.innerWidth - 20;
			actualWidth > width && (actualWidth = width);
			var actualHeight = window.innerHeight - 50;
			actualHeight > height && (actualHeight = height);
			result.setAttribute('width', actualWidth);
			result.setAttribute('height', actualHeight);
		}
		placeIframe();
		$windowElt.on('resize.iframe', placeIframe);
		function removeIframe() {
			$backdropElt.off('click.backdrop');
			$backdropElt[0].removeBackdrop();
			$windowElt.off('resize.iframe');
			result.parentNode.removeChild(result);
		}
		result.removeIframe = removeIframe;
		$backdropElt.on('click.backdrop', removeIframe);
		return result;
	};

	// Shows a dialog to force the user to click a button before opening oauth popup
	var redirectCallbackConfirm;
	var redirectCallbackCancel;
	utils.redirectConfirm = function(message, callbackConfirm, callbackCancel) {
		redirectCallbackConfirm = callbackConfirm;
		redirectCallbackCancel = callbackCancel;
		$('.modal-redirect-confirm .redirect-msg').html(message);
		$('.modal-redirect-confirm').modal("show");
	};

	utils.init = function() {
		$('.action-redirect-confirm').click(function() {
			redirectCallbackCancel = undefined;
			redirectCallbackConfirm();
		});
		$('.modal-redirect-confirm').on('hidden.bs.modal', function() {
			_.defer(function() {
				redirectCallbackCancel && redirectCallbackCancel();
			});
		});
		$(document).on('click', function() {
			// Close opened tooltip if any
			openedTooltip && openedTooltip.tooltip('hide');
			openedTooltip = undefined;
		});
		$(document).on('click', '.tooltip', function(evt) {
			// Avoid tooltip to close when clicking inside
			evt.stopPropagation();
		});
	};

	utils.lockUI = function(cb) {
		var eltsToHide = $([
			'#wmd-input',
			'#preview-contents',
			'.navbar .file-title-navbar',
			'.navbar .left-buttons',
			'.navbar .right-buttons',
			'.navbar .buttons-dropdown'
		].join(',')).hide();
		return function() {
			eltsToHide.show();
			cb && cb.apply(null, arguments);
		};
	};

	var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		//">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;',
		"\u00a0": ' '
	};

	// Escape HTML entities
	utils.escape = function(str) {
		return String(str).replace(/[&<"'\/\u00a0]/g, function(s) {
			return entityMap[s];
		});
	};

	// Export data on disk
	utils.saveAs = function(content, filename) {
		if(saveAs !== undefined && !/constructor/i.test(window.HTMLElement) /* safari does not support saveAs */) {
			if(_.isString(content)) {
				content = new Blob([
					content
				], {
					type: "text/plain;charset=utf-8"
				});
			}
			saveAs(content, filename);
		}
		else {
			if(_.isString(content)) {
				var uriContent = "data:application/octet-stream;base64," + utils.encodeBase64(content);
				window.open(uriContent, 'file');
			}
			else {
				var reader = new FileReader();
				reader.onload = function(event) {
					utils.redirectConfirm('You are opening a PDF document.', function() {
						var uriContent = 'data:application/pdf;' + event.target.result.substring(event.target.result.indexOf('base64'));
						window.open(uriContent, 'file');
					});
				};
				reader.readAsDataURL(content); // Convert the blob to base64
			}
		}
	};

	// Time shared by others modules
	utils.updateCurrentTime = function() {
		utils.currentTime = Date.now();
	};
	utils.updateCurrentTime();

	// Serialize sync/publish attributes and store it in the storage
	utils.storeAttributes = function(attributes) {
		var storeIndex = attributes.syncIndex || attributes.publishIndex;
		// Don't store sync/publish index
		var storedAttributes = _.omit(attributes, "syncIndex", "publishIndex", "provider");
		// Store providerId instead of provider
		storedAttributes.provider = attributes.provider.providerId;
		storage[storeIndex] = JSON.stringify(storedAttributes);
	};

	// Retrieve/parse an index array from storage
	utils.retrieveIndexArray = function(storeIndex) {
		try {
			return _.compact(storage[storeIndex].split(";"));
		}
		catch(e) {
			storage[storeIndex] = ";";
			return [];
		}
	};

	// Append an index to an array in storage
	utils.appendIndexToArray = function(storeIndex, index) {
		storage[storeIndex] += index + ";";
	};

	// Remove an index from an array in storage
	utils.removeIndexFromArray = function(storeIndex, index) {
		storage[storeIndex] = storage[storeIndex].replace(";" + index + ";", ";");
	};

	// Retrieve/parse an object from storage. Returns undefined if error.
	utils.retrieveIgnoreError = function(storeIndex) {
		try {
			return JSON.parse(storage[storeIndex]);
		}
		catch(e) {
			return undefined;
		}
	};

	var eventList = [];
	utils.logValue = function(value) {
		eventList.unshift(value);
		if(eventList.length > 5) {
			eventList.pop();
		}
	};
	utils.logStackTrace = function() {
		eventList.unshift(printStackTrace());
		if(eventList.length > 5) {
			eventList.pop();
		}
	};
	utils.formatEventList = function() {
		var result = [];
		_.each(eventList, function(event) {
			result.push("\n");
			if(_.isString(event)) {
				result.push(event);
			}
			else if(_.isArray(event)) {
				result.push(event[5] || "");
				result.push(event[6] || "");
			}
		});
		return result.join("");
	};

	function padNumber(num, digits, trim) {
		var neg = '';
		if (num < 0) {
			neg =  '-';
			num = -num;
		}
		num = '' + num;
		while(num.length < digits) {
			num = '0' + num;
		}
		if (trim) {
			num = num.substr(num.length - digits);
		}
		return neg + num;
	}

	function dateGetter(name, size, offset, trim) {
		offset = offset || 0;
		return function(date) {
			var value = date['get' + name]();
			if (offset > 0 || value > -offset) {
				value += offset;
			}
			if (value === 0 && offset == -12 ) {
				value = 12;
			}
			return padNumber(value, size, trim);
		};
	}

	function dateStrGetter(name, shortForm) {
		return function(date, formats) {
			var value = date['get' + name]();
			var get = (shortForm ? ('SHORT' + name) : name).toUpperCase();

			return formats[get][value];
		};
	}

	var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/;
	var DATE_FORMATS = {
		yyyy: dateGetter('FullYear', 4),
		yy: dateGetter('FullYear', 2, 0, true),
		y: dateGetter('FullYear', 1),
		MMMM: dateStrGetter('Month'),
		MMM: dateStrGetter('Month', true),
		MM: dateGetter('Month', 2, 1),
		M: dateGetter('Month', 1, 1),
		dd: dateGetter('Date', 2),
		d: dateGetter('Date', 1),
		HH: dateGetter('Hours', 2),
		H: dateGetter('Hours', 1),
		hh: dateGetter('Hours', 2, -12),
		h: dateGetter('Hours', 1, -12),
		mm: dateGetter('Minutes', 2),
		m: dateGetter('Minutes', 1),
		ss: dateGetter('Seconds', 2),
		s: dateGetter('Seconds', 1),
		// while ISO 8601 requires fractions to be prefixed with `.` or `,`
		// we can be just safely rely on using `sss` since we currently don't support single or two digit fractions
		sss: dateGetter('Milliseconds', 3),
		EEEE: dateStrGetter('Day'),
		EEE: dateStrGetter('Day', true)
	};

	var DATETIME_FORMATS = {
		MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
		SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
		DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
		SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
		AMPMS: ['AM','PM'],
		medium: 'MMM d, y h:mm:ss a',
		short: 'M/d/yy h:mm a',
		fullDate: 'EEEE, MMMM d, y',
		longDate: 'MMMM d, y',
		mediumDate: 'MMM d, y',
		shortDate: 'M/d/yy',
		mediumTime: 'h:mm:ss a',
		shortTime: 'h:mm a'
	};

	utils.formatDate = function(date) {
		var text = '',
			parts = [],
			fn, match;

		var interval = Date.now() - date;
		var format = 'HH:mm';
		if(interval > 31556940000) {
			format = 'y';
		}
		else if(interval > 86400000) {
			format = 'MMM d';
		}
		date = new Date(date);

		while(format) {
			match = DATE_FORMATS_SPLIT.exec(format);
			if (match) {
				parts = parts.concat(match.slice(1));
				format = parts.pop();
			} else {
				parts.push(format);
				format = null;
			}
		}

		parts.forEach(function(value){
			fn = DATE_FORMATS[value];
			text += fn ? fn(date, DATETIME_FORMATS)
				: value.replace(/(^'|'$)/g, '').replace(/''/g, "'");
		});

		return text;
	};

	// Base64 conversion
	utils.encodeBase64 = function(str) {
		if(str.length === 0) {
			return "";
		}

		// UTF-8 to byte array
		var bytes = [], offset = 0, length, char;

		str = encodeURI(str);
		length = str.length;

		while(offset < length) {
			char = str[offset];
			offset += 1;

			if('%' !== char) {
				bytes.push(char.charCodeAt(0));
			}
			else {
				char = str[offset] + str[offset + 1];
				bytes.push(parseInt(char, 16));
				offset += 2;
			}
		}

		// byte array to base64
		var padchar = '=';
		var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

		var i, b10;
		var x = [];

		var imax = bytes.length - bytes.length % 3;

		for(i = 0; i < imax; i += 3) {
			b10 = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
			x.push(alpha.charAt(b10 >> 18));
			x.push(alpha.charAt((b10 >> 12) & 0x3F));
			x.push(alpha.charAt((b10 >> 6) & 0x3f));
			x.push(alpha.charAt(b10 & 0x3f));
		}
		switch(bytes.length - imax) {
			case 1:
				b10 = bytes[i] << 16;
				x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + padchar + padchar);
				break;
			case 2:
				b10 = (bytes[i] << 16) | (bytes[i + 1] << 8);
				x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + alpha.charAt((b10 >> 6) & 0x3f) + padchar);
				break;
		}
		return x.join('');
	};

	utils.decodeBase64 = function(str) {
		return decodeURIComponent(window.escape(window.atob(str)));
	};

	// CRC32 algorithm
	var mHash = [
		0,
		1996959894,
		3993919788,
		2567524794,
		124634137,
		1886057615,
		3915621685,
		2657392035,
		249268274,
		2044508324,
		3772115230,
		2547177864,
		162941995,
		2125561021,
		3887607047,
		2428444049,
		498536548,
		1789927666,
		4089016648,
		2227061214,
		450548861,
		1843258603,
		4107580753,
		2211677639,
		325883990,
		1684777152,
		4251122042,
		2321926636,
		335633487,
		1661365465,
		4195302755,
		2366115317,
		997073096,
		1281953886,
		3579855332,
		2724688242,
		1006888145,
		1258607687,
		3524101629,
		2768942443,
		901097722,
		1119000684,
		3686517206,
		2898065728,
		853044451,
		1172266101,
		3705015759,
		2882616665,
		651767980,
		1373503546,
		3369554304,
		3218104598,
		565507253,
		1454621731,
		3485111705,
		3099436303,
		671266974,
		1594198024,
		3322730930,
		2970347812,
		795835527,
		1483230225,
		3244367275,
		3060149565,
		1994146192,
		31158534,
		2563907772,
		4023717930,
		1907459465,
		112637215,
		2680153253,
		3904427059,
		2013776290,
		251722036,
		2517215374,
		3775830040,
		2137656763,
		141376813,
		2439277719,
		3865271297,
		1802195444,
		476864866,
		2238001368,
		4066508878,
		1812370925,
		453092731,
		2181625025,
		4111451223,
		1706088902,
		314042704,
		2344532202,
		4240017532,
		1658658271,
		366619977,
		2362670323,
		4224994405,
		1303535960,
		984961486,
		2747007092,
		3569037538,
		1256170817,
		1037604311,
		2765210733,
		3554079995,
		1131014506,
		879679996,
		2909243462,
		3663771856,
		1141124467,
		855842277,
		2852801631,
		3708648649,
		1342533948,
		654459306,
		3188396048,
		3373015174,
		1466479909,
		544179635,
		3110523913,
		3462522015,
		1591671054,
		702138776,
		2966460450,
		3352799412,
		1504918807,
		783551873,
		3082640443,
		3233442989,
		3988292384,
		2596254646,
		62317068,
		1957810842,
		3939845945,
		2647816111,
		81470997,
		1943803523,
		3814918930,
		2489596804,
		225274430,
		2053790376,
		3826175755,
		2466906013,
		167816743,
		2097651377,
		4027552580,
		2265490386,
		503444072,
		1762050814,
		4150417245,
		2154129355,
		426522225,
		1852507879,
		4275313526,
		2312317920,
		282753626,
		1742555852,
		4189708143,
		2394877945,
		397917763,
		1622183637,
		3604390888,
		2714866558,
		953729732,
		1340076626,
		3518719985,
		2797360999,
		1068828381,
		1219638859,
		3624741850,
		2936675148,
		906185462,
		1090812512,
		3747672003,
		2825379669,
		829329135,
		1181335161,
		3412177804,
		3160834842,
		628085408,
		1382605366,
		3423369109,
		3138078467,
		570562233,
		1426400815,
		3317316542,
		2998733608,
		733239954,
		1555261956,
		3268935591,
		3050360625,
		752459403,
		1541320221,
		2607071920,
		3965973030,
		1969922972,
		40735498,
		2617837225,
		3943577151,
		1913087877,
		83908371,
		2512341634,
		3803740692,
		2075208622,
		213261112,
		2463272603,
		3855990285,
		2094854071,
		198958881,
		2262029012,
		4057260610,
		1759359992,
		534414190,
		2176718541,
		4139329115,
		1873836001,
		414664567,
		2282248934,
		4279200368,
		1711684554,
		285281116,
		2405801727,
		4167216745,
		1634467795,
		376229701,
		2685067896,
		3608007406,
		1308918612,
		956543938,
		2808555105,
		3495958263,
		1231636301,
		1047427035,
		2932959818,
		3654703836,
		1088359270,
		936918000,
		2847714899,
		3736837829,
		1202900863,
		817233897,
		3183342108,
		3401237130,
		1404277552,
		615818150,
		3134207493,
		3453421203,
		1423857449,
		601450431,
		3009837614,
		3294710456,
		1567103746,
		711928724,
		3020668471,
		3272380065,
		1510334235,
		755167117
	];
	utils.crc32 = function(str) {
		var n = 0, crc = -1;
		str.split('').forEach(function(char) {
			n = (crc ^ char.charCodeAt(0)) & 0xFF;
			crc = (crc >>> 8) ^ mHash[n];
		});
		crc = crc ^ (-1);
		if(crc < 0) {
			crc = 0xFFFFFFFF + crc + 1;
		}
		return crc.toString(16);
	};

	window.perfTest = function(cb) {
		var startTime = Date.now();
		for(var i = 0; i < 10000; i++) {
			cb();
		}
		console.log('Run 10,000 times in ' + (Date.now() - startTime) + 'ms');
	};

	return utils;
});
