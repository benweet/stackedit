/*
 *  /MathJax/jax/output/HTML-CSS/autoload/ms.js
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var c="2.3";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax["HTML-CSS"];a.ms.Augment({toHTML:function(e){e=this.HTMLhandleSize(this.HTMLcreateSpan(e));var d=this.getValues("lquote","rquote");var g=this.data.join("");var f=[];if(d.lquote.length===1){f.push(this.HTMLquoteRegExp(d.lquote))}if(d.rquote.length===1){f.push(this.HTMLquoteRegExp(d.rquote))}if(f.length){g=g.replace(RegExp("("+f.join("|")+")","g"),"\\$1")}this.HTMLhandleVariant(e,this.HTMLgetVariant(),d.lquote+g+d.rquote);this.HTMLhandleSpace(e);this.HTMLhandleColor(e);this.HTMLhandleDir(e);return e},HTMLquoteRegExp:function(d){return d.replace(/([.*+?|{}()\[\]\\])/g,"\\$1")}});a.ms.prototype.defaults.mathvariant="monospace";MathJax.Hub.Startup.signal.Post("HTML-CSS ms Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/ms.js")});
