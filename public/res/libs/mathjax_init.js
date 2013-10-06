define([
    "settings",
    "text!libs/mathjax_config.js"
], function(settings, mathjaxConfigJS) {
    var script = document.createElement('script');
    script.type = 'text/x-mathjax-config';
    script.innerHTML = _.template(mathjaxConfigJS, {
        tex: settings.extensionSettings.mathJax ? settings.extensionSettings.mathJax.tex : 'undefined',
        tex2jax: settings.extensionSettings.mathJax ? settings.extensionSettings.mathJax.tex2jax : undefined
    });
    document.getElementsByTagName('head')[0].appendChild(script);
});