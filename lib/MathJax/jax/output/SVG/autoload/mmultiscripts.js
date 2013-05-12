/*
 *  /MathJax/jax/output/SVG/autoload/mmultiscripts.js
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

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var b="2.1";var a=MathJax.ElementJax.mml,c=MathJax.OutputJax.SVG;a.mmultiscripts.Augment({toSVG:function(G,z){this.SVGgetStyles();var B=this.SVG();this.SVGhandleSpace(B);var M=this.SVGgetScale();var j=(this.data[this.base]?this.SVGdataStretched(this.base,G,z):c.BBOX.G().Clean());var K=c.TeX.x_height*M,y=c.TeX.scriptspace*M*0.75;var x=this.SVGgetScripts(y);var k=x[0],e=x[1],n=x[2],i=x[3];var g=(this.data[1]||this).SVGgetScale();var C=c.TeX.sup_drop*g,A=c.TeX.sub_drop*g;var o=j.h-C,m=j.d+A,L=0,F;if(j.ic){L=j.ic}if(this.data[this.base]&&(this.data[this.base].type==="mi"||this.data[this.base].type==="mo")){if(this.data[this.base].data.join("").length===1&&j.scale===1&&!j.stretched&&!this.data[this.base].Get("largeop")){o=m=0}}var H=this.getValues("subscriptshift","superscriptshift"),E=this.SVGgetMu(B);H.subscriptshift=(H.subscriptshift===""?0:c.length2em(H.subscriptshift,E));H.superscriptshift=(H.superscriptshift===""?0:c.length2em(H.superscriptshift,E));var l=0;if(n){l=n.w+L}else{if(i){l=i.w-L}}B.Add(j,Math.max(0,l),0);if(!e&&!i){m=Math.max(m,c.TeX.sub1*M,H.subscriptshift);if(k){m=Math.max(m,k.h-(4/5)*K)}if(n){m=Math.max(m,n.h-(4/5)*K)}if(k){B.Add(k,l+j.w+y-L,-m)}if(n){B.Add(n,0,-m)}}else{if(!k&&!n){var f=this.getValues("displaystyle","texprimestyle");F=c.TeX[(f.displaystyle?"sup1":(f.texprimestyle?"sup3":"sup2"))];o=Math.max(o,F*M,H.superscriptshift);if(e){o=Math.max(o,e.d+(1/4)*K)}if(i){o=Math.max(o,i.d+(1/4)*K)}if(e){B.Add(e,l+j.w+y,o)}if(i){B.Add(i,0,o)}}else{m=Math.max(m,c.TeX.sub2*M);var w=c.TeX.rule_thickness*M;var I=(k||n).h,J=(e||i).d;if(n){I=Math.max(I,n.h)}if(i){J=Math.max(J,i.d)}if((o-J)-(I-m)<3*w){m=3*w-o+J+I;C=(4/5)*K-(o-J);if(C>0){o+=C;m-=C}}o=Math.max(o,H.superscriptshift);m=Math.max(m,H.subscriptshift);if(e){B.Add(e,l+j.w+y,o)}if(i){B.Add(i,l+L-i.w,o)}if(k){B.Add(k,l+j.w+y-L,-m)}if(n){B.Add(n,l-n.w,-m)}}}B.Clean();this.SVGhandleColor(B);this.SVGsaveData(B);return B},SVGgetScripts:function(p){var o,d,e=[];var n=1,g=this.data.length,f=0;for(var h=0;h<4;h+=2){while(n<g&&this.data[n].type!=="mprescripts"){for(var l=h;l<h+2;l++){if(this.data[n]&&this.data[n].type!=="none"){if(!e[l]){e[l]=c.BBOX.G()}e[l].Add(this.data[n].toSVG().With({x:f}))}n++}d=e[h]||{w:0};o=e[h+1]||{w:0};d.w=o.w=f=Math.max(d.w,o.w)}n++;f=0}for(l=0;l<4;l++){if(e[l]){e[l].w+=p;e[l].Clean()}}return e}});MathJax.Hub.Startup.signal.Post("SVG mmultiscripts Ready");MathJax.Ajax.loadComplete(c.autoloadDir+"/mmultiscripts.js")});

