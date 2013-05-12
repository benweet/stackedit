/*
 *  /MathJax/extensions/TeX/mathchoice.js
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

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var c="2.1";var a=MathJax.ElementJax.mml;var d=MathJax.InputJax.TeX;var b=d.Definitions;b.Add({macros:{mathchoice:"MathChoice"}},null,true);d.Parse.Augment({MathChoice:function(f){var i=this.ParseArg(f),e=this.ParseArg(f),g=this.ParseArg(f),h=this.ParseArg(f);this.Push(a.TeXmathchoice(i,e,g,h))}});a.TeXmathchoice=a.mbase.Subclass({type:"TeXmathchoice",choice:function(){var e=this.getValues("displaystyle","scriptlevel");if(e.scriptlevel>0){return Math.min(3,e.scriptlevel+1)}return(e.displaystyle?0:1)},setTeXclass:function(e){return this.Core().setTeXclass(e)},isSpacelike:function(){return this.Core().isSpacelike()},isEmbellished:function(){return this.Core().isEmbellished()},Core:function(){return this.data[this.choice()]},toHTML:function(e){e=this.HTMLcreateSpan(e);e.bbox=this.Core().toHTML(e).bbox;if(e.firstChild&&e.firstChild.style.marginLeft){e.style.marginLeft=e.firstChild.style.marginLeft;e.firstChild.style.marginLeft=""}return e},toSVG:function(){return this.Core().toSVG()}});MathJax.Hub.Startup.signal.Post("TeX mathchoice Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mathchoice.js");

