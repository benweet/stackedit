/*
 *  /MathJax/jax/output/SVG/config.js
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

MathJax.OutputJax.SVG=MathJax.OutputJax({id:"SVG",version:"2.1",directory:MathJax.OutputJax.directory+"/SVG",extensionDir:MathJax.OutputJax.extensionDir+"/SVG",autoloadDir:MathJax.OutputJax.directory+"/SVG/autoload",fontDir:MathJax.OutputJax.directory+"/SVG/fonts",config:{scale:100,minScaleAdjust:50,font:"TeX",blacker:10,mtextFontInherit:false,undefinedFamily:"STIXGeneral,'Arial Unicode MS',serif",addMMLclasses:false,EqnChunk:(MathJax.Hub.Browser.isMobile?10:50),EqnChunkFactor:1.5,EqnChunkDelay:100,linebreaks:{automatic:false,width:"container"},styles:{".MathJax_SVG_Display":{"text-align":"center",margin:"1em 0em"},"#MathJax_SVG_Tooltip":{"background-color":"InfoBackground",color:"InfoText",border:"1px solid black","box-shadow":"2px 2px 5px #AAAAAA","-webkit-box-shadow":"2px 2px 5px #AAAAAA","-moz-box-shadow":"2px 2px 5px #AAAAAA","-khtml-box-shadow":"2px 2px 5px #AAAAAA",padding:"3px 4px"}}}});if(!MathJax.Hub.config.delayJaxRegistration){MathJax.OutputJax.SVG.Register("jax/mml")}MathJax.OutputJax.SVG.loadComplete("config.js");

