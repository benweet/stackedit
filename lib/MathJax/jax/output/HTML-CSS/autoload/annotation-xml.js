/*
 *  /MathJax/jax/output/HTML-CSS/autoload/annotation-xml.js
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var c="2.1";var a=MathJax.ElementJax.mml,b=MathJax.OutputJax["HTML-CSS"];a["annotation-xml"].Augment({toHTML:function(f){f=this.HTMLhandleSize(this.HTMLcreateSpan(f));var g=this.Get("encoding");for(var e=0,d=this.data.length;e<d;e++){this.data[e].toHTML(f,g)}this.HTMLhandleSpace(f);this.HTMLhandleColor(f);return f},HTMLgetScale:function(){return this.SUPER(arguments).HTMLgetScale.call(this)/b.scale}});a.xml.Augment({toHTML:function(f,g){for(var e=0,d=this.data.length;e<d;e++){f.appendChild(this.data[e].cloneNode(true))}f.bbox.w=b.getW(f);f.bbox.rw=f.bbox.w;var h=b.getHD(f);f.bbox.h=h.h;f.bbox.d=h.d}});MathJax.Hub.Startup.signal.Post("HTML-CSS annotation-xml Ready");MathJax.Ajax.loadComplete(b.autoloadDir+"/annotation-xml.js")});

