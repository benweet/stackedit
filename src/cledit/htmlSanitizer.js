const aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/;
const imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;

const urlParsingNode = window.document.createElement('a');

function sanitizeUri(uri, isImage) {
  const regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
  urlParsingNode.setAttribute('href', uri);
  const normalizedVal = urlParsingNode.href;
  if (normalizedVal !== '' && !normalizedVal.match(regex)) {
    return `unsafe:${normalizedVal}`;
  }
  return uri;
}

var buf;

/* jshint -W083 */

// Regular Expressions for parsing tags and attributes
var START_TAG_REGEXP =
  /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
  END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^>]*>/,
  ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
  BEGIN_TAG_REGEXP = /^</,
  BEGING_END_TAGE_REGEXP = /^<\//,
  COMMENT_REGEXP = /<!--(.*?)-->/g,
  DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i,
  CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g,
  SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  // Match everything outside of normal chars and " (quote character)
  NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;


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
  optionalEndTagElements = {
    ...optionalEndTagInlineElements,
    ...optionalEndTagBlockElements,
  };

// Safe Block Elements - HTML5
var blockElements = {
  ...optionalEndTagBlockElements,
  ...makeMap("address,article," +
  "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +
  "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")
};

// benweet: Add iframe
blockElements.iframe = true;

// Inline Elements - HTML5
var inlineElements = {
  ...optionalEndTagInlineElements,
  ...makeMap("a,abbr,acronym,b," +
    "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +
    "samp,small,span,strike,strong,sub,sup,time,tt,u,var")
};

// SVG Elements
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
// Note: the elements animate,animateColor,animateMotion,animateTransform,set are intentionally omitted.
// They can potentially allow for arbitrary javascript to be executed. See #11290
var svgElements = makeMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph," +
  "hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline," +
  "radialGradient,rect,stop,svg,switch,text,title,tspan,use");

// Special Elements (can contain anything)
var specialElements = makeMap("script,style");

var validElements = {
  ...voidElements,
  ...blockElements,
  ...inlineElements,
  ...optionalEndTagElements,
  ...svgElements,
};

//Attributes that have href and hence need to be sanitized
var uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href");

var htmlAttrs = makeMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
  'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
  'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
  'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
  'valign,value,vspace,width');

// SVG attributes (without "id" and "name" attributes)
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
var svgAttrs = makeMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
  'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +
  'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +
  'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +
  'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +
  'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +
  'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +
  'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +
  'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +
  'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +
  'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +
  'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +
  'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +
  'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +
  'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);

var validAttrs = {
  ...uriAttrs,
  ...svgAttrs,
  ...htmlAttrs,
};

// benweet: Add id and allowfullscreen (YouTube iframe)
validAttrs.id = true;
validAttrs.allowfullscreen = true;

function makeMap(str, lowercaseKeys) {
  var obj = {},
    items = str.split(','),
    i;
  for (i = 0; i < items.length; i++) {
    obj[lowercaseKeys ? items[i].toLowerCase() : items[i]] = true;
  }
  return obj;
}


/**
 * @example
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * @param {string} html string
 * @param {object} handler
 */
