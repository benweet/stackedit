define(function() {

    var emailConverter = {
        extensionId: "emailConverter",
        extensionName: "Email Converter",
        optional: true,
        settingsBloc: '<p>Converts email adresses in the form &lt;email@example.com&gt; into clickable links.</p>'
    };

    emailConverter.onEditorConfigure = function(editor) {
        editor.getConverter().hooks.chain("postConversion", function(text) {
            return text.replace(/<(mailto\:)?([^\s>]+@[^\s>]+\.\S+?)>/g, function(match, mailto, email) {
                return '<a href="mailto:' + email + '">' + email + '</a>';
            });
        });
    };

    return emailConverter;
});
