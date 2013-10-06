var isConfigured = false
self.onmessage = function(e) {
    if(isConfigured === false) {
        eval(e.data);
        isConfigured = true;
    }
    else {
        var data = JSON.parse(e.data);
        var functionName = data.shift();
        self[functionName].apply(this, data);
    }
};
