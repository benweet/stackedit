/*jshint worker:true */
var isConfigured = false;

self.onmessage = function(e) {
    if(isConfigured === false) {
        /*jshint evil:true */
        eval(e.data);
        isConfigured = true;
    }
    else {
        var data = JSON.parse(e.data);
        var functionName = data.shift();
        self[functionName].apply(this, data);
    }
};
