/**
 *  Used to run any asynchronous tasks sequentially (ajax mainly)
 *  An asynchronous task must be created with:
 *  - a required run() function that may call success() or error()
 *  - an optional onSuccess() function
 *  - an optional onError() function
 *  - an optional timeout property
 */
var asyncTaskRunner = (function() {
	var asyncTaskRunner = {};
	
	var asyncTaskQueue = [];
	var currentTask = undefined;
	var currentTaskStartTime = new Date().getTime();
	
	// Run the next task in the queue if any and no other is running
	asyncTaskRunner.runTask = function() {
		
		// If there is a task currently running
		if(currentTask !== undefined) {
			// If the current task takes too long
			var timeout = currentTask.timeout || 30000;
			if(currentTaskStartTime + timeout < currentTime) {
				currentTask.error();
			}
			return;
		}
		
		// If no task in the queue
		if(asyncTaskQueue.length === 0) {
			return;
		}
		currentTask = asyncTaskQueue.shift();
		currentTaskStartTime = currentTime;
		showWorkingIndicator(true);
		
		// Set task attributes and functions
		currentTask.finished = false;
		currentTask.finish = function() {
			this.finished = true;
			showWorkingIndicator(false);
			currentTask = undefined;
			asyncTaskRunner.runTask();
		};
		currentTask.success = function() {
			if(this.finished === true) {
				return;
			}
			if(this.onSuccess) {
				this.onSuccess();
			}
			this.finish();
		};
		currentTask.error = function() {
			if(this.finished === true) {
				return;
			}
			if(this.onError) {
				this.onError();
			}
			this.finish();
		};
		currentTask.run();
	};
	
	// Add a task in the queue
	asyncTaskRunner.addTask = function(asyncTask) {
		asyncTaskQueue.push(asyncTask);
	};
	
	return asyncTaskRunner;
})();

