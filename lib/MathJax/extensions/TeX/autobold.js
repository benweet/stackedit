/*
 *  /MathJax/extensions/TeX/autobold.js
 *  
 *  Copyright (c) 2009-2013 The MathJax Consortium
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Extension["TeX/autobold"]={version:"2.2"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.InputJax.TeX;a.prefilterHooks.Add(function(d){var c=d.script.parentNode.insertBefore(document.createElement("span"),d.script);c.visibility="hidden";c.style.fontFamily="Times, serif";c.appendChild(document.createTextNode("ABCXYZabcxyz"));var b=c.offsetWidth;c.style.fontWeight="bold";if(b&&c.offsetWidth===b){d.math="\\boldsymbol{"+d.math+"}"}c.parentNode.removeChild(c)});MathJax.Hub.Startup.signal.Post("TeX autobold Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/autobold.js");

