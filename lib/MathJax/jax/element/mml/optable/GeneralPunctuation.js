/*
 *  /MathJax/jax/element/mml/optable/GeneralPunctuation.js
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

(function(a){var c=a.mo.OPTYPES;var b=a.TEXCLASS;MathJax.Hub.Insert(a.mo.prototype,{OPTABLE:{prefix:{"\u2016":[0,0,b.ORD,{fence:true,stretchy:true}],"\u2018":[0,0,b.OPEN,{fence:true}],"\u201C":[0,0,b.OPEN,{fence:true}]},postfix:{"\u2016":[0,0,b.ORD,{fence:true,stretchy:true}],"\u2019":[0,0,b.CLOSE,{fence:true}],"\u201D":[0,0,b.CLOSE,{fence:true}]}}});MathJax.Ajax.loadComplete(a.optableDir+"/GeneralPunctuation.js")})(MathJax.ElementJax.mml);

