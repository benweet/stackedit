/*
 * to-markdown - an HTML to Markdown converter
 *
 * Copyright 2011-2012, Dom Christie
 * Licenced under the MIT licence
 *
 */

(function() {
  
  var root = this;
  var toMarkdown = {};
  var isNode = false;
  
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = toMarkdown;
    root.toMarkdown = toMarkdown;
    isNode = true;
  }
  else {
    root.toMarkdown = toMarkdown;
  }
  
  toMarkdown.converter = function(options) {
    
    if(options && options.elements && $.isArray(options.elements)) {
      ELEMENTS = ELEMENTS.concat(options.elements);
    }
    
    this.makeMd = function(input, callback) {
      var result;
      if(isNode) {
        var jsdom = require('jsdom');
        jsdom.env({
          html: input,
          scripts: [
            'http://code.jquery.com/jquery-1.6.4.min.js'
          ],
          done: function(errors, window) {
            if(typeof callback === 'function') {
              callback(process(input, window.$));
            }
          }
        });
      }
      else {
        result = process(input, $);
      }
      return result;
    };
  };
  
  var process = function(input, $) {
    // Escape potential ol triggers
    // see bottom of lists section: http://daringfireball.net/projects/markdown/syntax#list
    input = input.replace(/(\d+)\. /g, '$1\\. ');

    // Wrap in containing div
    var $container = $('<div/>');
    var $input = $container.html(input);

    // Remove whitespace
    $input.find('*:not(pre, code)').contents().filter(function() {
      return this.nodeType === 3 && (/^\s+$/.test(this.nodeValue));
    }).remove();
    
    var selectors = [];
    for(var i = 0, len = ELEMENTS.length; i < len; i++) {
      selectors.push(ELEMENTS[i].selector);
    }
    selectors = selectors.join(',');
    
    while($input.find(selectors).length) {
      for(var i = 0, len = ELEMENTS.length; i < len; i++) {

        // Find the innermost elements containing NO children that convert to markdown
        $matches = $input.find(ELEMENTS[i].selector + ':not(:has("' + selectors + '"))');

        $matches.each(function(j, el) {
          var $el = $(el);
          $el.before(ELEMENTS[i].replacement($el.html(), $el)).remove();
        });
      }
    }
    return cleanUp($input.html());
  };
  
  // =============
  // = Utilities =
  // =============
  
  var trimNewLines = function(str) {
    return str.replace(/^[\n\r\f]+|[\n\r\f]+$/g, '');
  };
  
  var decodeHtmlEntities = function(str) {
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  };

  var cleanUp = function(string) {
    string = string.replace(/^[\t\r\n]+|[\t\r\n]+$/g, ''); // trim leading/trailing whitespace
    string = string.replace(/\n\s+\n/g, '\n\n');
    string = string.replace(/\n{3,}/g, '\n\n'); // limit consecutive linebreaks to 2
    string = decodeHtmlEntities(string);
    return string;
  };
  
  var strongReplacement = function(innerHTML) {
    innerHTML = trimNewLines(innerHTML);
    return innerHTML ? '**' + innerHTML + '**' : '';
  };
  var emReplacement = function(innerHTML) {
    innerHTML = trimNewLines(innerHTML);
    return innerHTML ? '_' + innerHTML + '_' : '';
  };
  
  // ============
  // = Elements =
  // ============
  
  var ELEMENTS = [
    {
      selector: 'p',
      replacement: function(innerHTML, el) {
        innerHTML = $.trim(innerHTML);
        return innerHTML ? '\n\n' + innerHTML + '\n\n' : '';
      }
    },
    {
      selector: 'br',
      replacement: function(innerHTML, el) {
        return '\n';
      }
    },
    {
      selector: 'h1,h2,h3,h4,h5,h6',
      replacement: function(innerHTML, $el) {
        innerHTML = $.trim(innerHTML);
        var hLevel = $el.prop("nodeName").charAt(1),
            prefix = '';
        for(var i = 0; i < hLevel; i++) {
          prefix += '#';
        }
        return innerHTML ? '\n\n' + prefix + ' ' + innerHTML + '\n\n' : '';
      }
    },
    {
      selector: 'hr',
      replacement: function(innerHTML, el) {
        return '\n\n* * *\n\n';
      }
    },
    {
      selector: 'a[href]',
      replacement: function(innerHTML, $el) {
        if(innerHTML) {
          innerHTML = trimNewLines(innerHTML);
          var href = $el.attr('href'),
              title = $el.attr('title') || '';
          return '[' + innerHTML + ']' + '(' + href + (title ? ' "' + title + '"' : '') + ')';
        }
        else {
          return false;
        }
      }
    },
    {
      selector: 'b',
      replacement: strongReplacement
    },
    {
      selector: 'strong',
      replacement: strongReplacement
    },
    {
      selector: 'i',
      replacement: emReplacement
    },
    {
      selector: 'em',
      replacement: emReplacement
    },
    {
      selector: 'code',
      replacement: function(innerHTML, el) {
        innerHTML = trimNewLines(innerHTML);
        return innerHTML ? '`' + innerHTML + '`' : '';
      }
    },
    {
      selector: 'img',
      replacement: function(innerHTML, $el) {
        var alt = $el.attr('alt') || '',
            src = $el.attr('src') || '',
            title = $el.attr('title') || '';
        return '![' + alt + ']' + '(' + src + (title ? ' "' + title + '"' : '') + ')';
      }
    },
    {
      selector: 'pre',
      replacement: function(innerHTML, el) {
        if(/^\s*\`/.test(innerHTML)) {
          innerHTML = innerHTML.replace(/\`/g, '');
          return '    ' + innerHTML.replace(/\n/g, '\n    ');
        }
        else {
          return '';
        }
      }
    },
    {
      selector: 'li',
      replacement: function(innerHTML, $el) {
        innerHTML = innerHTML.replace(/^\s+|\s+$/, '').replace(/\n/gm, '\n    ');
        var prefix = '*   ';
        var suffix = '';
        var $parent = $el.parent();
        var $children = $parent.contents().filter(function() {
          return (this.nodeType === 1 && this.nodeName === 'LI') || (this.nodeType === 3);
        });
        var index = $children.index($el) + 1;

        prefix = $parent.is('ol') ? index + '.  ' : '*   ';
        if(index == $children.length) {
          if(!$el.parents('li').length) {
            suffix = '\n';
          }
          innerHTML = innerHTML.replace(/\s+$/, ''); // Trim
          $el.unwrap();
        }
        return prefix + innerHTML + suffix + '\n';
      }
    },
    {
      selector: 'blockquote',
      replacement: function(innerHTML, el) {
        innerHTML = innerHTML = $.trim(innerHTML).replace(/\n{3,}/g, '\n\n');
        innerHTML = innerHTML.replace(/\n/g, '\n&gt; ');
        return "&gt; " + innerHTML;
      }
    }
  ];

  var NON_MD_BLOCK_ELEMENTS = ['address', 'article', 'aside', 'audio', 'canvas', 'div', 'dl', 'dd', 'dt',
    'fieldset', 'figcaption', 'figure', 'footer', 'form', 'header', 'hgroup', 'output',
    'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'section', 'video'];

})();
