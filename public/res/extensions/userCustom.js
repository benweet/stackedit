define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "fileSystem",
    "settings",
    "text!html/userCustomSettingsBlock.html",
], function($, _, utils, Extension, fileSystem, settings, userCustomSettingsBlockHTML) {

    var userCustom = new Extension("userCustom", "UserCustom extension", true);
    userCustom.settingsBlock = userCustomSettingsBlockHTML;
    userCustom.defaultConfig = {
        code: "",
    };

    var fileMgr;
    userCustom.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var synchronizer;
    userCustom.onSynchronizerCreated = function(synchronizerParameter) {
        synchronizer = synchronizerParameter;
    };

    var publisher;
    userCustom.onPublisherCreated = function(publisherParameter) {
        publisher = publisherParameter;
    };

    var eventMgr;
    userCustom.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    userCustom.onLoadSettings = function() {
        utils.setInputValue("#textarea-usercustom-code", userCustom.config.code);
    };

    userCustom.onSaveSettings = function(newConfig, event) {
        newConfig.code = utils.getInputValue("#textarea-usercustom-code");
        try {
            /*jshint evil: true */
            eval(newConfig.code);
        }
        catch(e) {
            eventMgr.onError(e);
            // Mark the textarea as error
            utils.getInputTextValue("#textarea-usercustom-code", event, /^$/);
        }
    };

    userCustom.onInit = function() {
        try {
            /*jshint evil: true */
            eval(userCustom.config.code);
        }
        catch(e) {
            console.error(e);
        }
    };
        
    userCustom.onPagedownConfigure = function (editor) {
        var thmCounter  = { num: 0 };
        var excsCounter = { num: 0 };
        var environmentMap = {
            thm:   { title: "Theorem"    ,counter: thmCounter  },
            lem:   { title: "Lemma"      ,counter: thmCounter  },
            cor:   { title: "Corollary"  ,counter: thmCounter  },
            prop:  { title: "Property"   ,counter: thmCounter  },
            defn:  { title: "Definition" ,counter: thmCounter  },
            rem:   { title: "Remark"     ,counter: thmCounter  },
            prob:  { title: "Problem"    ,counter: excsCounter },
            excs:  { title: "Exercise"   ,counter: excsCounter },
            examp: { title: "Example"    ,counter: excsCounter },
            proof: { title: "Proof" }
        };
        var converter = editor.getConverter();
        // Save the preConversion callbacks stack
        var preConversion = converter.hooks.preConversion;
        converter.hooks.preConversion = function (text) {
            // Change \begin...\end to /begin.../end to avoid MathJax processing
            text = text.replace(/\\begin{(\w+)}([\s\S]*?)\\end{\1}/g, function (wholeMatch, m1, m2) {
                if(!environmentMap[m1]) return wholeMatch;
                // At this stage we need to keep the same number of characters for accurate section parsing
                return '/begin{' + m1 + '}' + m2 + '/end{' + m1 + '}';
            });
            // Transform \title and \section into markdown title to take benefit of partial rendering
            text = text.replace(/\\(\w+){([^\r\n}]+)}/g, function (wholeMatch, m1, m2) {
                // At this stage we need to keep the same number of characters for accurate section parsing
                if (m1 == 'section') {
                    // \section{} has to be replaced by 10 chars
                    return '\n###     ' + m2 + '\n';
                }
                if (m1 == 'subsection') {
                    // \subsection{} has to be replaced by 13 chars
                    return '\n####       ' + m2 + '\n';
                }
                if (m1 == 'subsubsection') {
                    // \subsubsection{} has to be replaced by 16 chars
                    return '\n#####         ' + m2 + '\n';
                }
                if (m1 == 'title') {
                    // \title{} has to be replaced by 8 chars
                    return '\n##    ' + m2 + '\n';
                }
                return wholeMatch;
            });
            // We are replacing the preConversion stack, call the other preConversion callbacks from the old stack
            return preConversion(text);
        };
        converter.hooks.chain("preBlockGamut", function (text, blockGamutHookCallback) {
            text = text.replace(/\\ref{(\w+):(\d+)}/g, function (wholeMatch, m1, m2) {
                if(!environmentMap[m1]) return wholeMatch;
                return '<a class="latex_ref" href="#' + m1 + ':' + m2 + '">' + environmentMap[m1].title + ' ' + m2 + '</a>';
            });
            text = text.replace(/\\(author|date){([\s\S]*?)}/g, '<div class="latex_$1">$2</div>');
            return text.replace(/\/begin{(\w+)}([\s\S]*?)\/end{\1}/g, function (wholeMatch, m1, m2) {
                if(!environmentMap[m1]) return wholeMatch;
                var result = '<div class="latex_' + m1 + '"><span class="latex_title"></span>' + blockGamutHookCallback(m2);
                if (m1 == "proof") {
                    result += '<span class="latex_proofend" style="float:right">$■$</span>';
                }
                return result + '</div>';
            });
        });
        var previewContentsElt = document.getElementById('preview-contents');
        editor.hooks.chain('onPreviewRefresh', function() {
            thmCounter.num = 0;
            excsCounter.num = 0;
            _.each(previewContentsElt.querySelectorAll('[class^="latex_"]'), function(elt) {
                var key = elt.className.match(/^latex_(\S+)/)[1];
                var environment = environmentMap[key];
                if(!environment) return;
                var title = environment.title;
                if(environment.counter) {
                    environment.counter.num++;
                    title += ' ' + environment.counter.num;
                    elt.id = key + ':' + environment.counter.num;
                }
                elt.querySelector('.latex_title').innerHTML = title + '.';
            });
        });
    };
    
    userCustom.onReady = function () {
        var style = [
            '.latex_thm, .latex_lem, .latex_cor, .latex_defn, .latex_prop, .latex_rem {',
            '    font-style:italic;',
            '    display: block;',
            '    margin:15px 0;',
            '}',
            '.latex_prob, .latex_examp, .latex_excs, .latex_proof {',
            '    font-style:normal;',
            '    margin: 10px 0;',
            '    display: block;',
            '}',
            '.latex_title {',
            '    float:left;',
            '    font-weight:bold;',
            '    padding-right: 10px;',
            '}',
            '.latex_proofend {',
            '    float:right;',
            '}',
        ].join('\n');
        $("head").append($('<style type="text/css">').html(style));
    };
    
    return userCustom;
});