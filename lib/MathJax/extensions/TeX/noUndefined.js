/*
 *  /MathJax/extensions/TeX/noUndefined.js
 *  
 *  Copyright (c) 2012 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Extension["TeX/noUndefined"]={version:"2.1",config:MathJax.Hub.CombineConfig("TeX.noUndefined",{disabled:false,attributes:{mathcolor:"red"}})};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.Extension["TeX/noUndefined"].config;var a=MathJax.ElementJax.mml;var c=MathJax.InputJax.TeX.Parse.prototype.csUndefined;MathJax.InputJax.TeX.Parse.Augment({csUndefined:function(d){if(b.disabled){return c.apply(this,arguments)}MathJax.Hub.signal.Post(["TeX Jax - undefined control sequence",d]);this.Push(a.mtext(d).With(b.attributes))}});MathJax.Hub.Startup.signal.Post("TeX noUndefined Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/noUndefined.js");

