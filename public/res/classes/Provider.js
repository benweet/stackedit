define(function() {
    
    function Provider(providerId, providerName) {
        this.providerId = providerId;
        this.providerName = providerName;
        this.isPublishEnabled = true;
    }
    
    return Provider;
});