define(function() {
    
    function Extension(extensionId, extensionName, isOptional) {
        this.extensionId = extensionId;
        this.extensionName = extensionName;
        this.isOptional = isOptional;
    }
    
    return Extension;
});