function htmlParser(html, handler) {
  if (typeof html !== 'string') {
    if (html === null || typeof html === 'undefined') {
      html = '';
    } else {
      html = '' + html;
    }
  }
  var index, chars, match, stack = [],
    last = html,
    text;
  stack.last = function () {
    return stack[stack.length - 1];
  };

  while (html) {
    text = '';
    chars = true;

    // Make sure we're not in a script or style element
    if (!stack.last() || !specialElements[stack.last()]) {

      // Comment
      if (html.indexOf("<!--") === 0) {
        // comments containing -- are not allowed unless they terminate the comment
        index = html.indexOf("--", 4);

        if (index >= 0 && html.lastIndexOf("-->", index) === index) {
          if (handler.comment) handler.comment(html.substring(4, index));
          html = html.substring(index + 3);
          chars = false;
        }
        // DOCTYPE
      } else if (DOCTYPE_REGEXP.test(html)) {
        match = html.match(DOCTYPE_REGEXP);

        if (match) {
          html = html.replace(match[0], '');
          chars = false;
        }
        // end tag
      } else if (BEGING_END_TAGE_REGEXP.test(html)) {
        match = html.match(END_TAG_REGEXP);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(END_TAG_REGEXP, parseEndTag);
          chars = false;
        }

        // start tag
      } else if (BEGIN_TAG_REGEXP.test(html)) {
        match = html.match(START_TAG_REGEXP);

        if (match) {
          // We only have a valid start-tag if there is a '>'.
          if (match[4]) {
            html = html.substring(match[0].length);
            match[0].replace(START_TAG_REGEXP, parseStartTag);
          }
          chars = false;
        } else {
          // no ending tag found --- this piece should be encoded as an entity.
          text += '<';
          html = html.substring(1);
        }
      }

      if (chars) {
        index = html.indexOf("<");

        text += index < 0 ? html : html.substring(0, index);
        html = index < 0 ? "" : html.substring(index);

        if (handler.chars) handler.chars(decodeEntities(text));
      }

    } else {
      // IE versions 9 and 10 do not understand the regex '[^]', so using a workaround with [\W\w].
      html = html.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", 'i'),
        function (all, text) {
          text = text.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1");

          if (handler.chars) handler.chars(decodeEntities(text));

          return "";
        });

      parseEndTag("", stack.last());
    }

    if (html == last) {
      // benweet
      // throw $sanitizeMinErr('badparse', "The sanitizer was unable to parse the following block " +
      // 	"of html: {0}", html);
      stack.reverse();
      return stack.cl_each(function (tag) {
        buf.push('</');
        buf.push(tag);
        buf.push('>');
      });
    }
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName && tagName.toLowerCase();
    if (blockElements[tagName]) {
      while (stack.last() && inlineElements[stack.last()]) {
        parseEndTag("", stack.last());
      }
    }

    if (optionalEndTagElements[tagName] && stack.last() == tagName) {
      parseEndTag("", tagName);
    }

    unary = voidElements[tagName] || !!unary;

    if (!unary) {
      stack.push(tagName);
    }

    var attrs = {};

    rest.replace(ATTR_REGEXP,
      function (match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
        var value = doubleQuotedValue || singleQuotedValue || unquotedValue || '';

        attrs[name] = decodeEntities(value);
      });
    if (handler.start) handler.start(tagName, attrs, unary);
  }

  function parseEndTag(tag, tagName) {
    var pos = 0,
      i;
    tagName = tagName && tagName.toLowerCase();
    if (tagName) {
      // Find the closest opened tag of the same type
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] == tagName) break;
      }
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (i = stack.length - 1; i >= pos; i--)
        if (handler.end) handler.end(stack[i]);

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }
}

var hiddenPre = document.createElement("pre");
/**
 * decodes all entities into regular string
 * @param value
 * @returns {string} A string with decoded entities.
 */
function decodeEntities(value) {
  if (!value) {
    return '';
  }

  hiddenPre.innerHTML = value.replace(/</g, "&lt;");
  // innerText depends on styling as it doesn't display hidden elements.
  // Therefore, it's better to use textContent not to cause unnecessary reflows.
  return hiddenPre.textContent;
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
    replace(SURROGATE_PAIR_REGEXP, function (value) {
      var hi = value.charCodeAt(0);
      var low = value.charCodeAt(1);
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    }).
    replace(NON_ALPHANUMERIC_REGEXP, function (value) {
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
  var out = buf.push.bind(buf);
  return {
    start: function (tag, attrs, unary) {
      tag = tag && tag.toLowerCase();
      if (!ignore && specialElements[tag]) {
        ignore = tag;
      }
      if (!ignore && validElements[tag] === true) {
        out('<');
        out(tag);
        Object.keys(attrs).forEach(function (key) {
          var value = attrs[key];
          var lkey = key && key.toLowerCase();
          var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
          if (validAttrs[lkey] === true &&
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
    end: function (tag) {
      tag = tag && tag.toLowerCase();
      if (!ignore && validElements[tag] === true) {
        out('</');
        out(tag);
        out('>');
      }
      if (tag == ignore) {
        ignore = false;
      }
    },
    chars: function (chars) {
      if (!ignore) {
        out(encodeEntities(chars));
      }
    },
    comment: function (comment) {
      if (!ignore) {
        out('<!--');
        out(encodeEntities(comment));
        out('-->');
      }
    }
  };
}

function sanitizeHtml(html) {
  buf = [];
  htmlParser(html, htmlSanitizeWriter(buf, function (uri, isImage) {
    return !/^unsafe/.test(sanitizeUri(uri, isImage));
  }));
  return buf.join('');
}


export default {
  sanitizeHtml,
  sanitizeUri,
}
