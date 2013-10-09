/*
 *  /MathJax/extensions/TeX/autoload-all.js
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

MathJax.Extension["TeX/autoload-all"]={version:"2.2"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var h={action:["mathtip","texttip","toggle"],AMSmath:["mathring","nobreakspace","negmedspace","negthickspace","intI","iiiint","idotsint","dddot","ddddot","sideset","boxed","substack","injlim","projlim","varliminf","varlimsup","varinjlim","varprojlim","DeclareMathOperator","operatorname","genfrac","tfrac","dfrac","binom","tbinom","dbinom","cfrac","shoveleft","shoveright","xrightarrow","xleftarrow"],begingroup:["begingroup","endgroup","gdef","global"],cancel:["cancel","bcancel","xcancel","cancelto"],color:["color","textcolor","colorbox","fcolorbox","DefineColor"],enclose:["enclose"],extpfeil:["Newextarrow","xlongequal","xmapsto","xtofrom","xtwoheadleftarrow","xtwoheadrightarrow"],mhchem:["ce","cee","cf"]};var c={AMSmath:["subarray","smallmatrix","equation","equation*"],AMScd:["CD"]};var d,g,b,a={macros:{},environment:{}};for(d in h){if(h.hasOwnProperty(d)){if(!MathJax.Extension["TeX/"+d]){var f=h[d];for(g=0,b=f.length;g<b;g++){a.macros[f[g]]=["Extension",d]}}}}for(d in c){if(c.hasOwnProperty(d)){if(!MathJax.Extension["TeX/"+d]){var e=c[d];for(g=0,b=e.length;g<b;g++){a.environment[e[g]]=["ExtensionEnv",null,d]}}}}MathJax.InputJax.TeX.Definitions.Add(a);MathJax.Hub.Startup.signal.Post("TeX autoload-all Ready")});MathJax.Callback.Queue(["Require",MathJax.Ajax,"[MathJax]/extensions/TeX/AMSsymbols.js"],["loadComplete",MathJax.Ajax,"[MathJax]/extensions/TeX/autoload-all.js"]);

