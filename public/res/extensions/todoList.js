define([
	"jquery",
	"underscore",
	"utils",
	"crel",
	"storage",
	"fileSystem",
	"classes/Extension",
	"text!html/todoList.html",
], function($, _, utils, crel, storage, fileSystem, Extension, todoListHTML) {

	var todoList = new Extension("TodoList", 'Button "Todo List"', true, true);
	todoList.settingsBlock = '<p>Adds a "Todo" button on the menu.</p>';

	var todoIndex = {};

	var todoListElt;
	var todoRegex = /^.*TODO:(.*)/gm;
	var todoListTemplate = [
		'<dl>',
		'<% _.each(pages, function(page, fileIndex) { %> <dt> <%= page.title %></dt>',
		'	<% _.each(page.items, function(i, index){ %> <dd> <a href="#" class="todo-item<%= i.done ? " todo-item-done" : "" %>" data-file-index="<%= fileIndex %>" data-re-index="<%= index %>" data-match-start="<%= i.start %>" data-match-end="<%= i.end %>">',
		'							<%= i.text %>',
		'							<% if (i.done) {%><span class="badge">done</span><% }%>',
		'						</a></dd> <%}); %>',
		'<% }); %>',
		'</dl>'
	].join('\n');

	var fileMgr;
	todoList.onFileMgrCreated = function(fileMgrParameter) {
		fileMgr = fileMgrParameter;
	};

	var editor;
	todoList.onEditorCreated = function(editorParam) {
		editor = editorParam;
		window.editor = editor;
	};

	var selectedFileDesc;
	todoList.onFileSelected = function(fileDesc) {
		selectedFileDesc = fileDesc;
	};

	todoList.onCreateButton = function() {
		var button = crel('button', {
			class: 'btn btn-success button-todo-list',
			title: 'Todo List'
		}, crel('i', {
			class: 'icon-fire'
		}));
		$(button).click(function () {
			refreshList();
			$('.todo-filter-todo').click();
			$('.modal-todo-list').modal('show');
		});
		return button;
	};

	var refreshList = _.debounce(function() {

		var todoListHtml = _.template(todoListTemplate, {pages : todoIndex});

		todoListElt.innerHTML = todoListHtml;

		_.each(todoListElt.querySelectorAll('.todo-item'), function(itemElt) {
			var $itemElt = $(itemElt);
			$itemElt.click(function() {
				var fileDesc = fileSystem[$itemElt.data('fileIndex')];
				if(fileDesc) {
					if(fileDesc !== selectedFileDesc) {
						fileMgr.selectFile(fileDesc);
					}

					$('.modal-todo-list').modal('hide');
					editor.selectionMgr.setSelectionStartEnd($itemElt.data('match-start'), $itemElt.data('match-end'));
					editor.selectionMgr.updateSelectionRange();
					editor.selectionMgr.updateCursorCoordinates(true);
				}
			});
		});

		$('.todo-filter-todo').trigger('click');
		
	}, 50);

	function indexRegex(fileDesc, content, regex, index) {
		var match = regex.exec(content);

		if (match !== null) {

			if (typeof index[fileDesc.fileIndex] == 'undefined') {
				index[fileDesc.fileIndex] = {
					title : fileDesc.title,
					items : []
				};
			} else {
				index[fileDesc.fileIndex].items = [];
			}

			do {
				var done = /~~TODO:/.test(match[0]);
				index[fileDesc.fileIndex].items.push({
					text : match[1].replace(/^\s+|\s+\s+$|~~/g, ''),
					done : done,
					start: match.index,
					end: match.index + match[0].length
				});
			} while ((match = regex.exec(fileDesc.content)) !== null);
		}
	}

	todoList.onContentChanged = function(fileDesc, content) { indexRegex(fileDesc, content, todoRegex, todoIndex);};

	todoList.onReady = function() {
		utils.addModal('modal-todo-list', todoListHTML);
		
		todoListElt = document.querySelector('.modal-todo-list').querySelector('.dl-todo-list');

		_.each(fileSystem, function(fileDesc) {
			indexRegex(fileDesc, fileDesc.content, todoRegex, todoIndex);
		});

		$('.todo-filter-todo').click(function() {
			$(".todo-item").show();
			$(".todo-item-done").hide();
		});

		$('.todo-filter-done').click(function() {
			$(".todo-item").hide();
			$(".todo-item-done").show();
		});

		$('.todo-filter-all').click(function() {
			$(".todo-item").show();
			$(".todo-item-done").show();
		});

	};

	return todoList;

});
