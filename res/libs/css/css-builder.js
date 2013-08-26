define(['require', './normalize'], function(req, normalize) {
  var nodePrint = function() {};
  if (requirejs.tools)
    requirejs.tools.useLib(function(req) {
      req(['node/print'], function(_nodePrint) {
        nodePrint = _nodePrint;
      }, function(){});
    });
  
  var cssAPI = {};
  
  function compress(css) {
    if (typeof process !== "undefined" && process.versions && !!process.versions.node && require.nodeRequire) {
      try {
        var csso = require.nodeRequire('csso');
        var csslen = css.length;
        css = csso.justDoIt(css);
        nodePrint('Compressed CSS output to ' + Math.round(css.length / csslen * 100) + '%.');
        return css;
      }
      catch(e) {
        nodePrint('Compression module not installed. Use "npm install csso -g" to enable.');
        return css;
      }
    }
    nodePrint('Compression not supported outside of nodejs environments.');
    return css;
  }
  
  //load file code - stolen from text plugin
  function loadFile(path) {
    if (typeof process !== "undefined" && process.versions && !!process.versions.node && require.nodeRequire) {
      var fs = require.nodeRequire('fs');
      var file = fs.readFileSync(path, 'utf8');
      if (file.indexOf('\uFEFF') === 0)
        return file.substring(1);
      return file;
    }
    else {
      var file = new java.io.File(path),
        lineSeparator = java.lang.System.getProperty("line.separator"),
        input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), 'utf-8')),
        stringBuffer, line;
      try {
        stringBuffer = new java.lang.StringBuffer();
        line = input.readLine();
        if (line && line.length() && line.charAt(0) === 0xfeff)
          line = line.substring(1);
        stringBuffer.append(line);
        while ((line = input.readLine()) !== null) {
          stringBuffer.append(lineSeparator).append(line);
        }
        return String(stringBuffer.toString());
      }
      finally {
        input.close();
      }
    }
  }
  
  
  function saveFile(path, data) {
    if (typeof process !== "undefined" && process.versions && !!process.versions.node && require.nodeRequire) {
      var fs = require.nodeRequire('fs');
      fs.writeFileSync(path, data, 'utf8');
    }
    else {
      var content = new java.lang.String(data);
      var output = new java.io.BufferedWriter(new java.io.OutputStreamWriter(new java.io.FileOutputStream(path), 'utf-8'));
  
      try {
        output.write(content, 0, content.length());
        output.flush();
      }
      finally {
        output.close();
      }
    }
  }
  
  //when adding to the link buffer, paths are normalised to the baseUrl
  //when removing from the link buffer, paths are normalised to the output file path
  function escape(content) {
    return content.replace(/(["'\\])/g, '\\$1')
      .replace(/[\f]/g, "\\f")
      .replace(/[\b]/g, "\\b")
      .replace(/[\n]/g, "\\n")
      .replace(/[\t]/g, "\\t")
      .replace(/[\r]/g, "\\r");
  }

  // NB add @media query support for media imports
  var importRegEx = /@import\s*(url)?\s*(('([^']*)'|"([^"]*)")|\(('([^']*)'|"([^"]*)"|([^\)]*))\))\s*;?/g;

  var loadCSSFile = function(fileUrl) {
    var css = loadFile(fileUrl);

    // normalize the css (except import statements)
    css = normalize(css, fileUrl, baseUrl, cssBase);

    // detect all import statements in the css and normalize
    var importUrls = [];
    var importIndex = [];
    var importLength = [];
    var match;
    while (match = importRegEx.exec(css)) {
      var importUrl = match[4] || match[5] || match[7] || match[8] || match[9];

      // normalize import url
      if (importUrl.substr(importUrl.length - 5, 5) != '.less' && importUrl.substr(importUrl.length - 4, 4) != '.css')
        importUrl += '.css';

      // contains a protocol
      if (importUrl.match(/:\/\//))
        continue;

      // relative to css base
      if (importUrl.substr(0, 1) == '/' && cssBase)
        importUrl = cssBase + importUrl;
      else
        importUrl = baseUrl + importUrl;

      importUrls.push(importUrl);
      importIndex.push(importRegEx.lastIndex - match[0].length);
      importLength.push(match[0].length);
    }

    // load the import stylesheets and substitute into the css
    for (var i = 0; i < importUrls.length; i++)
      (function(i) {
        var importCSS = loadCSSFile(importUrls[i]);
        css = css.substr(0, importIndex[i]) + importCSS + css.substr(importIndex[i] + importLength[i]);
        var lenDiff = importCSS.length - importLength[i];
        for (var j = i + 1; j < importUrls.length; j++)
          importIndex[j] += lenDiff;
      })(i);

    return css;
  }
  

  var baseUrl;  
  var cssBase;
  var curModule;
  cssAPI.load = function(name, req, load, config, parse) {
    if (!baseUrl)
      baseUrl = config.baseUrl;
    
    if (!cssBase)
      cssBase = config.cssBase;

    if (config.modules) {
      //run through the module list - the first one without a layer set is the current layer we are in
      //allows to track the current layer number for layer-specific config
      for (var i = 0; i < config.modules.length; i++)
        if (config.modules[i].layer === undefined) {
          curModule = i;
          break;
        }
    }
    
    //store config
    cssAPI.config = cssAPI.config || config;

    name += !parse ? '.css' : '.less';

    var fileUrl = req.toUrl(name);

    //external URLS don't get added (just like JS requires)
    if (fileUrl.substr(0, 7) == 'http://' || fileUrl.substr(0, 8) == 'https://')
      return load();

    //add to the buffer
    _cssBuffer[name] = loadCSSFile(fileUrl);

    // parse if necessary
    if (parse)
      _cssBuffer[name] = parse(_cssBuffer[name]);

    load();
  }
  
  cssAPI.normalize = function(name, normalize) {
    if (name.substr(name.length - 4, 4) == '.css')
      name = name.substr(0, name.length - 4);
    return normalize(name);
  }
  
  //list of cssIds included in this layer
  var _layerBuffer = [];
  var _cssBuffer = [];
  cssAPI.write = function(pluginName, moduleName, write, parse) {
    //external URLS don't get added (just like JS requires)
    if (moduleName.substr(0, 7) == 'http://' || moduleName.substr(0, 8) == 'https://' || moduleName.substr(0, 2) == '//')
      return;
    
    var resourceName = moduleName + (!parse ? '.css' : '.less');
    _layerBuffer.push(_cssBuffer[resourceName]);

    var separateCSS = false;
    if (cssAPI.config.separateCSS)
      separateCSS = true;
    if (typeof curModule == 'number' && cssAPI.config.modules[curModule].separateCSS !== undefined)
      separateCSS = cssAPI.config.modules[curModule].separateCSS;
    if (separateCSS)
      write.asModule(pluginName + '!' + moduleName, 'define(function(){})');
    else
      write("requirejs.s.contexts._.nextTick = function(f){f()}; require(['css'], function(css) { css.addBuffer('" + resourceName + "'); }); requirejs.s.contexts._.nextTick = requirejs.nextTick;");
  }
  
  cssAPI.onLayerEnd = function(write, data, parser) {
    firstWrite = true;
    //separateCSS parameter set either globally or as a layer setting
    var separateCSS = false;
    if (cssAPI.config.separateCSS)
      separateCSS = true;
    if (typeof curModule == 'number' && cssAPI.config.modules[curModule].separateCSS !== undefined)
      separateCSS = cssAPI.config.modules[curModule].separateCSS;
    curModule = null;
    
    //calculate layer css
    var css = _layerBuffer.join('');
    
    if (separateCSS) {
      nodePrint('Writing CSS! file: ' + data.name + '\n');
      
      //calculate the css output path for this layer
      var path = this.config.appDir ? this.config.baseUrl + data.name + '.css' : cssAPI.config.out.replace(/\.js$/, '.css');
      
      //renormalize the css to the output path
      var output = compress(normalize(css, baseUrl, path));
      
      saveFile(path, output);
    }
    else {
      if (css == '')
        return;
      //write the injection and layer index into the layer
      //prepare the css
      css = escape(compress(css));
      
      //the code below overrides async require functionality to ensure instant buffer injection
      write("requirejs.s.contexts._.nextTick = function(f){f()}; require(['css'], function(css) { css.setBuffer('" + css + (parser ? "', true" : "'") + "); }); requirejs.s.contexts._.nextTick = requirejs.nextTick; ");
    }
    
    //clear layer buffer for next layer
    _layerBuffer = [];
  }
  
  return cssAPI;
});
