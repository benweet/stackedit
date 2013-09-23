define([
    "utils",
    "classes/Extension",
    "text!html/mathJaxSettingsBlock.html",
    "text!libs/mathjax_config.js",
    "mathjax",
], function(utils, Extension, mathJaxSettingsBlockHTML, mathjaxConfigJS) {
	
	var mathJax = new Extension("mathJax", "MathJax", true);
	mathJax.settingsBlock = mathJaxSettingsBlockHTML;
    mathJax.defaultConfig = {
        tex: "{}",
        tex2jax: '{ inlineMath: [["$","$"],["\\\\\\\\(","\\\\\\\\)"]], displayMath: [["$$","$$"],["\\\\[","\\\\]"]], processEscapes: true }'
    };

    mathJax.onLoadSettings = function() {
        utils.setInputValue("#input-mathjax-config-tex", mathJax.config.tex);
        utils.setInputValue("#input-mathjax-config-tex2jax", mathJax.config.tex2jax);
    };

    mathJax.onSaveSettings = function(newConfig, event) {
        newConfig.tex = utils.getInputJsValue("#input-mathjax-config-tex", event);
        newConfig.tex2jax = utils.getInputJsValue("#input-mathjax-config-tex2jax", event);
    };
    
    mathJax.onPagedownConfigure = function(editorObject) {
        t = document.getElementById("preview-contents");

        var converter = editorObject.getConverter();
        converter.hooks.chain("preConversion", p);
        converter.hooks.chain("postConversion", d);
    };
    
    var afterRefreshCallback = undefined;
    mathJax.onAsyncPreview = function(callback) {
        afterRefreshCallback = callback;
        j();
    };
    
    // From math.stackexchange.com...

    function b(a, f, b) {
        var c = k.slice(a, f + 1).join("").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        for (h.Browser.isMSIE && (c = c.replace(/(%[^\n]*)\n/g, "$1<br/>\n")); f > a; )
            k[f] = "", f--;
        k[a] = "@@" + m.length + "@@";
        b && (c = b(c));
        m.push(c);
        i = o = l = null
    }
    function p(a) {
        i = o = l = null;
        m = [];
        var f;
        /`/.test(a) ? (a = a.replace(/~/g, "~T").replace(/(^|[^\\])(`+)([^\n]*?[^`\n])\2(?!`)/gm, function(a) {
            return a.replace(/\$/g, "~D")
        }), f = function(a) {
            return a.replace(/~([TD])/g, 
            function(a, c) {
                return {T: "~",D: "$"}[c]
            })
        }) : f = function(a) {
            return a
        };
        k = r(a.replace(/\r\n?/g, "\n"), u);
        for (var a = 1, d = k.length; a < d; a += 2) {
            var c = k[a];
            "@" === c.charAt(0) ? (k[a] = "@@" + m.length + "@@", m.push(c)) : i ? c === o ? n ? l = a : b(i, a, f) : c.match(/\n.*\n/) ? (l && (a = l, b(i, a, f)), i = o = l = null, n = 0) : "{" === c ? n++ : "}" === c && n && n-- : c === s || "$$" === c ? (i = a, o = c, n = 0) : "begin" === c.substr(1, 5) && (i = a, o = "\\end" + c.substr(6), n = 0)
        }
        l && b(i, l, f);
        return f(k.join(""))
    }
    function d(a) {
        a = a.replace(/@@(\d+)@@/g, function(a, b) {
            return m[b]
        });
        m = null;
        return a
    }
    function e() {
        q = !1;
        h.cancelTypeset = !1;
        h.Queue(["Typeset", h, t])
        h.Queue(afterRefreshCallback);
    }
    function j() {
        !q && /*benweet (we need to call our afterRefreshCallback) g &&*/ (q = !0, h.Cancel(), h.Queue(e))
    }
    var g = !1, q = !1, t = null, s = "$", k, i, o, l, n, m, h = MathJax.Hub;
    h.Queue(function() {
        g = !0;
        h.processUpdateTime = 50;
        h.Config({"HTML-CSS": {EqnChunk: 10,EqnChunkFactor: 1},SVG: {EqnChunk: 10,EqnChunkFactor: 1}})
    });
    var u = /(\$\$?|\\(?:begin|end)\{[a-z]*\*?\}|\\[\\{}$]|[{}]|(?:\n\s*)+|@@\d+@@)/i, r;
    r = 3 === "aba".split(/(b)/).length ? function(a, f) {
        return a.split(f)
    } : function(a, f) {
        var b = [], c;
        if (!f.global) {
            c = f.toString();
            var d = "";
            c = c.replace(/^\/(.*)\/([im]*)$/, function(a, c, b) {
                d = b;
                return c
            });
            f = RegExp(c, d + "g")
        }
        for (var e = f.lastIndex = 0; c = f.exec(a); )
            b.push(a.substring(e, c.index)), b.push.apply(b, c.slice(1)), e = c.index + c[0].length;
        b.push(a.substring(e));
        return b
    };
    
    (function() {
        var b = MathJax.Hub;
        if (!b.Cancel) {
            b.cancelTypeset = !1;
            b.Register.StartupHook("HTML-CSS Jax Config", function() {
                var d = MathJax.OutputJax["HTML-CSS"], e = d.Translate;
                d.Augment({Translate: function(j, g) {
                        if (b.cancelTypeset || g.cancelled)
                            throw Error("MathJax Canceled");
                        return e.call(d, j, g)
                    }})
            });
            b.Register.StartupHook("SVG Jax Config", function() {
                var d = MathJax.OutputJax.SVG, e = d.Translate;
                d.Augment({Translate: function(j, g) {
                        if (b.cancelTypeset || g.cancelled)
                            throw Error("MathJax Canceled");
                        return e.call(d, 
                        j, g)
                    }})
            });
            b.Register.StartupHook("TeX Jax Config", function() {
                var d = MathJax.InputJax.TeX, e = d.Translate;
                d.Augment({Translate: function(j, g) {
                        if (b.cancelTypeset || g.cancelled)
                            throw Error("MathJax Canceled");
                        return e.call(d, j, g)
                    }})
            });
            var p = b.processError;
            b.processError = function(d, e, j) {
                if ("MathJax Canceled" !== d.message)
                    return p.call(b, d, e, j);
                MathJax.Message.Clear(0, 0);
                e.jaxIDs = [];
                e.jax = {};
                e.scripts = [];
                e.i = e.j = 0;
                e.cancelled = !0;
                return null
            };
            b.Cancel = function() {
                this.cancelTypeset = !0
            }
        }
    })();


	return mathJax;
});