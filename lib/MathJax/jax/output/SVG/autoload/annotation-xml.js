/*
 *  /MathJax/jax/output/SVG/autoload/annotation-xml.js
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

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var c="2.1";var a=MathJax.ElementJax.mml,d=MathJax.OutputJax.SVG;var b=d.BBOX;b.FOREIGN=b.Subclass({type:"foreignObject",removeable:false});a["annotation-xml"].Augment({toSVG:function(){var f=this.SVG();this.SVGhandleSpace(f);var h=this.Get("encoding");for(var g=0,e=this.data.length;g<e;g++){f.Add(this.data[g].toSVG(h),f.w,0)}f.Clean();this.SVGhandleColor(f);this.SVGsaveData(f);return f}});a.xml.Augment({toSVG:function(e){var p=d.textSVG.parentNode;d.mathDiv.style.width="auto";p.insertBefore(this.div,d.textSVG);var q=this.div.offsetWidth,k=this.div.offsetHeight;var o=MathJax.HTML.addElement(this.div,"span",{style:{display:"inline-block",overflow:"hidden",height:k+"px",width:"1px",marginRight:"-1px"}});var n=this.div.offsetHeight-k;k-=n;this.div.removeChild(o);p.removeChild(this.div);d.mathDiv.style.width="";var g=1000/d.em;var l=b.FOREIGN({y:(-k)+"px",width:q+"px",height:(k+n)+"px",transform:"scale("+g+") matrix(1 0 0 -1 0 0)"});for(var j=0,f=this.data.length;j<f;j++){l.element.appendChild(this.data[j].cloneNode(true))}l.w=q*g;l.h=k*g;l.d=n*g;l.r=l.w;l.l=0;l.Clean();this.SVGsaveData(l);return l}});MathJax.Hub.Startup.signal.Post("SVG annotation-xml Ready");MathJax.Ajax.loadComplete(d.autoloadDir+"/annotation-xml.js")});

