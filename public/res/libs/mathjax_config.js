MathJax.Hub.Config({
	skipStartupTypeset: true,
    "HTML-CSS": {
        preferredFont: "TeX",
        availableFonts: [
            "STIX",
            "TeX"
        ],
        linebreaks: {
            automatic: true
        },
        EqnChunk: 10,
        imageFont: null
    },
    tex2jax: <%= tex2jax || '{ inlineMath: [["$","$"],["\\\\\\\\(","\\\\\\\\)"]], displayMath: [["$$","$$"],["\\\\[","\\\\]"]], processEscapes: true }' %>,
    TeX: $.extend({
        noUndefined: {
            attributes: {
                mathcolor: "red",
                mathbackground: "#FFEEEE",
                mathsize: "90%"
            }
        },
        Safe: {
            allow: {
                URLs: "safe",
                classes: "safe",
                cssIDs: "safe",
                styles: "safe",
                fontsize: "all"
            }
        }
    }, <%= tex %>),
    messageStyle: "none"
});
