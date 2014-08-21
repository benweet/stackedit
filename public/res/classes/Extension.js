define(function() {

    function Extension(extensionId, extensionName, isOptional, disableInViewer) {
        this.extensionId = extensionId;
        this.extensionName = extensionName;
        this.isOptional = isOptional;
        this.disableInViewer = disableInViewer;
    }

    return Extension;
});
