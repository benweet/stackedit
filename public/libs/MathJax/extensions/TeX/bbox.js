/*
 *  /MathJax/extensions/TeX/bbox.js
 *
 *  Copyright (c) 2009-2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/bbox"]={version:"2.3"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.InputJax.TeX,a=MathJax.ElementJax.mml;b.Definitions.Add({macros:{bbox:"BBox"}},null,true);b.Parse.Augment({BBox:function(e){var n=this.GetBrackets(e,""),m=this.ParseArg(e);var j=n.split(/,/),g,d,c;for(var k in j){var f=j[k].replace(/^\s+/,"").replace(/\s+$/,"");var l=f.match(/^(\.\d+|\d+(\.\d*)?)(pt|em|ex|mu|px|in|cm|mm)$/);if(l){if(g){b.Error(["MultipleBBoxProperty","%1 specified twice in %2","Padding",e])}var h=l[1]+l[3];g={height:"+"+h,depth:"+"+h,lspace:h,width:"+"+(2*l[1])+l[3]}}else{if(f.match(/^([a-z0-9]+|\#[0-9a-f]{6}|\#[0-9a-f]{3})$/i)){if(d){b.Error(["MultipleBBoxProperty","%1 specified twice in %2","Background",e])}d=f}else{if(f.match(/^[-a-z]+:/i)){if(c){b.Error(["MultipleBBoxProperty","%1 specified twice in %2","Style",e])}c=this.BBoxStyle(f)}else{if(f!==""){b.Error(["InvalidBBoxProperty","'%1' doesn't look like a color, a padding dimension, or a style",f])}}}}}if(g){m=a.mpadded(m).With(g)}if(d||c){m=a.mstyle(m).With({mathbackground:d,style:c})}this.Push(m)},BBoxStyle:function(c){return c}});MathJax.Hub.Startup.signal.Post("TeX bbox Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/bbox.js");
