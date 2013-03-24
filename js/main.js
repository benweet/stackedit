(function($) {

	$(function() {
		var converter = Markdown.getSanitizingConverter();
		var editor = new Markdown.Editor(converter);
		editor.run();
		$(window).resize(resize);
		resize();

		if (typeof (Storage) !== "undefined") {
			fileManager.init();
		} else {
			showError("Web storage is not available");
		}
	});

	var fileManager = {};

	fileManager.init = function() {
		if (localStorage.fileSystem) {
			this.fileSystem = JSON.parse(localStorage.fileSystem);
			if (localStorage.currentFile)
				this.selectFile(localStorage.currentFile);
			else
				this.selectFile(Object.keys(this.fileSystem)[0]);
		} else {
			this.fileSystem = {};
			this.createFile("New file");
		}
		window.setInterval(function() {
			fileManager.saveFile();
		}, 5000);
	};

	fileManager.createFile = function(filename) {
		this.fileSystem[filename] = "blah blah";
		this.selectFile(filename);
	};

	fileManager.selectFile = function(filename) {
		this.currentFile = filename;
		this.content = this.fileSystem[this.currentFile];
		$("#wmd-input").val(this.content);
		$("#info-filename").text(filename);
	};

	fileManager.saveFile = function() {
		this.content = $("#wmd-input").val();
		this.fileSystem[this.currentFile] = this.content;
		localStorage.fileSystem = JSON.stringify(this.fileSystem);
		localStorage.currentFile = this.currentFile;
		insertFile(this.content);
	};

	function resize() {
		$("#wmd-input").width($(window).width() / 2 - 60).height(
			$(window).height() - 70);
		$("#wmd-preview").width($(window).width() / 2 - 60).height(
			$(window).height() - 100);
	}

	function showError(msg) {
		alert(msg);
	}
})(jQuery);
