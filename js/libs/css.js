/*
 * Require-CSS RequireJS css! loader plugin
 * Guy Bedford 2013
 * MIT
 */

/*
 *
 * Usage:
 *  require(['css!./mycssFile']);
 *
 * NB leave out the '.css' extension.
 *
 * - Fully supports cross origin CSS loading
 * - Works with builds
 *
 * Tested and working in (up to latest versions as of March 2013):
 * Android
 * iOS 6
 * IE 6 - 10
 * Chome 3 - 26
 * Firefox 3.5 - 19
 * Opera 10 - 12
 * 
 * browserling.com used for virtual testing environment
 *
 * Credit to B Cavalier & J Hann for the elegant IE 6 - 9 hack.
 * 
 * Sources that helped along the way:
 * - https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
 * - http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 * - https://github.com/cujojs/curl/blob/master/src/curl/plugin/css.js
 *
 */

define(['./normalize'], function(normalize) {
  function indexOf(a, e) { for (var i=0, l=a.length; i < l; i++) if (a[i] === e) return i; return -1 }

  if (typeof window == 'undefined')
    return { load: function(n, r, load){ load() } };

  // set to true to enable test prompts for device testing
  var testing = false;
  
  var head = document.getElementsByTagName('head')[0];

  var engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/);
  var hackLinks = false;

  if (!engine) {}
  else if (engine[1] || engine[7]) {
    hackLinks = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9;
    engine = 'trident';
  }
  else if (engine[2]) {
    // unfortunately style querying still doesnt work with onload callback in webkit
    hackLinks = true;
    engine = 'webkit';
  }
  else if (engine[3]) {
    // engine = 'opera';
  }
  else if (engine[4]) {
    hackLinks = parseInt(engine[4]) < 18;
    engine = 'gecko';
  }
  else if (testing)
    alert('Engine detection failed');
  
  //main api object
  var cssAPI = {};

  var absUrlRegEx = /^\/|([^\:\/]*:)/;
  
  cssAPI.pluginBuilder = './css-builder';

  // used by layer builds to register their css buffers
  
  // the current layer buffer items (from addBuffer)
  var curBuffer = [];

  // the callbacks for buffer loads
  var onBufferLoad = {};

  // the full list of resources in the buffer
  var bufferResources = [];

  cssAPI.addBuffer = function(resourceId) {
    // just in case layer scripts are included twice, also check
    // against the previous buffers
    if (indexOf(curBuffer, resourceId) != -1)
      return;
    if (indexOf(bufferResources, resourceId) != -1)
      return;
    curBuffer.push(resourceId);
    bufferResources.push(resourceId);
  }
  cssAPI.setBuffer = function(css, isLess) {
    var pathname = window.location.pathname.split('/');
    pathname.pop();
    pathname = pathname.join('/') + '/';

    var baseParts = require.toUrl('base_url').split('/');
    baseParts.pop();
    var baseUrl = baseParts.join('/') + '/';
    baseUrl = normalize.convertURIBase(baseUrl, pathname, '/');
    if (!baseUrl.match(absUrlRegEx))
      baseUrl = '/' + baseUrl;
    if (baseUrl.substr(baseUrl.length - 1, 1) != '/')
      baseUrl = baseUrl + '/';

    cssAPI.inject(normalize(css, baseUrl, pathname));

    // set up attach callback if registered
    // clear the current buffer for the next layer
    // (just the less or css part as we have two buffers in one effectively)
    for (var i = 0; i < curBuffer.length; i++) {
      // find the resources in the less or css buffer dependening which one this is
      if ((isLess && curBuffer[i].substr(curBuffer[i].length - 5, 5) == '.less') ||
        (!isLess && curBuffer[i].substr(curBuffer[i].length - 4, 4) == '.css')) {
        (function(resourceId) {
          // mark that the onBufferLoad is about to be called (set to true if not already a callback function)
          onBufferLoad[resourceId] = onBufferLoad[resourceId] || true;

          // set a short timeout (as injection isn't instant in Chrome), then call the load
          setTimeout(function() {
            if (typeof onBufferLoad[resourceId] == 'function')
              onBufferLoad[resourceId]();
            // remove from onBufferLoad to indicate loaded
            delete onBufferLoad[resourceId];
          }, 7);
        })(curBuffer[i]);

        // remove the current resource from the buffer
        curBuffer.splice(i--, 1);
      }
    }
  }
  cssAPI.attachBuffer = function(resourceId, load) {
    // attach can happen during buffer collecting, or between injection and callback
    // we assume it is not possible to attach multiple callbacks
    // requirejs plugin load function ensures this by queueing duplicate calls

    // check if the resourceId is in the current buffer
    for (var i = 0; i < curBuffer.length; i++)
      if (curBuffer[i] == resourceId) {
        onBufferLoad[resourceId] = load;
        return true;
      }

    // check if the resourceId is waiting for injection callback
    // (onBufferLoad === true is a shortcut indicator for this)
    if (onBufferLoad[resourceId] === true) {
      onBufferLoad[resourceId] = load;
      return true;
    }

    // if it's in the full buffer list and not either of the above, its loaded already
    if (indexOf(bufferResources, resourceId) != -1) {
      load();
      return true;
    }
  }

  var webkitLoadCheck = function(link, callback) {
    setTimeout(function() {
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (sheet.href == link.href)
          return callback();
      }
      webkitLoadCheck(link, callback);
    }, 10);
  }

  var mozillaLoadCheck = function(style, callback) {
    setTimeout(function() {
      try {
        style.sheet.cssRules;
        return callback();
      } catch (e){}
      mozillaLoadCheck(style, callback);
    }, 10);
  }

  // ie link detection, as adapted from https://github.com/cujojs/curl/blob/master/src/curl/plugin/css.js
  if (engine == 'trident' && hackLinks) {
    var ieStyles = [],
      ieQueue = [],
      ieStyleCnt = 0;
    var ieLoad = function(url, callback) {
      var style;
      ieQueue.push({
        url: url,
        cb: callback
      });
      style = ieStyles.shift();
      if (!style && ieStyleCnt++ < 31) {
        style = document.createElement('style');
        head.appendChild(style);
      }
      if (style)
        ieLoadNextImport(style);
    }
    var ieLoadNextImport = function(style) {
      var curImport = ieQueue.shift();
      if (!curImport) {
        style.onload = noop;
        ieStyles.push(style);
        return;  
      }
      style.onload = function() {
        curImport.cb(curImport.ss);
        ieLoadNextImport(style);
      };
      var curSheet = style.styleSheet;
      curImport.ss = curSheet.imports[curSheet.addImport(curImport.url)];
    }
  }

  // uses the <link> load method
  var createLink = function(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    return link;
  }

  var noop = function(){}

  cssAPI.linkLoad = function(url, callback) {
    var timeout = setTimeout(function() {
      if (testing) alert('timeout');
      callback();
    }, waitSeconds * 1000 - 100);
    var _callback = function() {
      clearTimeout(timeout);
      if (link)
        link.onload = noop;
      // for style querying, a short delay still seems necessary
      setTimeout(callback, 7);
    }
    if (!hackLinks) {
      var link = createLink(url);
      link.onload = _callback;
      head.appendChild(link);
    }
    // hacks
    else {
      if (engine == 'webkit') {
        var link = createLink(url);
        webkitLoadCheck(link, _callback);
        head.appendChild(link);
      }
      else if (engine == 'gecko') {
        var style = document.createElement('style');
        style.textContent = '@import "' + url + '"';
        mozillaLoadCheck(style, _callback);
        head.appendChild(style);
      }
      else if (engine == 'trident')
        ieLoad(url, _callback);
    }
  }

  /* injection api */
  var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
  var fileCache = {};
  var get = function(url, callback, errback) {
    if (fileCache[url]) {
      callback(fileCache[url]);
      return;
    }

    var xhr, i, progId;
    if (typeof XMLHttpRequest !== 'undefined')
      xhr = new XMLHttpRequest();
    else if (typeof ActiveXObject !== 'undefined')
      for (i = 0; i < 3; i += 1) {
        progId = progIds[i];
        try {
          xhr = new ActiveXObject(progId);
        }
        catch (e) {}
  
        if (xhr) {
          progIds = [progId];  // so faster next time
          break;
        }
      }
    
    xhr.open('GET', url, requirejs.inlineRequire ? false : true);
  
    xhr.onreadystatechange = function (evt) {
      var status, err;
      //Do not explicitly handle errors, those should be
      //visible via console output in the browser.
      if (xhr.readyState === 4) {
        status = xhr.status;
        if (status > 399 && status < 600) {
          //An http 4xx or 5xx error. Signal an error.
          err = new Error(url + ' HTTP status: ' + status);
          err.xhr = xhr;
          errback(err);
        }
        else {
          fileCache[url] = xhr.responseText;
          callback(xhr.responseText);
        }
      }
    };
    
    xhr.send(null);
  }
  //uses the <style> load method
  var styleCnt = 0;
  var curStyle;
  cssAPI.inject = function(css) {
    if (styleCnt < 31) {
      curStyle = document.createElement('style');
      curStyle.type = 'text/css';
      head.appendChild(curStyle);
      styleCnt++;
    }
    if (curStyle.styleSheet)
      curStyle.styleSheet.cssText += css;
    else
      curStyle.appendChild(document.createTextNode(css));
  }
  
  // NB add @media query support for media imports
  var importRegEx = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g;

  var pathname = window.location.pathname.split('/');
  pathname.pop();
  pathname = pathname.join('/') + '/';

  var loadCSS = function(fileUrl, callback, errback) {

    //make file url absolute
    if (!fileUrl.match(absUrlRegEx))
      fileUrl = '/' + normalize.convertURIBase(fileUrl, pathname, '/');

    get(fileUrl, function(css) {

      // normalize the css (except import statements)
      css = normalize(css, fileUrl, pathname);

      // detect all import statements in the css and normalize
      var importUrls = [];
      var importIndex = [];
      var importLength = [];
      var match;
      while (match = importRegEx.exec(css)) {
        var importUrl = match[4] || match[5] || match[7] || match[8] || match[9];

        importUrls.push(importUrl);
        importIndex.push(importRegEx.lastIndex - match[0].length);
        importLength.push(match[0].length);
      }

      // load the import stylesheets and substitute into the css
      var completeCnt = 0;
      for (var i = 0; i < importUrls.length; i++)
        (function(i) {
          loadCSS(importUrls[i], function(importCSS) {
            css = css.substr(0, importIndex[i]) + importCSS + css.substr(importIndex[i] + importLength[i]);
            var lenDiff = importCSS.length - importLength[i];
            for (var j = i + 1; j < importUrls.length; j++)
              importIndex[j] += lenDiff;
            completeCnt++;
            if (completeCnt == importUrls.length) {
              callback(css);
            }
          }, errback);
        })(i);

      if (importUrls.length == 0)
        callback(css);
    }, errback);
  }

  
  cssAPI.normalize = function(name, normalize) {
    if (name.substr(name.length - 4, 4) == '.css')
      name = name.substr(0, name.length - 4);
    
    return normalize(name);
  }
  
  var waitSeconds;
  var alerted = false;
  cssAPI.load = function(cssId, req, load, config, parse) {
    
    waitSeconds = waitSeconds || config.waitSeconds || 7;

    var resourceId = cssId + (!parse ? '.css' : '.less');

    // attach the load function to a buffer if there is one in registration
    // if not, we do a full injection load
    if (cssAPI.attachBuffer(resourceId, load))
      return;

    var fileUrl = req.toUrl(resourceId);
    
    if (!alerted && testing) {
      alert(hackLinks ? 'hacking links' : 'not hacking');
      alerted = true;
    }

    if (!parse) {
      cssAPI.linkLoad(fileUrl, load);
    }
    else {
      loadCSS(fileUrl, function(css) {
        // run parsing after normalization - since less is a CSS subset this works fine
        if (parse)
          css = parse(css, function(css) {
            cssAPI.inject(css);
            setTimeout(load, 7);
          });
      });
    }
  }

  if (testing)
    cssAPI.inspect = function() {
      if (stylesheet.styleSheet)
        return stylesheet.styleSheet.cssText;
      else if (stylesheet.innerHTML)
        return stylesheet.innerHTML;
    }
  
  return cssAPI;
});
