/*
 *  /MathJax/extensions/TeX/HTML.js
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

MathJax.Extension["TeX/HTML"]={version:"2.1"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.InputJax.TeX;var a=b.Definitions;a.Add({macros:{href:"HREF_attribute","class":"CLASS_attribute",style:"STYLE_attribute",cssId:"ID_attribute"}},null,true);b.Parse.Augment({HREF_attribute:function(e){var d=this.GetArgument(e),c=this.GetArgumentMML(e);this.Push(c.With({href:d}))},CLASS_attribute:function(d){var e=this.GetArgument(d),c=this.GetArgumentMML(d);if(c["class"]!=null){e=c["class"]+" "+e}this.Push(c.With({"class":e}))},STYLE_attribute:function(d){var e=this.GetArgument(d),c=this.GetArgumentMML(d);if(c.style!=null){if(e.charAt(e.length-1)!==";"){e+=";"}e=c.style+" "+e}this.Push(c.With({style:e}))},ID_attribute:function(e){var d=this.GetArgument(e),c=this.GetArgumentMML(e);this.Push(c.With({id:d}))},GetArgumentMML:function(d){var c=this.ParseArg(d);if(c.inferred&&c.data.length==1){c=c.data[0]}else{delete c.inferred}return c}});MathJax.Hub.Startup.signal.Post("TeX HTML Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/HTML.js");

