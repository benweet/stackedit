/**
 * Used to run asynchronous tasks sequentially (ajax mainly). An asynchronous
 * task is composed of different callback types: onRun, onSuccess, onError
 */
define([
    "underscore",
    "core",
    "utils",
    "extensionMgr",
    "libs/stacktrace",
], function(_, core, utils, extensionMgr) {

    var asyncRunner = {};

    var taskQueue = [];
    var asyncRunning = false;
    var currentTask = undefined;
    var currentTaskRunning = false;
    var currentTaskStartTime = 0;

    asyncRunner.createTask = function() {
        var task = {};
        task.finished = false;
        task.timeout = ASYNC_TASK_DEFAULT_TIMEOUT;
        task.retryCounter = 0;
        task.callPath = [];
        /**
         * onRun callbacks are called by chain(). These callbacks have to call
         * chain() themselves to chain with next onRun callback or error() to
         * throw an exception or retry() to restart the task.
         */
        // Run callbacks
        task.runCallbacks = [];
        task.onRun = function(callback) {
            task.runCallbacks.push(callback);
        };
        /**
         * onSuccess callbacks are called when every onRun callbacks have
         * succeed.
         */
        task.successCallbacks = [];
        task.onSuccess = function(callback) {
            task.successCallbacks.push(callback);
        };
        /**
         * onError callbacks are called when error() is called in a onRun
         * callback.
         */
        task.errorCallbacks = [];
        task.onError = function(callback) {
            task.errorCallbacks.push(callback);
        };
        /**
         * chain() calls the next onRun callback or the onSuccess callbacks when
         * finished. The optional callback parameter can be used to pass an
         * onRun callback during execution.
         */
        task.chain = function(callback) {
            task.callPath.unshift(printStackTrace()[5]);
            if(task.finished === true) {
                return;
            }
            // If first execution
            if(task.queue === undefined) {
                // Create a copy of the onRun callbacks
                task.queue = task.runCallbacks.slice();
            }
            // If a callback is passed as a parameter
            if(callback !== undefined) {
                callback();
                return;
            }
            // If all callbacks have been run
            if(task.queue.length === 0) {
                // Run the onSuccess callbacks
                runSafe(task, task.successCallbacks);
                return;
            }
            // Run the next callback
            var runCallback = task.queue.shift();
            runCallback();
        };
        /**
         * error() calls the onError callbacks passing the error parameter and
         * ends the task by throwing an exception.
         */
        task.error = function(error) {
            task.callPath.unshift(printStackTrace()[5]);
            if(task.finished === true) {
                return;
            }
            error = error || new Error("Unknown error|\n" + task.callPath.join("\n"));
            if(error.message) {
                extensionMgr.onError(error);
            }
            runSafe(task, task.errorCallbacks, error);
            // Exit the current call stack
            throw error;
        };
        /**
         * retry() can be called in an onRun callback to restart the task
         */
        task.retry = function(error, maxRetryCounter) {
            if(task.finished === true) {
                return;
            }
            maxRetryCounter = maxRetryCounter || 5;
            task.queue = undefined;
            if(task.retryCounter >= maxRetryCounter) {
                task.error(error);
                return;
            }
            // Implement an exponential backoff
            var delay = Math.pow(2, task.retryCounter++) * 1000;
            currentTaskStartTime = utils.currentTime + delay;
            currentTaskRunning = false;
            task.callPath = [];
            asyncRunner.runTask();
        };
        return task;
    };

    // Run the next task in the queue if any and no other running
    asyncRunner.runTask = function() {
        // Use defer to avoid stack overflow
        _.defer(function() {

            // If there is a task currently running
            if(currentTaskRunning === true) {
                // If the current task takes too long
                if(currentTaskStartTime + currentTask.timeout < utils.currentTime) {
                    currentTask.error(new Error("A timeout occurred.|\n" + currentTask.callPath.join("\n")));
                }
                return;
            }

            if(currentTask === undefined) {
                // If no task in the queue
                if(taskQueue.length === 0) {
                    return;
                }

                // Dequeue an enqueued task
                currentTask = taskQueue.shift();
                currentTaskStartTime = utils.currentTime;
                if(asyncRunning === false) {
                    asyncRunning = true;
                    extensionMgr.onAsyncRunning(true);
                }
            }

            // Run the task
            if(currentTaskStartTime <= utils.currentTime) {
                currentTaskRunning = true;
                currentTask.chain();
            }
        });
    };
    // Run runTask function periodically
    core.addPeriodicCallback(asyncRunner.runTask);

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
                extensionMgr.onAsyncRunning(false);
            }
            else {
                asyncRunner.runTask();
            }
        }
    }

    // Add a task to the queue
    asyncRunner.addTask = function(task) {
        taskQueue.push(task);
        asyncRunner.runTask();
    };

    // Change current task timeout
    asyncRunner.setCurrentTaskTimeout = function(timeout) {
        if(currentTask !== undefined) {
            currentTask.timeout = timeout;
        }
    };

    return asyncRunner;
});
