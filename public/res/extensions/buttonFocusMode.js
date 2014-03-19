define([
    "jquery",
    "underscore",
    "crel",
    "classes/Extension"
], function($, _, crel, Extension) {

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
    };

    return buttonFocusMode;
});
