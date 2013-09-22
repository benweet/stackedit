define([
    "underscore",
    "config",
    "storage"
], function(_) {

    var settings = {
        layoutOrientation: "horizontal",
        lazyRendering: true,
        editorFontFamily: 'Menlo, Consolas, "Courier New", Courier, monospace',
        editorFontSize: 12,
        maxWidth: 960,
        defaultContent: "\n\n\n> Written with [StackEdit](" + MAIN_URL + ").",
        commitMsg: "Published with " + MAIN_URL,
        template: [
                   '<!DOCTYPE html>\n',
                   '<html>\n',
                   '<head>\n',
                   '<meta charset="utf-8">\n',
                   '<title><%= documentTitle %></title>\n',
                   '<link rel="stylesheet" href="',
                   MAIN_URL,
                   'res-min/themes/default.css" />\n',
                   '<script type="text/javascript" src="',
                   MAIN_URL,
                   'lib/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>\n',
                   '</head>\n',
                   '<body><div class="container"><%= documentHTML %></div></body>\n',
                   '</html>'
                   ].join(""),
        pdfTemplate: [
            '<!DOCTYPE html>\n',
            '<html>\n',
            '<head>\n',
            '<meta charset="utf-8">\n',
            '<title><%= documentTitle %></title>\n',
            '<link rel="stylesheet" href="',
            MAIN_URL,
            'res-min/themes/default.css" />\n',
            '<style type="text/css">\n',
            "@font-face {font-family: MathJax_Main; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Main-Regular.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Main-Regular.otf') format('opentype')}\n",
            "@font-face {font-family: MathJax_Main; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Main-Bold.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Main-Bold.otf') format('opentype'); font-weight: bold}\n",
            "@font-face {font-family: MathJax_Main; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Main-Italic.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Main-Italic.otf') format('opentype'); font-style: italic}\n",
            "@font-face {font-family: MathJax_Math; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Math-Italic.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Math-Italic.otf') format('opentype'); font-style: italic}\n",
            "@font-face {font-family: MathJax_Caligraphic; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Caligraphic-Regular.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Caligraphic-Regular.otf') format('opentype')}\n",
            "@font-face {font-family: MathJax_Size1; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size1-Regular.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Size1-Regular.otf') format('opentype')}\n",
            "@font-face {font-family: MathJax_Size2; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size2-Regular.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Size2-Regular.otf') format('opentype')}\n",
            "@font-face {font-family: MathJax_Size3; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size3-Regular.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Size3-Regular.otf') format('opentype')}\n",
            "@font-face {font-family: MathJax_Size4; src: url('", MAIN_URL, "lib/MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size4-Regular.woff') format('woff'), url('http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Size4-Regular.otf') format('opentype')}\n",
            '</style>\n',
            '</head>\n',
            '<body class="pdf"><%= documentHTML %></body>\n',
            '</html>'
        ].join(""),
        sshProxy: SSH_PROXY_URL,
        extensionSettings: {}
    };

    try {
        _.extend(settings, JSON.parse(localStorage.settings));
    }
    catch(e) {
        // Ignore parsing error
    }

    return settings;
});