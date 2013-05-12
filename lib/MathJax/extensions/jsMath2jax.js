/*
 *  /MathJax/extensions/jsMath2jax.js
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

MathJax.Extension.jsMath2jax={version:"2.1",config:{preview:"TeX"},PreProcess:function(b){if(!this.configured){this.config=MathJax.Hub.CombineConfig("jsMath2jax",this.config);if(this.config.Augment){MathJax.Hub.Insert(this,this.config.Augment)}if(typeof(this.config.previewTeX)!=="undefined"&&!this.config.previewTeX){this.config.preview="none"}this.previewClass=MathJax.Hub.config.preRemoveClass;this.configured=true}if(typeof(b)==="string"){b=document.getElementById(b)}if(!b){b=document.body}var c=b.getElementsByTagName("span"),a;for(a=c.length-1;a>=0;a--){if(String(c[a].className).match(/(^| )math( |$)/)){this.ConvertMath(c[a],"")}}var d=b.getElementsByTagName("div");for(a=d.length-1;a>=0;a--){if(String(d[a].className).match(/(^| )math( |$)/)){this.ConvertMath(d[a],"; mode=display")}}},ConvertMath:function(c,d){if(c.getElementsByTagName("script").length===0){var b=c.parentNode,a=this.createMathTag(d,c.innerHTML);if(c.nextSibling){b.insertBefore(a,c.nextSibling)}else{b.appendChild(a)}if(this.config.preview!=="none"){this.createPreview(c)}b.removeChild(c)}},createPreview:function(a){var b;if(this.config.preview==="TeX"){b=[this.filterPreview(a.innerHTML)]}else{if(this.config.preview instanceof Array){b=this.config.preview}}if(b){b=MathJax.HTML.Element("span",{className:MathJax.Hub.config.preRemoveClass},b);a.parentNode.insertBefore(b,a)}},createMathTag:function(c,b){b=b.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");var a=document.createElement("script");a.type="math/tex"+c;MathJax.HTML.setScript(a,b);return a},filterPreview:function(a){return a}};MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.jsMath2jax],8);MathJax.Ajax.loadComplete("[MathJax]/extensions/jsMath2jax.js");

