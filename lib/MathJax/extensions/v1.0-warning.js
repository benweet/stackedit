/*
 *  /MathJax/extensions/v1.0-warning.js
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

(function(b,e){var d="2.1";var a={style:{position:"fixed",bottom:"4em",left:"3em",width:"40em",border:"3px solid #880000","background-color":"#E0E0E0",color:"black",padding:"1em","font-size":"small","white-space":"normal","border-radius":".75em","-webkit-border-radius":".75em","-moz-border-radius":".75em","-khtml-border-radius":".75em","box-shadow":"4px 4px 10px #AAAAAA","-webkit-box-shadow":"4px 4px 10px #AAAAAA","-moz-box-shadow":"4px 4px 10px #AAAAAA","-khtml-box-shadow":"4px 4px 10px #AAAAAA",filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=3, OffY=3, Color='gray', Positive='true')"}};if(b.Browser.isIE9&&document.documentMode>=9){delete a.style.filter}var c;b.Register.StartupHook("onLoad",function(){var f=document.body;if(b.Browser.isMSIE){MathJax.Message.Init();f=document.getElementById("MathJax_MSIE_frame")||f;a.style.position="absolute"}else{delete a.style.filter}a.style.maxWidth=(document.body.clientWidth-75)+"px";c=e.addElement(f,"div",{id:"MathJax_ConfigWarning",style:a.style},[["div",{style:{position:"absolute",overflow:"hidden",top:".1em",right:".1em",border:"1px outset",width:"1em",height:"1em","text-align":"center",cursor:"pointer","background-color":"#EEEEEE",color:"#606060","border-radius":".5em","-webkit-border-radius":".5em","-moz-border-radius":".5em","-khtml-border-radius":".5em"},onclick:function(){c.style.display="none"}},[["span",{style:{position:"relative",bottom:".2em"}},["x"]]]],"MathJax no longer loads a default configuration file; you must specify such files explicitly. This page seems to use the older default ",["code",{},["config/MathJax.js"]]," file, and so needs to be updated.  This is explained further at",["p",{style:{"text-align":"center"}},[["a",{href:"http://www.mathjax.org/help/configuration"},["http://www.mathjax.org/help/configuration"]]]]])})})(MathJax.Hub,MathJax.HTML);MathJax.Ajax.loadComplete("[MathJax]/extensions/v1.0-warning.js");

