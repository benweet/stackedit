{
    'mod+r': function() {
        clickPagedownButton('hr');
    },
    'mod+z': function() {
        require('editor').undoMgr.undo();
    },
    'mod+y': function() {
        require('editor').undoMgr.redo();
    },
    'mod+shift+z': function() {
        require('editor').undoMgr.redo();
    },
    'S t a c k E d i t': function() {
        eventMgr.onMessage('StackEdit is so good!!!');
    }
}
