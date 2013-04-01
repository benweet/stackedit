var ASYNC_TASK_DEFAULT_TIMEOUT = 30000;

/**
 *  Used to run any asynchronous tasks sequentially (ajax mainly)
 *  An asynchronous task must be created with:
 *  - a required run() function that may call success(), error() or retry()
 *  - an optional onSuccess() function
 *  - an optional onError() function
 *  - an optional timeout field (default is 30000)
 */
var asyncTaskRunner = (function() {
	var asyncTaskRunner = {};
	
	var asyncTaskQueue = [];
	var currentTask = undefined;
	var currentTaskRunning = false;
	var currentTaskStartTime = currentTime;
	
	// Run the next task in the queue if any and no other is running
	asyncTaskRunner.runTask = function() {
		
		// If there is a task currently running
		if(currentTaskRunning !== false) {
			// If the current task takes too long
			var timeout = currentTask.timeout || ASYNC_TASK_DEFAULT_TIMEOUT;
			if(currentTaskStartTime + timeout < currentTime) {
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
			currentTaskStartTime = currentTime;
			showWorkingIndicator(true);
			
			// Set task attributes and functions
			currentTask.finished = false;
			currentTask.retryCounter = 0;
			currentTask.finish = function() {
				this.finished = true;
				showWorkingIndicator(false);
				currentTask = undefined;
				currentTaskRunning = false;
				asyncTaskRunner.runTask();
			};
			currentTask.success = function() {
				if(this.finished === true) {
					return;
				}
				try {
					if(this.onSuccess) {
						this.onSuccess();
					}
				} finally {
					this.finish();
				}
			};
			currentTask.error = function() {
				if(this.finished === true) {
					return;
				}
				try {
					if(this.onError) {
						this.onError();
					}
				} finally {
					this.finish();
				}
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
				var delay = (Math.pow(2, currentTask.retryCounter++) + Math.random()) * 1000;
				console.log(delay);
				currentTaskStartTime = currentTime + delay;
				currentTaskRunning = false;
				asyncTaskRunner.runTask();
			};
		}
		
		// Run the task
		if(currentTaskStartTime <= currentTime) {
			currentTaskRunning = true;
			currentTask.run();
		}
	};
	
	// Add a task in the queue
	asyncTaskRunner.addTask = function(asyncTask) {
		asyncTaskQueue.push(asyncTask);
	};
	
	return asyncTaskRunner;
})();

