/*
 *  /MathJax/config/Safe.js
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

MathJax.Hub.Register.StartupHook("End Config",function(){if(!MathJax.Hub.config.extensions){MathJax.Hub.config.extensions=[]}MathJax.Hub.config.extensions.push("Safe.js")});MathJax.Ajax.loadComplete("[MathJax]/config/Safe.js");

