/**
 *  Used to run asynchronous tasks sequentially (ajax mainly)
 *  An asynchronous task must be created with:
 *  - a required run() function that may call success(), error() or retry()
 *  - an optional onSuccess() function
 *  - an optional onError() function
 *  - an optional timeout field (default is 30000)
 */
define(function() {
	
	var asyncTaskRunner = {};
	
	// Dependencies
	var core = undefined;
	
	var asyncTaskQueue = [];
	var currentTask = undefined;
	var currentTaskRunning = false;
	var currentTaskStartTime = 0;
	
	// Run the next task in the queue if any and no other is running
	function runTask() {
		
		// If there is a task currently running
		if(currentTaskRunning === true) {
			// If the current task takes too long
			var timeout = currentTask.timeout || ASYNC_TASK_DEFAULT_TIMEOUT;
			if(currentTaskStartTime + timeout < core.currentTime) {
				currentTask.error();
			}
			return;
		}
		
		if(currentTask === undefined) {
			// If no task in the queue
			if(asyncTaskQueue.length === 0) {
				return;
			}
			
			// Dequeue an enqueued task 
			currentTask = asyncTaskQueue.shift();
			currentTaskStartTime = core.currentTime;
			core.showWorkingIndicator(true);
			
			// Set task attributes and functions
			currentTask.finished = false;
			currentTask.retryCounter = 0;
			currentTask.success = function() {
				runSafe(this.onSuccess);
			};
			currentTask.error = function() {
				runSafe(this.onError);
			};
			currentTask.retry = function() {
				if(this.finished === true) {
					return;
				}
				if(currentTask.retryCounter === 5) {
					this.error();
					return;
				}
				// Implement an exponential backoff
				var delay = Math.pow(2, currentTask.retryCounter++) * 1000;
				currentTaskStartTime = core.currentTime + delay;
				currentTaskRunning = false;
				asyncTaskRunner.runTask();
			};
		}
		
		// Run the task
		if(currentTaskStartTime <= core.currentTime) {
			currentTaskRunning = true;
			currentTask.run();
		}
	}
	
	asyncTaskRunner.runTask = function() {		
		// Use setTimeout to avoid stack overflow
		setTimeout(runTask, 0);
	};
	
	function runSafe(func) {
		if(currentTask === undefined || currentTask.finished === true) {
			return;
		}
		try {
			if(func) {
				func();
			}
		} finally {
			currentTask.finished = true;
			currentTask = undefined;
			currentTaskRunning = false;
			if(asyncTaskQueue.length === 0) {
				core.showWorkingIndicator(false);
			}
			else {
				asyncTaskRunner.runTask();
			}
		}
	}
	
	// Add a task into the queue
	asyncTaskRunner.addTask = function(asyncTask) {
		asyncTaskQueue.push(asyncTask);
		asyncTaskRunner.runTask();
	};
	
	asyncTaskRunner.init = function(coreModule) {
		core = coreModule;
	};
	
	return asyncTaskRunner;
});

