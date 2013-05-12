/*
 *  /MathJax/jax/output/SVG/autoload/mglyph.js
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

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var d="2.1";var a=MathJax.ElementJax.mml,e=MathJax.OutputJax.SVG,b=e.BBOX;var c="http://www.w3.org/1999/xlink";b.MGLYPH=b.Subclass({type:"image",removeable:false,Init:function(i,m,j,k,o,f){if(f==null){f={}}var g=i.width*1000/e.em,n=i.height*1000/e.em,l=0;if(m!==""){g=e.length2em(m,o,g)}if(j!==""){n=e.length2em(j,o,n)}if(k!==""&&k.match(/\d/)){l=e.length2em(k,o);f.y=-l}f.height=Math.floor(n);f.width=Math.floor(g);f.transform="translate(0,"+n+") matrix(1 0 0 -1 0 0)";f.preserveAspectRatio="none";this.SUPER(arguments).Init.call(this,f);this.element.setAttributeNS(c,"href",i.src);this.w=this.r=g;this.h=this.H=n+l;this.d=this.D=-l;this.l=0}});a.mglyph.Augment({toSVG:function(j,m){this.SVGgetStyles();var i=this.SVG(),h,k;this.SVGhandleSpace(i);var g=this.getValues("src","width","height","valign","alt");if(g.src===""){g=this.getValues("index","fontfamily");if(g.index){if(!m){m=this.SVGgetScale()}var l={};if(g.fontfamily){l["font-family"]=g.fontfamily}i.Add(b.TEXT(m,String.fromCharCode(g.index),l))}}else{if(!this.img){this.img=a.mglyph.GLYPH[g.src]}if(!this.img){this.img=a.mglyph.GLYPH[g.src]={img:new Image(),status:"pending"};h=this.img.img;h.onload=MathJax.Callback(["SVGimgLoaded",this]);h.onerror=MathJax.Callback(["SVGimgError",this]);h.src=g.src;MathJax.Hub.RestartAfter(h.onload)}if(this.img.status!=="OK"){k=a.merror("Bad mglyph: "+g.src).With({mathsize:"75%"});this.Append(k);i=k.toSVG();this.data.pop()}else{var f=this.SVGgetMu(i);i.Add(b.MGLYPH(this.img.img,g.width,g.height,g.valign,f,{src:g.src,alt:g.alt,title:g.alt}))}}i.Clean();this.SVGhandleColor(i);this.SVGsaveData(i);return i},SVGimgLoaded:function(g,f){if(typeof(g)==="string"){f=g}this.img.status=(f||"OK")},SVGimgError:function(){this.img.img.onload("error")}},{GLYPH:{}});MathJax.Hub.Startup.signal.Post("SVG mglyph Ready");MathJax.Ajax.loadComplete(e.autoloadDir+"/mglyph.js")});

