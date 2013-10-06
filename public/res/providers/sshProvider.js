define([
    "utils",
    "classes/Provider",
    "helpers/sshHelper"
], function(utils, Provider, sshHelper) {

    var sshProvider = new Provider("ssh", "SSH server");
    sshProvider.publishPreferencesInputIds = [
        "ssh-host",
        "ssh-port",
        "ssh-username",
        "ssh-password"
    ];

    sshProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        sshHelper.upload(publishAttributes.host, publishAttributes.port, publishAttributes.username, publishAttributes.password, publishAttributes.path, title, content, callback);
    };

    sshProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.host = utils.getInputTextValue("#input-publish-ssh-host", event, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
        publishAttributes.port = utils.getInputIntValue("#input-publish-ssh-port", undefined, 0);
        publishAttributes.username = utils.getInputTextValue("#input-publish-ssh-username", event);
        publishAttributes.password = utils.getInputTextValue("#input-publish-ssh-password", event);
        publishAttributes.path = utils.getInputTextValue("#input-publish-file-path", event);
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return sshProvider;
});