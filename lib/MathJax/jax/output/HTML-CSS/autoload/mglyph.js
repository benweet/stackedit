/*
 *  /MathJax/jax/output/HTML-CSS/autoload/mglyph.js
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var c="2.1";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax["HTML-CSS"];a.mglyph.Augment({toHTML:function(j,f){var i=j,k=this.getValues("src","width","height","valign","alt"),e;j=this.HTMLcreateSpan(j);if(k.src===""){var h=this.Get("index");if(h){f=this.HTMLgetVariant();var d=f.defaultFont;if(d){d.noStyleChar=true;d.testString=String.fromCharCode(h)+"ABCabc";if(b.Font.testFont(d)){this.HTMLhandleVariant(j,f,String.fromCharCode(h))}else{if(k.alt===""){k.alt="Bad font: "+d.family}e=a.merror(k.alt).With({mathsize:"75%"});this.Append(e);e.toHTML(j);this.data.pop();j.bbox=e.HTMLspanElement().bbox}}}}else{if(!this.img){this.img=a.mglyph.GLYPH[k.src]}if(!this.img){this.img=a.mglyph.GLYPH[k.src]={img:new Image(),status:"pending"};var g=this.img.img;g.onload=MathJax.Callback(["HTMLimgLoaded",this]);g.onerror=MathJax.Callback(["HTMLimgError",this]);g.src=k.src;MathJax.Hub.RestartAfter(g.onload)}if(this.img.status!=="OK"){e=a.merror("Bad mglyph: "+k.src).With({mathsize:"75%"});this.Append(e);e.toHTML(j);this.data.pop();j.bbox=e.HTMLspanElement().bbox}else{var l=this.HTMLgetMu(j);g=b.addElement(j,"img",{isMathJax:true,src:k.src,alt:k.alt,title:k.alt});if(k.width){if(String(k.width).match(/^\s*-?\d+\s*$/)){k.width+="px"}g.style.width=b.Em(b.length2em(k.width,l,this.img.img.width/b.em))}if(k.height){if(String(k.height).match(/^\s*-?\d+\s*$/)){k.height+="px"}g.style.height=b.Em(b.length2em(k.height,l,this.img.img.height/b.em))}j.bbox.w=j.bbox.rw=g.offsetWidth/b.em;j.bbox.h=g.offsetHeight/b.em;if(k.valign){if(String(k.valign).match(/^\s*-?\d+\s*$/)){k.valign+="px"}j.bbox.d=-b.length2em(k.valign,l,this.img.img.height/b.em);g.style.verticalAlign=b.Em(-j.bbox.d);j.bbox.h-=j.bbox.d}}}if(!i.bbox){i.bbox={w:j.bbox.w,h:j.bbox.h,d:j.bbox.d,rw:j.bbox.rw,lw:j.bbox.lw}}else{if(j.bbox){i.bbox.w+=j.bbox.w;if(i.bbox.w>i.bbox.rw){i.bbox.rw=i.bbox.w}if(j.bbox.h>i.bbox.h){i.bbox.h=j.bbox.h}if(j.bbox.d>i.bbox.d){i.bbox.d=j.bbox.d}}}this.HTMLhandleSpace(j);this.HTMLhandleColor(j);return j},HTMLimgLoaded:function(e,d){if(typeof(e)==="string"){d=e}this.img.status=(d||"OK")},HTMLimgError:function(){this.img.img.onload("error")}},{GLYPH:{}});MathJax.Hub.Startup.signal.Post("HTML-CSS mglyph Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/mglyph.js")});

