define([], function () {
    
    // Defines the logger object
    var logger = {
        log: function () {},
        info: function () {},
        warn: function () {},
        error: function () {}
    };
    
    // We can run StackEdit with http://.../?console to print logs in the console
    return (/(\?|&)console($|&)/).test(location.search) ? console : logger;
});