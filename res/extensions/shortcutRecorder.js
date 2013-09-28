define([
    "jquery",
    "underscore",
    "classes/Extension",
    "mousetrap",
    "mousetrap-record",
], function($, _, Extension, mousetrap) {
	
    var shortcutRecorder = new Extension("shortcutRecorder", "Shortcut recorder");
    
    shortcutRecorder.onReady = function() {
    	$('.button-record-shortcut').click(function() {
    		var $button = $(this);
    		Mousetrap.record(function(sequence) {
    			$button.before(['<div class="alert alert-dismissable">',
'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>',
sequence.join(' '),
'</div>'].join());
            });
    	});
    };

    return shortcutRecorder;
});