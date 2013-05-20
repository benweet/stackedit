/*
 *  /MathJax/extensions/TeX/action.js
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

MathJax.Extension["TeX/action"]={version:"2.2"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.InputJax.TeX,a=MathJax.ElementJax.mml;b.Definitions.Add({macros:{toggle:"Toggle",mathtip:"Mathtip",texttip:["Macro","\\mathtip{#1}{\\text{#2}}",2]}},null,true);b.Parse.Augment({Toggle:function(d){var e=[],c;while((c=this.GetArgument(d))!=="\\endtoggle"){e.push(b.Parse(c,this.stack.env).mml())}this.Push(a.maction.apply(a,e).With({actiontype:a.ACTIONTYPE.TOGGLE}))},Mathtip:function(d){var c=this.ParseArg(d),e=this.ParseArg(d);this.Push(a.maction(c,e).With({actiontype:a.ACTIONTYPE.TOOLTIP}))}});MathJax.Hub.Startup.signal.Post("TeX action Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/action.js");

