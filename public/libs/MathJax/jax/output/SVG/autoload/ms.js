/*
 *  /MathJax/jax/output/SVG/autoload/ms.js
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

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var b="2.2";var a=MathJax.ElementJax.mml,c=MathJax.OutputJax.SVG;a.ms.Augment({toSVG:function(){this.SVGgetStyles();var e=this.SVG();this.SVGhandleSpace(e);var d=this.getValues("lquote","rquote");var f=this.SVGgetVariant(),i=this.SVGgetScale();var h=this.data.join("");var g=[];if(d.lquote.length===1){g.push(this.SVGquoteRegExp(d.lquote))}if(d.rquote.length===1){g.push(this.SVGquoteRegExp(d.rquote))}if(g.length){h=h.replace(RegExp("("+g.join("|")+")","g"),"\\$1")}e.Add(this.SVGhandleVariant(f,i,d.lquote+h+d.rquote));e.Clean();this.SVGhandleColor(e);this.SVGsaveData(e);return e},SVGquoteRegExp:function(d){return d.replace(/([.*+?|{}()\[\]\\])/g,"\\$1")}});a.ms.prototype.defaults.mathvariant="monospace";MathJax.Hub.Startup.signal.Post("SVG ms Ready");MathJax.Ajax.loadComplete(c.autoloadDir+"/ms.js")});

