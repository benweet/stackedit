/*
 *  /MathJax/jax/output/SVG/autoload/ms.js
 *
 *  Copyright (c) 2009-2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var b="2.3";var a=MathJax.ElementJax.mml,c=MathJax.OutputJax.SVG;a.ms.Augment({toSVG:function(){this.SVGgetStyles();var e=this.SVG();this.SVGhandleSpace(e);var d=this.getValues("lquote","rquote");var f=this.SVGgetVariant(),i=this.SVGgetScale();var h=this.data.join("");var g=[];if(d.lquote.length===1){g.push(this.SVGquoteRegExp(d.lquote))}if(d.rquote.length===1){g.push(this.SVGquoteRegExp(d.rquote))}if(g.length){h=h.replace(RegExp("("+g.join("|")+")","g"),"\\$1")}e.Add(this.SVGhandleVariant(f,i,d.lquote+h+d.rquote));e.Clean();this.SVGhandleColor(e);this.SVGsaveData(e);return e},SVGquoteRegExp:function(d){return d.replace(/([.*+?|{}()\[\]\\])/g,"\\$1")}});a.ms.prototype.defaults.mathvariant="monospace";MathJax.Hub.Startup.signal.Post("SVG ms Ready");MathJax.Ajax.loadComplete(c.autoloadDir+"/ms.js")});
