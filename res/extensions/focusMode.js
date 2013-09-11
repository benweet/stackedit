define([
    "jquery",
    "underscore",
    "crel",
    "classes/Extension"
], function($, _, crel, Extension) {

    var focusMode = new Extension("focusMode", "Focus Mode", true, true);
    focusMode.settingsBlock = "Scrolls automatically the editor to have the caret verticaly centered";
    
    var aceEditor = undefined;
    focusMode.onAceCreated = function(aceEditorParam) {
        aceEditor = aceEditorParam;
    };
    
    var isActive = false;
    function doFocus() {
        if(isActive === false) {
            return;
        }
        var positionInDocument = aceEditor.selection.getCursor();
        var positionInScreen = aceEditor.session.documentToScreenPosition(positionInDocument.row, positionInDocument.column);
        aceEditor.session.setScrollTop((positionInScreen.row+0.5) * aceEditor.renderer.lineHeight - aceEditor.renderer.$size.scrollerHeight / 2);
    }

    focusMode.onReady = function() {
        //aceEditor.getSession().on('change', doFocus);
        aceEditor.getSession().selection.on('changeCursor', doFocus);
    };

    focusMode.onCreateEditorButton = function() {
        var $button = $([
            '<button class="btn btn-info" title="Focus Mode" data-toggle="button">',
            '   <i class="icon-target"></i>',
            '</button>'
        ].join(''));
        $button.click(function() {
            _.defer(function() {
                isActive = $button.is('.active');
                aceEditor.focus();
                doFocus();
            });
        });
        return $button[0];
    };

    return focusMode;
});