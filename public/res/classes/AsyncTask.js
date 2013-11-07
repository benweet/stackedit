define([
    "underscore",
    "constants",
    "utils",
    "eventMgr",
], function(_, constants, utils, eventMgr) {
    
    var taskQueue = [];
    
    function AsyncTask(force) {
        this.finished = false;
        this.timeout = constants.ASYNC_TASK_DEFAULT_TIMEOUT;
        this.retryCounter = 0;
        this.runCallbacks = [];
        this.successCallbacks = [];
        this.errorCallbacks = [];
        this.force = force;
    }
    
    /**
     * onRun callbacks are called by chain(). These callbacks have to call
     * chain() themselves to chain with next onRun callback or error() to
     * throw an exception or retry() to restart the task.
     */
    AsyncTask.prototype.onRun = function(callback) {
        this.runCallbacks.push(callback);
    };
    
    /**
     * onSuccess callbacks are called when every onRun callbacks have
     * succeed.
     */
    AsyncTask.prototype.onSuccess = function(callback) {
        this.successCallbacks.push(callback);
    };
    
    /**
     * onError callbacks are called when error() is called in a onRun
     * callback.
     */
    AsyncTask.prototype.onError = function(callback) {
        this.errorCallbacks.push(callback);
    };
    
    /**
     * chain() calls the next onRun callback or the onSuccess callbacks when
     * finished. The optional callback parameter can be used to pass an
     * onRun callback during execution, bypassing the onRun queue.
     */
    var currentTaskStartTime = 0;
    AsyncTask.prototype.chain = function(callback) {
        currentTaskStartTime = utils.currentTime;
        utils.logStackTrace();
        if(this.finished === true) {
            return;
        }
        // If first execution
        if(this.queue === undefined) {
            // Create a copy of the onRun callbacks
            this.queue = this.runCallbacks.slice();
        }
        // If a callback is passed as a parameter
        if(callback !== undefined) {
            callback();
            return;
        }
        // If all callbacks have been run
        if(this.queue.length === 0) {
            // Run the onSuccess callbacks
            runSafe(this, this.successCallbacks);
            return;
        }
        // Run the next callback
        var runCallback = this.queue.shift();
        runCallback();
    };
    
    /**
     * error() calls the onError callbacks passing the error parameter and
     * ends the task by throwing an exception.
     */
    AsyncTask.prototype.error = function(error) {
        utils.logStackTrace();
        if(this.finished === true) {
            return;
        }
        error = error || new Error("Unknown error");
        if(error.message) {
            eventMgr.onError(error);
        }
        runSafe(this, this.errorCallbacks, error);
        // Exit the current call stack
        throw error;
    };
    
    /**
     * retry() can be called in an onRun callback to restart the task
     */
    var currentTaskRunning = false;
    AsyncTask.prototype.retry = function(error, maxRetryCounter) {
        if(this.finished === true) {
            return;
        }
        maxRetryCounter = maxRetryCounter || 5;
        this.queue = undefined;
        if(this.retryCounter >= maxRetryCounter) {
            this.error(error);
            return;
        }
        // Implement an exponential backoff
        var delay = Math.pow(2, this.retryCounter++) * 1000;
        currentTaskStartTime = utils.currentTime + delay;
        currentTaskRunning = false;
        runTask();
    };

    /**
     * enqueue() has to be called to add the task to the task queue
     */
    AsyncTask.prototype.enqueue = function() {
        taskQueue.push(this);
        runTask();
    };

    var asyncRunning = false;
    var currentTask;

    // Determine if user is real by listening to his activity
    var isUserReal = false;
    eventMgr.addListener("onUserActive", function() {
        isUserReal = true;
    });
    
    // Run the next task in the queue if any and no other running
    function runTask() {
    
        // If there is a task currently running
        if(currentTaskRunning === true) {
            // If the current task takes too long
            if(currentTaskStartTime + currentTask.timeout < utils.currentTime) {
                currentTask.error(new Error("A timeout occurred."));
            }
            return;
        }

        if(currentTask === undefined) {
            // If no task in the queue or user has never interacted
            if(taskQueue.length === 0 || (!taskQueue[0].force && isUserReal === false)) {
                return;
            }

            // Dequeue an enqueued task
            currentTask = taskQueue.shift();
            currentTaskStartTime = utils.currentTime;
            if(asyncRunning === false) {
                asyncRunning = true;
                eventMgr.onAsyncRunning(true);
            }
        }

        // Run the task
        if(currentTaskStartTime <= utils.currentTime) {
            currentTaskRunning = true;
            currentTask.chain();
        }
    }
    
    // Call runTask periodically
    eventMgr.addListener("onPeriodicRun", runTask);

    function runSafe(task, callbacks, param) {
        try {
            _.each(callbacks, function(callback) {
                callback(param);
            });
        }
        finally {
            task.finished = true;
            if(currentTask === task) {
                currentTask = undefined;
                currentTaskRunning = false;
            }
            if(taskQueue.length === 0) {
                asyncRunning = false;
                eventMgr.onAsyncRunning(false);
            }
            else {
                runTask();
            }
        }
    }

    return AsyncTask;
});