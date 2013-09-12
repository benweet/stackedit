define(function() {
    
    function Extension(extensionId, extensionName, isOptional, disableInViewer, disableInLight) {
        this.extensionId = extensionId;
        this.extensionName = extensionName;
        this.isOptional = isOptional;
        this.disableInViewer = disableInViewer;
        this.disableInLight = disableInLight;
    }
    
    return Extension;
});