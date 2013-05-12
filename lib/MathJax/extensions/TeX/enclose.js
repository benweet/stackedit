/*
 *  /MathJax/extensions/TeX/enclose.js
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

MathJax.Extension["TeX/enclose"]={version:"2.1",ALLOWED:{arrow:1,color:1,mathcolor:1,background:1,mathbackground:1,padding:1,thickness:1}};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var c=MathJax.InputJax.TeX,a=MathJax.ElementJax.mml,b=MathJax.Extension["TeX/enclose"].ALLOWED;c.Definitions.Add({macros:{enclose:"Enclose"}},null,true);c.Parse.Augment({Enclose:function(g){var k=this.GetArgument(g),e=this.GetBrackets(g),j=this.ParseArg(g);var l={notation:k.replace(/,/g," ")};if(e){e=e.replace(/ /g,"").split(/,/);for(var h=0,d=e.length;h<d;h++){var f=e[h].split(/[:=]/);if(b[f[0]]){f[1]=f[1].replace(/^"(.*)"$/,"$1");if(f[1]==="true"){f[1]=true}if(f[1]==="false"){f[1]=false}l[f[0]]=f[1]}}}this.Push(a.menclose(j).With(l))}});MathJax.Hub.Startup.signal.Post("TeX enclose Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/enclose.js");

