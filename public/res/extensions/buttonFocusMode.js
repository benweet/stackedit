define([
    "jquery",
    "underscore",
    "crel",
    "storage",
    "classes/Extension"
], function($, _, crel, storage, Extension) {

    var buttonFocusMode = new Extension("buttonFocusMode", 'Button "Focus Mode"', true, true, true);
    buttonFocusMode.settingsBlock = "When typing, scrolls automatically the editor to always have the caret centered verticaly.";

    var aceEditor;
    buttonFocusMode.onAceCreated = function(aceEditorParam) {
        aceEditor = aceEditorParam;
    };

    var isFocusModeOn = false;
    var isMouseActive = false;
    function doFocusMode() {
        if(isFocusModeOn === false || isMouseActive === true) {
            return;
        }
        var positionInDocument = aceEditor.selection.getCursor();
        var positionInScreen = aceEditor.session.documentToScreenPosition(positionInDocument.row, positionInDocument.column);
        aceEditor.session.setScrollTop((positionInScreen.row + 0.5) * aceEditor.renderer.lineHeight - aceEditor.renderer.$size.scrollerHeight / 2);
    }

    var $button;
    buttonFocusMode.onReady = function() {
        aceEditor.getSession().selection.on('changeCursor', doFocusMode);
        aceEditor.container.addEventListener('keydown', function() {
            isMouseActive = false;
        }, true);
        aceEditor.container.addEventListener('mousedown', function() {
            isMouseActive = true;
        }, true);
        if(storage.focusMode == 'on') {
            $button.click();
        }
    };

    buttonFocusMode.onCreateEditorButton = function() {
        $button = $([
            '<button class="btn btn-info" title="Focus Mode" data-toggle="button">',
            '   <i class="icon-target"></i>',
            '</button>'
        ].join(''));
        $button.click(function() {
            _.defer(function() {
                isFocusModeOn = $button.is('.active');
                storage.focusMode = isFocusModeOn ? 'on' : 'off';
                isMouseActive = false;
                aceEditor.focus();
                doFocusMode();
            });
        });
        return $button[0];
    };

    return buttonFocusMode;
});