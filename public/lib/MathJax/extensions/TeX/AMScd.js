/*
 *  /MathJax/extensions/TeX/AMScd.js
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

MathJax.Extension["TeX/AMScd"]={version:"2.2",config:MathJax.Hub.CombineConfig("TeX.CD",{colspace:"5pt",rowspace:"5pt",harrowsize:"2.25em",varrowsize:"1.75em",hideHorizontalLabels:false})};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var b=MathJax.ElementJax.mml,e=MathJax.InputJax.TeX,d=e.Stack.Item,c=e.Definitions,a=MathJax.Extension["TeX/AMScd"].config;c.environment.CD="CD_env";c.special["@"]="CD_arrow";c.macros.minCDarrowwidth="CD_minwidth";c.macros.minCDarrowheight="CD_minheight";e.Parse.Augment({CD_env:function(f){this.Push(f);return d.array().With({arraydef:{columnalign:"center",columnspacing:a.colspace,rowspacing:a.rowspace,displaystyle:true},minw:this.stack.env.CD_minw||a.harrowsize,minh:this.stack.env.CD_minh||a.varrowsize})},CD_arrow:function(g){var l=this.string[this.i];if(!l.match(/[><VA.|=]/)){return this.Other(g)}else{this.i++}var o=this.stack.Top();if(!o.isa(d.array)||o.data.length){this.CD_cell(g)}var q=((o.table.length%2)===1);var i=(o.row.length+(q?0:1))%2;while(i){this.CD_cell(g);i--}var h;var f={minsize:o.minw,stretchy:true},k={minsize:o.minh,stretchy:true,symmetric:true};if(l==="."){}else{if(l==="|"){h=this.mmlToken(b.mo("\u2225").With(k))}else{if(l==="="){h=this.mmlToken(b.mo("=").With(f))}else{var r={">":"\u2192","<":"\u2190",V:"\u2193",A:"\u2191"}[l];var p=this.GetUpTo(g+l,l),m=this.GetUpTo(g+l,l);if(l===">"||l==="<"){h=b.mo(r).With(f);if(!p){p="\\kern "+o.minw}if(p||m){var j={width:"+11mu",lspace:"6mu"};h=b.munderover(this.mmlToken(h));if(p){p=e.Parse(p,this.stack.env).mml();h.SetData(h.over,b.mpadded(p).With(j).With({voffset:".1em"}))}if(m){m=e.Parse(m,this.stack.env).mml();h.SetData(h.under,b.mpadded(m).With(j))}if(a.hideHorizontalLabels){h=b.mpadded(h).With({depth:0,height:".67em"})}}}else{h=r=this.mmlToken(b.mo(r).With(k));if(p||m){h=b.mrow();if(p){h.Append(e.Parse("\\scriptstyle\\llap{"+p+"}",this.stack.env).mml())}h.Append(r.With({texClass:b.TEXCLASS.ORD}));if(m){h.Append(e.Parse("\\scriptstyle\\rlap{"+m+"}",this.stack.env).mml())}}}}}}if(h){this.Push(h)}this.CD_cell(g)},CD_cell:function(f){this.Push(d.cell().With({isEntry:true,name:f}))},CD_minwidth:function(f){this.stack.env.CD_minw=this.GetDimen(f)},CD_minheight:function(f){this.stack.env.CD_minh=this.GetDimen(f)}})});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/AMScd.js");

