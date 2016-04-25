define([
	"jquery",
	"constants",
	"core",
	"utils",
	"storage",
	"logger",
	"eventMgr",
	"classes/AsyncTask",
	"md5"
], function($, constants, core, utils, storage, logger, eventMgr, AsyncTask, md5) {
	/**
	 * Content class string.
	 * To set this string to the "Note.attributes.contentClass",
	 * a note is marked as read-only.
	 * @see https://dev.evernote.com/doc/articles/read_only_notes.php
	 */
	var CONTENT_CLASS = "companyname.stackedit"; // TODO Change it
	var KEY_EVERNOTE_ACCESS_TOKEN = "evernoteAccessToken";
	var KEY_EVERNOTE_NOTE_STORE_URL = "evernoteNoteStoreUrl";

	var connected = false;

	var evernoteHelper = {};

	// Listen to offline status changes
	var isOffline = false;
	eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
		isOffline = isOfflineParam;
	});

	function connect(task) {
		task.onRun(function() {
			if (isOffline === true) {
				connected = false;
				task.error(new Error("Operation not available in offline mode.|stopPublish"));
				return;
			}
			if (connected === true) {
				task.chain();
				return;
			}
			$.ajax({
				url: "libs/evernote-sdk-minified.js",
				dataType: "script",
				timeout: constants.AJAX_TIMEOUT
			}).done(function() {
				connected = true;
				task.chain();
			}).fail(function() {
				task.error(new Error("Couldn't load evernote-sdk-minified.js"));
			});
		});
	}

	// Try to authenticate with OAuth
	function authenticate(task) {
		var authWindow;
		var intervalId;
		task.onRun(function() {
			if (storage[KEY_EVERNOTE_ACCESS_TOKEN] !== undefined) {
				task.chain();
				return;
			}
			task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
			function oauthRedirect() {
				utils.redirectConfirm("You are being redirected to <strong>Evernote</strong> authorization page.", function() {
					task.chain(getToken);
				}, function() {
					task.error(new Error("Operation canceled."));
				});
			}
			function  getToken() {
				storage.removeItem(KEY_EVERNOTE_ACCESS_TOKEN);
				storage.removeItem(KEY_EVERNOTE_NOTE_STORE_URL);
				authWindow = utils.popupWindow("html/evernote-oauth.html", 960, 600);
				authWindow.focus();
				intervalId = setInterval(function() {
					if (authWindow.closed === true) {
						clearInterval(intervalId);
						authWindow = undefined;
						intervalId = undefined;
						if (storage[KEY_EVERNOTE_ACCESS_TOKEN] === undefined) {
							return task.error(new Error("Authentication Error"));
						}
						task.chain();
					}
				}, 500);
			}
			task.chain(oauthRedirect);
		});
		task.onError(function() {
			if(intervalId !== undefined) {
				clearInterval(intervalId);
			}
			if(authWindow !== undefined) {
				authWindow.close();
			}
		});
	}

	function getNoteStore() {
		var oauthAccessToken = storage[KEY_EVERNOTE_ACCESS_TOKEN];
		if (oauthAccessToken === undefined) {
			return undefined;
		}
		var noteStoreURL = constants.EVERNOTE_PROXY_URL + "/noteStore" + "?oauthAccessToken=" + oauthAccessToken +
		"&edam_noteStoreUrl=" + localStorage[KEY_EVERNOTE_NOTE_STORE_URL];
		var noteStoreTransport = new Thrift.BinaryHttpTransport(noteStoreURL);
		var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
		return new NoteStoreClient(noteStoreProtocol);
	}

	evernoteHelper.upload = function(guid, title, content, callback) {
		var result;
		var task = new AsyncTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var noteStore = getNoteStore();
			if (noteStore === undefined) {
				return task.error(new Error("Authentication Error"));
			}
			// Get the previewed DOM tree.
			// TODO It's not a good implementation. Resarch another way.
			var originalHtml = document.getElementById("preview-contents");

			// MathJax uses "defs" tags independently,
			// so we have to embed them into each "svg" tags
			// for converting them to image.
			// TODO It must be generalized for the "svg" using "defs" tags
			var defs = $("defs#MathJax_SVG_glyphs");
			if (defs.length !== 0) {
				$(".MathJax_SVG svg").each(function() {
					$(this).remove("defs.cloned_MathJax_SVG_glyphs");
					var clonedDefs = defs.clone();
					clonedDefs.removeAttr("id");
					clonedDefs.attr("class", "cloned_MathJax_SVG_glyphs");
					$(this).prepend(clonedDefs);
				});
			}

			convertHtmlToEnml(originalHtml, function(enmlDocument, resources) {
				var note = new Note();
				note.title = title;
				// Set ContentClass which makes note read-only.
				if (!note.attributes) {
					note.attributes = new NoteAttributes();
				}
				note.attributes.contentClass = CONTENT_CLASS;
				if (resources !== undefined) {
					note.resources = resources;
				}

				// Add hidden element of raw markdown text
				$('<div style="display: none">' +
				escape(content) +
				'</div>').appendTo(enmlDocument.documentElement);

				// Serialize XML and set to note.content
				// TODO replacing namespace is not a good implementation. Resarch another serializeation
				var enmlString = (new XMLSerializer()).serializeToString(enmlDocument);
				note.content = enmlString.replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, "");

				var resCallback = function(response) {
					result = response;
					task.chain();
				};
				var errorCallback = function(error) {
					handleEvernoteError(error, task);
				};
				try {
					if (guid === undefined) {
						noteStore.createNote(storage[KEY_EVERNOTE_ACCESS_TOKEN],
							note, resCallback, errorCallback);
					} else {
						note.guid = guid;
						noteStore.updateNote(storage[KEY_EVERNOTE_ACCESS_TOKEN],
							note, resCallback, errorCallback);
					}
				} catch(e) {
					return task.error(e);
				}
			});
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	evernoteHelper.getNotesMetadata = function(callback) {
		var result = [];
		var task = new AsyncTask();
		// Add some time for user to choose his files
		task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var noteStore = getNoteStore();
			if (noteStore === undefined) {
				return task.error(new Error("Authentication Error"));
			}
			var filter = new NoteFilter({
				words: "contentClass:" + CONTENT_CLASS
			});
			var resultSpec = new NotesMetadataResultSpec({
				includeTitle: true
			});
			var resCallback = function(notesMetadataList) {
				result = result.concat(notesMetadataList.notes);
				// If there remaining notes, call findNotesMetadata again.
				var nextOffset = (notesMetadataList.startIndex + notesMetadataList.notes.length);
				var remaining = notesMetadataList.totalNotes - nextOffset;
				if (remaining > 0) {
					noteStore.findNotesMetadata(storage[KEY_EVERNOTE_ACCESS_TOKEN],
						filter,
						nextOffset, // offset
						100, // max value
						resultSpec,
						resCallback,
						errorCallback);
				} else {
					task.chain();
				}
			};
			var errorCallback = function(error) {
				handleEvernoteError(error, task);
			};
			noteStore.findNotesMetadata(storage[KEY_EVERNOTE_ACCESS_TOKEN],
				filter,
				0, // offset
				100, // max value
				resultSpec,
				resCallback,
				errorCallback);
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	evernoteHelper.downloadNotes = function(guids, callback) {
		var notes = [];
		var task = new AsyncTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var noteStore = getNoteStore();
			if (noteStore === undefined) {
				callback("error");
				return;
			}
			var count = guids.length;
			var resCallback = function(note) {
				var enmlDocument = $.parseXML(note.content);
				note.content = unescape($(enmlDocument).find("en-note div:last").text());
				notes.push(note);
				count--;
				if (count === 0) {
					task.chain();
				}
			};
			var errorCallback = function(error) {
				eventMgr.onError("Download note error.");
				handleEvernoteError(error);
				count--;
				if (count === 0) {
					task.chain();
				}
			};
			_.each(guids, function(guid) {
				noteStore.getNote(storage[KEY_EVERNOTE_ACCESS_TOKEN],
					guid,
					true, // withContent
					false, // withResourcesData
					false, // withResourcesRecognition,
					false, // withResourcesAlternateData
					resCallback,
					errorCallback);
			});
		});
		task.onSuccess(function() {
			callback(undefined, notes);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	function handleEvernoteError(error, task) {
		var message = "Error\n";
		logger.error(error);
		if (error.errorCode !== undefined) {
			message += error.errorCode + ": ";
			if (error.parameter !== undefined) { // UserException
				message += error.parameter;
			} else if (error.message) { // SystemException
				message += error.message;
			} else {
				message += "Unknown error";
			}

			// Process errors
			switch (error.errorCode) {
				case 9: // AUTH_EXPIRED
				storage.removeItem(KEY_EVERNOTE_ACCESS_TOKEN);
				storage.removeItem(KEY_EVERNOTE_NOTE_STORE_URL);
				break;
				default:
				break;
			}
		} else {
			if (error.identifier !== undefined && error.key !== undefined) { // NotFoundException
				message += identifier + ", " + key;
			} else {
				message += "Unknown error";
			}
		}
		if (task !== undefined) {
			task.error(new Error(message));
		}
	}

	/*************************************
	 * Belows are HTML to ENML converter
	 * TODO Go independent
	 *************************************/
	var enml_allowed_tags=[
		"a",
		"abbr",
		"acronym",
		"address",
		"area",
		"b",
		"bdo",
		"big",
		"blockquote",
		"br",
		"caption",
		"center",
		"cite",
		"code",
		"col",
		"colgroup",
		"dd",
		"del",
		"dfn",
		"div",
		"dl",
		"dt",
		"em",
		"font",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"hr",
		"i",
		"img",
		"ins",
		"kbd",
		"li",
		"map",
		"ol",
		"p",
		"pre",
		"q",
		"s",
		"samp",
		"small",
		"span",
		"strike",
		"strong",
		"sub",
		"sup",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"title",
		"tr",
		"tt",
		"u",
		"ul",
		"var",
		"xmp"
	];
	var enml_allowed_attr=[
		"href",
		"src"
	];
	var enml_allowed_style=[
		"margin-top",
		"margin-bottom",
		"margin-left",
		"margin-right",
		"padding-top",
		"padding-bottom",
		"padding-left",
		"padding-right",
		"list-style-type",
		"box-sizing",
		"line-height",
		"font-size",
		"font-family",
		"font-weight",
		"color",
		"text-align",
		"background-color",
		"text-decoration",
		"vertical-align",
		"position",
		"display",
		"border-color",
		"border-style",
		"border-width",
		"border-top",
		"border-top-color",
		"border-top-style",
		"border-top-width",
		"border-bottom",
		"border-bottom-color",
		"border-bottom-style",
		"border-bottom-width",
		"border-left",
		"border-left-color",
		"border-left-style",
		"border-left-width",
		"border-right",
		"border-right-color",
		"border-right-style",
		"border-right-width",
		"outline",
		"text-indent",
		"text-transform",
		"letter-spacing",
		"word-spacing",
		"word-break",
		"word-wrap",
		"white-space",
		"text-shadow"
	];

	function convertHtmlToEnml(originalHtml, callback) {
		var resources = [];
		function parseNode(originalHtmlNode, callback) {
			switch(originalHtmlNode.nodeType) {
				case 1: { // Element
					convertHtmlElementToEnmlElement(originalHtmlNode, function(enmlElement, resource) {
						if (enmlElement === undefined) {
							callback();
							return;
						}
						// Set Style
						var style = window.getComputedStyle(originalHtmlNode);
						var enmlElementJ = $(enmlElement);
						for (var i = 0; i < style.length; i++) {
							var name = style.item(i);
							var value = style.getPropertyValue(name);
							if (enml_allowed_style.indexOf(name) >= 0) {
								enmlElementJ.css(name, value);
							}
						}
						if (resource !== undefined) {
							resources.push(resource);
						}

						var count = originalHtmlNode.childNodes.length;
						if (count === 0) {
							callback(enmlElement);
						} else {
							// Recursive call of parseNode
							// This array is used for keeping node order.
							var childEnmlElements = [];
							_.each(originalHtmlNode.childNodes, function(child, i) {
								parseNode(child, function(childEnmlElement) {
									childEnmlElements[i] = childEnmlElement;

									count--;
									if (count === 0) {
										for (var j = 0; j < childEnmlElements.length; j++) {
											var childEnmlElement = childEnmlElements[j];
											if (childEnmlElement !== undefined) {
												enmlElement.appendChild(childEnmlElement);
											}
										}
										callback(enmlElement);
									}
								});
							});
						}
					});
					break;
				}
				case 3: { // Text
					var text = originalHtmlNode.cloneNode(false);
					callback(text);
					break;
				}
				default: {
					// Do nothing
					callback();
				}
				break;
			}
		}

		var enmlDocument = $.parseXML('<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">\n<en-note></en-note>');

		parseNode(originalHtml, function(enmlElement) {
			if (enmlElement !== undefined) {
				enmlDocument.documentElement.appendChild(enmlElement);
			}

			callback(enmlDocument, resources.length === 0 ? undefined : resources);
		});
	}

	function convertHtmlElementToEnmlElement(htmlElement, callback) {
		if (htmlElement.nodeName.toLowerCase() === "svg") {
			var mimeType = "image/png";
			convertSvgToImage(htmlElement, mimeType, function(image, length) {
				if (image === undefined) {
					callback();
					return;
				}

				// Create Resource of image
				var hash = md5.create();
				hash.update(image);
				var hexhash = hash.hex();
				var resource = new Resource({
					data: new Data({
						bodyHash: hexhash,
						body: image,
						size: length
					}),
					mime: mimeType
				});
				// Create en-media Element
				var enmlElement = document.createElement('en-media');
				enmlElement.setAttribute("type", mimeType);
				enmlElement.setAttribute("hash", hexhash);

				callback(enmlElement, resource);
			});
		} else if (enml_allowed_tags.indexOf(htmlElement.nodeName.toLowerCase()) >= 0) {
			var enmlElement = document.createElement(htmlElement.nodeName);
			// Apply attributes
			for (var i = 0; i < enml_allowed_attr.length; i++) {
				var attrName = enml_allowed_attr[i];
				if (htmlElement.hasAttribute(attrName)) {
					var attrValue = htmlElement.getAttribute(attrName);
					enmlElement.setAttribute(attrName, attrValue);
				}
			}
			callback(enmlElement);
		} else {
			callback();
		}
	}

	function convertSvgToImage(svgElement, mimeType, callback) {
		var image = new Image();
		image.onload = function() {
			var rect = svgElement.getBoundingClientRect();
			var canvas = document.createElement('canvas');
			canvas.width = rect.width;
			canvas.height = rect.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0);
			var base64 = canvas.toDataURL(mimeType),
			bin = atob(base64.replace(/^.*,/, "")),
			buffer = new Uint8Array(bin.length);
			for (var i = 0; i < bin.length; i++) {
				buffer[i] = bin.charCodeAt(i);
			}
			callback(buffer.buffer, bin.length);
		};
		image.onerror = function() {
			callback();
		}
		image.onabort = function() {
			callback();
		}
		var data = new XMLSerializer().serializeToString(svgElement);
		image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(data)));
	}

	function decodeContent(content) {

	}

	return evernoteHelper;
});
