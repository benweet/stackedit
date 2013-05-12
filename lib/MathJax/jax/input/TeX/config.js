/*
 *  /MathJax/jax/input/TeX/config.js
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

MathJax.InputJax.TeX=MathJax.InputJax({id:"TeX",version:"2.1",directory:MathJax.InputJax.directory+"/TeX",extensionDir:MathJax.InputJax.extensionDir+"/TeX",config:{TagSide:"right",TagIndent:"0.8em",MultLineWidth:"85%",equationNumbers:{autoNumber:"none",formatNumber:function(a){return a},formatTag:function(a){return"("+a+")"},formatID:function(a){return"mjx-eqn-"+String(a).replace(/[:"'<>&]/g,"")},formatURL:function(a){return"#"+escape(a)},useLabelIds:true}}});MathJax.InputJax.TeX.Register("math/tex");MathJax.InputJax.TeX.loadComplete("config.js");

