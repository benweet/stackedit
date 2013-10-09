/*
 *  /MathJax/jax/output/HTML-CSS/autoload/mglyph.js
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var c="2.2";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax["HTML-CSS"],d=MathJax.Localization;a.mglyph.Augment({toHTML:function(k,g){var j=k,l=this.getValues("src","width","height","valign","alt"),f;k=this.HTMLcreateSpan(k);if(l.src===""){var i=this.Get("index");if(i){g=this.HTMLgetVariant();var e=g.defaultFont;if(e){e.noStyleChar=true;e.testString=String.fromCharCode(i)+"ABCabc";if(b.Font.testFont(e)){this.HTMLhandleVariant(k,g,String.fromCharCode(i))}else{if(l.alt===""){l.alt=d._(["MathML","BadMglyphFont"],"Bad font: %1",e.family)}f=a.merror(l.alt).With({mathsize:"75%"});this.Append(f);f.toHTML(k);this.data.pop();k.bbox=f.HTMLspanElement().bbox}}}}else{if(!this.img){this.img=a.mglyph.GLYPH[l.src]}if(!this.img){this.img=a.mglyph.GLYPH[l.src]={img:new Image(),status:"pending"};var h=this.img.img;h.onload=MathJax.Callback(["HTMLimgLoaded",this]);h.onerror=MathJax.Callback(["HTMLimgError",this]);h.src=l.src;MathJax.Hub.RestartAfter(h.onload)}if(this.img.status!=="OK"){f=a.merror(d._(["MathML","BadMglyph"],"Bad mglyph: %1",l.src)).With({mathsize:"75%"});this.Append(f);f.toHTML(k);this.data.pop();k.bbox=f.HTMLspanElement().bbox}else{var m=this.HTMLgetMu(k);h=b.addElement(k,"img",{isMathJax:true,src:l.src,alt:l.alt,title:l.alt});if(l.width){if(String(l.width).match(/^\s*-?\d+\s*$/)){l.width+="px"}h.style.width=b.Em(b.length2em(l.width,m,this.img.img.width/b.em))}if(l.height){if(String(l.height).match(/^\s*-?\d+\s*$/)){l.height+="px"}h.style.height=b.Em(b.length2em(l.height,m,this.img.img.height/b.em))}k.bbox.w=k.bbox.rw=h.offsetWidth/b.em;k.bbox.h=h.offsetHeight/b.em;if(l.valign){if(String(l.valign).match(/^\s*-?\d+\s*$/)){l.valign+="px"}k.bbox.d=-b.length2em(l.valign,m,this.img.img.height/b.em);h.style.verticalAlign=b.Em(-k.bbox.d);k.bbox.h-=k.bbox.d}}}if(!j.bbox){j.bbox={w:k.bbox.w,h:k.bbox.h,d:k.bbox.d,rw:k.bbox.rw,lw:k.bbox.lw}}else{if(k.bbox){j.bbox.w+=k.bbox.w;if(j.bbox.w>j.bbox.rw){j.bbox.rw=j.bbox.w}if(k.bbox.h>j.bbox.h){j.bbox.h=k.bbox.h}if(k.bbox.d>j.bbox.d){j.bbox.d=k.bbox.d}}}this.HTMLhandleSpace(k);this.HTMLhandleColor(k);return k},HTMLimgLoaded:function(f,e){if(typeof(f)==="string"){e=f}this.img.status=(e||"OK")},HTMLimgError:function(){this.img.img.onload("error")}},{GLYPH:{}});MathJax.Hub.Startup.signal.Post("HTML-CSS mglyph Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/mglyph.js")});

