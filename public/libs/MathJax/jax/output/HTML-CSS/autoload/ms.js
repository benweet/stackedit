/*
 *  /MathJax/jax/output/HTML-CSS/autoload/ms.js
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var c="2.2";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax["HTML-CSS"];a.ms.Augment({toHTML:function(e){e=this.HTMLhandleSize(this.HTMLcreateSpan(e));var d=this.getValues("lquote","rquote");var g=this.data.join("");var f=[];if(d.lquote.length===1){f.push(this.HTMLquoteRegExp(d.lquote))}if(d.rquote.length===1){f.push(this.HTMLquoteRegExp(d.rquote))}if(f.length){g=g.replace(RegExp("("+f.join("|")+")","g"),"\\$1")}this.HTMLhandleVariant(e,this.HTMLgetVariant(),d.lquote+g+d.rquote);this.HTMLhandleSpace(e);this.HTMLhandleColor(e);return e},HTMLquoteRegExp:function(d){return d.replace(/([.*+?|{}()\[\]\\])/g,"\\$1")}});a.ms.prototype.defaults.mathvariant="monospace";MathJax.Hub.Startup.signal.Post("HTML-CSS ms Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/ms.js")});

