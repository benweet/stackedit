/*
 *  /MathJax/extensions/TeX/verb.js
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

MathJax.Extension["TeX/verb"]={version:"2.1"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.ElementJax.mml;var c=MathJax.InputJax.TeX;var b=c.Definitions;b.Add({macros:{verb:"Verb"}},null,true);c.Parse.Augment({Verb:function(d){var g=this.GetNext();var f=++this.i;if(g==""){c.Error(d+" requires an argument")}while(this.i<this.string.length&&this.string.charAt(this.i)!=g){this.i++}if(this.i==this.string.length){c.Error("Can't find closing delimiter for "+d)}var e=this.string.slice(f,this.i);this.i++;this.Push(a.mtext(e).With({mathvariant:a.VARIANT.MONOSPACE}))}});MathJax.Hub.Startup.signal.Post("TeX verb Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/verb.js");

