/*
 *  /MathJax/extensions/HTML-CSS/handle-floats.js
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

MathJax.Extension["HTML-CSS/handle-floats"]={version:"2.1"};MathJax.Hub.Config({"HTML-CSS":{styles:{".MathJax_Display":{display:"table-cell",padding:"1em 0 ! important",width:(MathJax.Hub.Browser.isMSIE&&(document.documentMode||0)<8?"100%":"1000em")}}}});MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var a=MathJax.OutputJax["HTML-CSS"],b=a.Translate;a.Augment({Translate:function(c,f){b.call(this,c,f);if(c.MathJax.elementJax.HTMLCSS.display){var e=c.nextSibling;if(!e||e.className!=="MathJax_MSIE_Separator"){var d=a.Element("span",{className:"MathJax_MSIE_Separator"});c.parentNode.insertBefore(d,e)}}}});MathJax.Hub.Startup.signal.Post("HTML-CSS handle-floats Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/HTML-CSS/handle-floats.js");

