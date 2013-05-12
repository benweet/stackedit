/*
 *  /MathJax/extensions/TeX/extpfeil.js
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

MathJax.Extension["TeX/extpfeil"]={version:"2.1"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.InputJax.TeX,a=b.Definitions;a.Add({macros:{xtwoheadrightarrow:["Extension","AMSmath"],xtwoheadleftarrow:["Extension","AMSmath"],xmapsto:["Extension","AMSmath"],xlongequal:["Extension","AMSmath"],xtofrom:["Extension","AMSmath"],Newextarrow:["Extension","AMSmath"]}},null,true);MathJax.Hub.Register.StartupHook("TeX AMSmath Ready",function(){MathJax.Hub.Insert(a,{macros:{xtwoheadrightarrow:["xArrow",8608,12,16],xtwoheadleftarrow:["xArrow",8606,17,13],xmapsto:["xArrow",8614,6,7],xlongequal:["xArrow",61,7,7],xtofrom:["xArrow",8644,12,12],Newextarrow:"NewExtArrow"}})});b.Parse.Augment({NewExtArrow:function(c){var e=this.GetArgument(c),f=this.GetArgument(c),d=this.GetArgument(c);if(!e.match(/^\\([a-z]+|.)$/i)){b.Error("First argument to "+c+" must be a control sequence name")}if(!f.match(/^(\d+),(\d+)$/)){b.Error("Second argument to "+c+" must be two integers separated by a comma")}if(!d.match(/^(\d+|0x[0-9A-F]+)$/i)){b.Error("Third argument to "+c+" must be a unicode character number")}e=e.substr(1);f=f.split(",");d=parseInt(d);a.macros[e]=["xArrow",d,parseInt(f[0]),parseInt(f[1])]}});MathJax.Hub.Startup.signal.Post("TeX extpfeil Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/extpfeil.js");

