define([
	"jquery",
	"underscore",
	"utils",
	"logger",
	"classes/Extension",
	"text!html/htmlSanitizerSettingsBlock.html"
], function($, _, utils, logger, Extension, htmlSanitizerSettingsBlockHTML) {

	var htmlSanitizer = new Extension("htmlSanitizer", "HTML Sanitizer", true);
	htmlSanitizer.settingsBlock = htmlSanitizerSettingsBlockHTML;

	var buf;
	htmlSanitizer.onPagedownConfigure = function(editor) {
		var converter = editor.getConverter();
		converter.hooks.chain("postConversion", function(html) {
			buf = [];
			html.split('<div class="se-preview-section-delimiter"></div>').forEach(function(sectionHtml) {
				htmlParser(sectionHtml, htmlSanitizeWriter(buf, function(uri, isImage) {
					return !/^unsafe/.test(sanitizeUri(uri, isImage));
				}));
				buf.push('<div class="se-preview-section-delimiter"></div>');
			});
			return buf.slice(0, -1).join('');
		});
	};

	/**
	 * @license AngularJS v1.2.16
	 * (c) 2010-2014 Google, Inc. http://angularjs.org
	 * License: MIT
	 */

	var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/,
		imgSrcSanitizationWhitelist = /^\s*(https?|ftp|file):|data:image\//;

	function sanitizeUri(uri, isImage) {
		var regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
		var normalizedVal;
		normalizedVal = utils.urlResolve(uri).href;
		if(normalizedVal !== '' && !normalizedVal.match(regex)) {
			return 'unsafe:' + normalizedVal;
		}
	}

	// Regular Expressions for parsing tags and attributes
	var START_TAG_REGEXP =
			/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
		END_TAG_REGEXP = /^<\s*\/\s*([\w:-]+)[^>]*>/,
		ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
		BEGIN_TAG_REGEXP = /^</,
		BEGING_END_TAGE_REGEXP = /^<\s*\//,
		COMMENT_REGEXP = /<!--(.*?)-->/g,
		DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i,
		CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g,
		// Match everything outside of normal chars and " (quote character)
		NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;

	function makeMap(str) {
		var obj = {}, items = str.split(','), i;
		for(i = 0; i < items.length; i++) {
			obj[items[i]] = true;
		}
		return obj;
	}

	// Good source of info about elements and attributes
	// http://dev.w3.org/html5/spec/Overview.html#semantics
	// http://simon.html5.org/html-elements

	// Safe Void Elements - HTML5
	// http://dev.w3.org/html5/spec/Overview.html#void-elements
	var voidElements = makeMap("area,br,col,hr,img,wbr");

	// Elements that you can, intentionally, leave open (and which close themselves)
	// http://dev.w3.org/html5/spec/Overview.html#optional-tags
	var optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
		optionalEndTagInlineElements = makeMap("rp,rt"),
		optionalEndTagElements = _.extend({},
			optionalEndTagInlineElements,
			optionalEndTagBlockElements);

	// Safe Block Elements - HTML5
	var blockElements = _.extend({}, optionalEndTagBlockElements, makeMap("address,article," +
		"aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +
		"h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));

	// Inline Elements - HTML5
	var inlineElements = _.extend({}, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b," +
		"bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +
		"samp,small,span,strike,strong,sub,sup,time,tt,u,var"));


	// Special Elements (can contain anything)
	var specialElements = makeMap("script,style");

	// benweet: Add iframe
	blockElements.iframe = true;

	var validElements = _.extend({},
		voidElements,
		blockElements,
		inlineElements,
		optionalEndTagElements);

	//Attributes that have href and hence need to be sanitized
	var uriAttrs = makeMap("background,cite,href,longdesc,src,usemap");
	var validAttrs = _.extend({}, uriAttrs, makeMap(
			'abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
			'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
			'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
			'scope,scrolling,shape,size,span,start,summary,target,title,type,' +
			'valign,value,vspace,width'));

	// benweet: Add id and allowfullscreen (YouTube iframe)
	validAttrs.id = true;
	validAttrs.allowfullscreen = true;

	/*
	 * HTML Parser By Misko Hevery (misko@hevery.com)
	 * based on:  HTML Parser By John Resig (ejohn.org)
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 *
	 * // Use like so:
	 * htmlParser(htmlString, {
	 *     start: function(tag, attrs, unary) {},
	 *     end: function(tag) {},
	 *     chars: function(text) {},
	 *     comment: function(text) {}
	 * });
	 *
	 */
	/* jshint -W083 */
	function htmlParser(html, handler) {
		var index, chars, match, stack = [], last = html;
		stack.last = function() {
			return stack[ stack.length - 1 ];
		};

		function parseStartTag(tag, tagName, rest, unary) {
			tagName = tagName && tagName.toLowerCase();
			if(blockElements[ tagName ]) {
				while(stack.last() && inlineElements[ stack.last() ]) {
					parseEndTag("", stack.last());
				}
			}

			if(optionalEndTagElements[ tagName ] && stack.last() == tagName) {
				parseEndTag("", tagName);
			}

			unary = voidElements[ tagName ] || !!unary;

			if(!unary) {
				stack.push(tagName);
			}

			var attrs = {};

			rest.replace(ATTR_REGEXP,
				function(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
					var value = doubleQuotedValue ||
						singleQuotedValue ||
						unquotedValue ||
						'';

					attrs[name] = decodeEntities(value);
				});
			if(handler.start) {
				handler.start(tagName, attrs, unary);
			}
		}

		function parseEndTag(tag, tagName) {
			var pos = 0, i;
			tagName = tagName && tagName.toLowerCase();
			if(tagName) {
				// Find the closest opened tag of the same type
				for(pos = stack.length - 1; pos >= 0; pos--) {
					if(stack[ pos ] == tagName) {
						break;
					}
				}
			}

			if(pos >= 0) {
				// Close all the open elements, up the stack
				for(i = stack.length - 1; i >= pos; i--) {
					if(handler.end) {
						handler.end(stack[ i ]);
					}
				}

				// Remove the open elements from the stack
				stack.length = pos;
			}
		}

		while(html) {
			chars = true;

			// Make sure we're not in a script or style element
			if(!stack.last() || !specialElements[ stack.last() ]) {

				// Comment
				if(html.indexOf("<!--") === 0) {
					// comments containing -- are not allowed unless they terminate the comment
					index = html.indexOf("--", 4);

					if(index >= 0 && html.lastIndexOf("-->", index) === index) {
						if(handler.comment) {
							handler.comment(html.substring(4, index));
						}
						html = html.substring(index + 3);
						chars = false;
					}
					// DOCTYPE
				} else if(DOCTYPE_REGEXP.test(html)) {
					match = html.match(DOCTYPE_REGEXP);

					if(match) {
						html = html.replace(match[0], '');
						chars = false;
					}
					// end tag
				} else if(BEGING_END_TAGE_REGEXP.test(html)) {
					match = html.match(END_TAG_REGEXP);

					if(match) {
						html = html.substring(match[0].length);
						match[0].replace(END_TAG_REGEXP, parseEndTag);
						chars = false;
					}

					// start tag
				} else if(BEGIN_TAG_REGEXP.test(html)) {
					match = html.match(START_TAG_REGEXP);

					if(match) {
						html = html.substring(match[0].length);
						match[0].replace(START_TAG_REGEXP, parseStartTag);
						chars = false;
					}
				}

				if(chars) {
					index = html.indexOf("<");

					var text = index < 0 ? html : html.substring(0, index);
					html = index < 0 ? "" : html.substring(index);

					if(handler.chars) {
						handler.chars(decodeEntities(text));
					}
				}

			} else {
				html = html.replace(new RegExp("(.*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", 'i'),
					function(all, text) {
						text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1");

						if(handler.chars) {
							handler.chars(decodeEntities(text));
						}

						return "";
					});

				parseEndTag("", stack.last());
			}

			if(html == last) {
				//throw new Error("The sanitizer was unable to parse the following block of html: " + html);
				stack.reverse();
				return stack.forEach(function(tag) {
					buf.push('</');
					buf.push(tag);
					buf.push('>');
				});
			}
			last = html;
		}

		// Clean up any remaining tags
		parseEndTag();
	}

	var hiddenPre = document.createElement("pre");
	var spaceRe = /^(\s*)([\s\S]*?)(\s*)$/;

	/**
	 * decodes all entities into regular string
	 * @param value
	 * @returns {string} A string with decoded entities.
	 */
	function decodeEntities(value) {
		if(!value) {
			return '';
		}

		// Note: IE8 does not preserve spaces at the start/end of innerHTML
		// so we must capture them and reattach them afterward
		var parts = spaceRe.exec(value);
		var spaceBefore = parts[1];
		var spaceAfter = parts[3];
		var content = parts[2];
		if(content) {
			hiddenPre.innerHTML = content.replace(/</g, "&lt;");
			// innerText depends on styling as it doesn't display hidden elements.
			// Therefore, it's better to use textContent not to cause unnecessary
			// reflows. However, IE<9 don't support textContent so the innerText
			// fallback is necessary.
			content = 'textContent' in hiddenPre ?
				hiddenPre.textContent : hiddenPre.innerText;
		}
		return spaceBefore + content + spaceAfter;
	}

	/**
	 * Escapes all potentially dangerous characters, so that the
	 * resulting string can be safely inserted into attribute or
	 * element text.
	 * @param value
	 * @returns {string} escaped text
	 */
	function encodeEntities(value) {
		return value.
			replace(/&/g, '&amp;').
			replace(NON_ALPHANUMERIC_REGEXP, function(value) {
				return '&#' + value.charCodeAt(0) + ';';
			}).
			replace(/</g, '&lt;').
			replace(/>/g, '&gt;');
	}


	/**
	 * create an HTML/XML writer which writes to buffer
	 * @param {Array} buf use buf.jain('') to get out sanitized html string
	 * @returns {object} in the form of {
	 *     start: function(tag, attrs, unary) {},
	 *     end: function(tag) {},
	 *     chars: function(text) {},
	 *     comment: function(text) {}
	 * }
	 */
	function htmlSanitizeWriter(buf, uriValidator) {
		var ignore = false;
		var out = _.bind(buf.push, buf);
		return {
			start: function(tag, attrs, unary) {
				tag = tag && tag.toLowerCase();
				if(!ignore && specialElements[tag]) {
					ignore = tag;
				}
				if(!ignore && validElements[tag] === true) {
					out('<');
					out(tag);
					_.forEach(attrs, function(value, key) {
						var lkey = key && key.toLowerCase();
						var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
						if(validAttrs[lkey] === true &&
							(uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
							out(' ');
							out(key);
							out('="');
							out(encodeEntities(value));
							out('"');
						}
					});
					out(unary ? '/>' : '>');
				}
			},
			end: function(tag) {
				tag = tag && tag.toLowerCase();
				if(!ignore && validElements[tag] === true) {
					out('</');
					out(tag);
					out('>');
				}
				if(tag == ignore) {
					ignore = false;
				}
			},
			chars: function(chars) {
				if(!ignore) {
					out(encodeEntities(chars));
				}
			},
			comment: function(comment) {
				if(!ignore) {
					out('<!--');
					out(encodeEntities(comment));
					out('-->');
				}
			}
		};
	}

	return htmlSanitizer;
});