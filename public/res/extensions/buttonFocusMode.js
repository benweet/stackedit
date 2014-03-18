define([
    "jquery",
    "underscore",
    "caret",
    "crel",
    "classes/Extension"
], function($, _, caret, crel, Extension) {

    var buttonFocusMode = new Extension("buttonFocusMode", 'Button "Focus Mode"', true, true);
    buttonFocusMode.settingsBlock = "When typing, scrolls automatically the editor to always have the caret centered verticaly.";

    var aceEditor;
    buttonFocusMode.onAceCreated = function(aceEditorParam) {
        aceEditor = aceEditorParam;
    };

    var isMouseActive = false;
    function doFocusMode() {
        if(aceEditor) {
            if(isMouseActive === true) {
                return;
            }
            var positionInDocument = aceEditor.selection.getCursor();
            var positionInScreen = aceEditor.session.documentToScreenPosition(positionInDocument.row, positionInDocument.column);
            aceEditor.session.setScrollTop((positionInScreen.row + 0.5) * aceEditor.renderer.lineHeight - aceEditor.renderer.$size.scrollerHeight / 2);
        }
    }
    
    var $editorElt;
    //var $positionHelper = $('<span>').css('display', 'inline-block');
    var coef = 0.2;
    function doFocus() {
        setTimeout(function() {
            if(!($editorElt && $editorElt[0].focused)) {
                return;
            }
            /*
            var range = window.getSelection().getRangeAt(0); 
            range.insertNode($positionHelper[0]);
            var parentNode = $positionHelper[0].parentNode;
            */
            var editorHeight = $editorElt.height();
            var cursorMinY = coef*editorHeight;
            var cursorMaxY = (1-coef)*editorHeight;
            var cursorY = $editorElt.caret('offset').top - $editorElt.offset().top;
            console.log($editorElt.caret('offset'));
            //$positionHelper.detach();
            //parentNode.normalize();
            /*
            if(cursorY < cursorMinY) {
                $editorElt.scrollTop($editorElt.scrollTop() - cursorMinY + cursorY);
            }
            else if(cursorY > cursorMaxY) {
                $editorElt.scrollTop($editorElt.scrollTop() + cursorY - cursorMaxY);
            }
            */
        }, 0);
    }

    buttonFocusMode.onLayoutResize = doFocus;
    
    buttonFocusMode.onReady = function() {
        if(aceEditor) {
            aceEditor.getSession().selection.on('changeCursor', doFocusMode);
            aceEditor.container.addEventListener('keydown', function() {
                isMouseActive = false;
            }, true);
            aceEditor.container.addEventListener('mousedown', function() {
                isMouseActive = true;
            }, true);
            return;
        }
        $editorElt = $('#wmd-input').on('keydown', function(event) {
            if(event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
                return;
            }
            doFocus();
        });
    };

    return buttonFocusMode;
});


