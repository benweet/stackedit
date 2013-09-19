define([
    "classes/Extension",
    "text!html/yamlFrontMatterParserSettingsBlock.html",
    "js-yaml",
], function(Extension, yamlFrontMatterParserSettingsBlock) {

    var yamlFrontMatterParser = new Extension("yamlFrontMatterParser", "YAML front matter", true);
    yamlFrontMatterParser.settingsBlock = yamlFrontMatterParserSettingsBlock;

    var eventMgr = undefined;
    yamlFrontMatterParser.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    yamlFrontMatterParser.onPagedownConfigure = function(editor) {
        var converter = editor.getConverter();
        converter.hooks.chain("preConversion", function(text) {
            try {
                var re = /^(\s*-{3}\s*\n([\w\W]+?)\n\s*-{3}\s*\n)?([\w\W]*)*/, results = re.exec(text), conf = {}, yaml;

                if((yaml = results[2])) {
                    conf = jsyaml.load(yaml);
                    console.log(conf);
                }
                eventMgr.onMarkdownTrim(results[1].length);
                return results[3];
            }
            catch(e) {
                return text;
            }
        });
    };

    return yamlFrontMatterParser;
});