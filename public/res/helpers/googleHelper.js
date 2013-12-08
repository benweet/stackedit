/*global gapi, google */
define([
    "underscore",
    "jquery",
    "constants",
    "core",
    "utils",
    "storage",
    "logger",
    "settings",
    "eventMgr",
    "classes/AsyncTask",
], function(_, $, constants, core, utils, storage, logger, settings, eventMgr, AsyncTask) {

    var connected = false;
    var authorizationMgr = {};
    (function() {
        var permissionList = {};
        var isAuthorized = false;
        _.each((storage.gdrivePermissions || '').split(';'), function(permission) {
            permission && (permissionList[permission] = true);
        });
        authorizationMgr.reset = function() {
            isAuthorized = false;
        };
        authorizationMgr.isAuthorized = function(permission) {
            return isAuthorized && _.has(permissionList, permission);
        };
        authorizationMgr.add = function(permission) {
            permissionList[permission] = true;
            storage.gdrivePermissions = _.keys(permissionList).join(';');
            isAuthorized = true;
        };
        authorizationMgr.getListWithNew = function(permission) {
            var result = _.keys(permissionList);
            if(!_.has(permissionList, permission)) {
                result.push(permission);
            }
            return result;
        };
    })();

    var googleHelper = {};

    // Listen to offline status changes
    var isOffline = false;
    eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
        isOffline = isOfflineParam;
    });

    // Try to connect Gdrive by downloading client.js
    function connect(task) {
        task.onRun(function() {
            if(isOffline === true) {
                connected = false;
                task.error(new Error("Operation not available in offline mode.|stopPublish"));
                return;
            }
            if(connected === true) {
                task.chain();
                return;
            }
            window.delayedFunction = function() {
                gapi.load("client,drive-realtime", function() {
                    connected = true;
                    task.chain();
                });
            };
            $.ajax({
                url: "https://apis.google.com/js/api.js?onload=runDelayedFunction",
                dataType: "script",
                timeout: constants.AJAX_TIMEOUT
            }).fail(function(jqXHR) {
                var error = {
                    code: jqXHR.status,
                    message: jqXHR.statusText
                };
                handleError(error, task);
            });
        });
    }

    // Try to authenticate with Oauth
    var scopeMap = {
        gdrive: [
            'https://www.googleapis.com/auth/drive.install',
            settings.gdriveFullAccess === true ? 'https://www.googleapis.com/auth/drive' : 'https://www.googleapis.com/auth/drive.file'
        ],
        blogger: [
            'https://www.googleapis.com/auth/blogger'
        ],
        picasa: [
            'https://picasaweb.google.com/data/'
        ]
    };
    function authenticate(task, permission, force) {
        task.onRun(function() {
            if(!force && authorizationMgr.isAuthorized(permission)) {
                task.chain();
                return;
            }
            var immediate = true;
            function oauthRedirect() {
                core.redirectConfirm('You are being redirected to <strong>Google</strong> authorization page.', function() {
                    task.chain(localAuthenticate);
                }, function() {
                    task.error(new Error('Operation canceled.'));
                });
            }
            function localAuthenticate() {
                if(immediate === false) {
                    task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
                }
                var scopeList = _.chain(scopeMap).pick(authorizationMgr.getListWithNew(permission)).flatten().value();
                gapi.auth.authorize({
                    'client_id': constants.GOOGLE_CLIENT_ID,
                    'scope': scopeList,
                    'immediate': immediate
                }, function(authResult) {
                    gapi.client.load('drive', 'v2', function() {
                        if(!authResult || authResult.error) {
                            // If immediate did not work retry without immediate
                            // flag
                            if(connected === true && immediate === true) {
                                immediate = false;
                                task.chain(oauthRedirect);
                                return;
                            }
                            // Error
                            task.error(new Error("Access to Google account is not authorized."));
                            return;
                        }
                        // Success
                        authorizationMgr.add(permission);
                        task.chain();
                    });
                });
            }
            task.chain(localAuthenticate);
        });
    }
    googleHelper.forceGdriveAuthenticate = function() {
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'gdrive', true);
        task.enqueue();
    };

    googleHelper.upload = function(fileId, parentId, title, content, contentType, etag, callback) {
        var result;
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'gdrive');
        task.onRun(function() {
            var boundary = '-------314159265358979323846';
            var delimiter = "\r\n--" + boundary + "\r\n";
            var close_delim = "\r\n--" + boundary + "--";
            contentType = contentType || 'text/x-markdown';
            var metadata = {
                title: title,
                mimeType: contentType
            };
            if(parentId) {
                // Specify the directory
                metadata.parents = [
                    {
                        kind: 'drive#fileLink',
                        id: parentId
                    }
                ];
            }
            var path = '/upload/drive/v2/files';
            var method = 'POST';
            if(fileId) {
                // If it's an update
                path += "/" + fileId;
                method = 'PUT';
            }
            var headers = {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
            };
            // Sometimes we have error 412 from Google even with the correct
            // etag
            // if(etag !== undefined) {
            // headers["If-Match"] = etag;
            // }
            
            var base64Data = utils.encodeBase64(content);
            var multipartRequestBody = [
                delimiter,
                'Content-Type: application/json\r\n\r\n',
                JSON.stringify(metadata),
                delimiter,
                'Content-Type: ',
                contentType,
                '\r\n',
                'Content-Transfer-Encoding: base64\r\n',
                '\r\n',
                base64Data,
                close_delim
            ].join("");
            
            var request = gapi.client.request({
                'path': path,
                'method': method,
                'params': {
                    'uploadType': 'multipart',
                },
                'headers': headers,
                'body': multipartRequestBody,
            });
            request.execute(function(response) {
                if(response && response.id) {
                    // Upload success
                    result = response;
                    result.content = content;
                    task.chain();
                    return;
                }
                var error = response.error;
                // Handle error
                if(error !== undefined && fileId !== undefined) {
                    if(error.code === 404) {
                        error = 'File ID "' + fileId + '" not found on Google Drive.|removePublish';
                    }
                    else if(error.code === 412) {
                        // We may have missed a file update
                        storage.removeItem("gdrive.lastChangeId");
                        error = 'Conflict on file ID "' + fileId + '". Please restart the synchronization.';
                    }
                }
                handleError(error, task);
            });
        });
        task.onSuccess(function() {
            callback(undefined, result);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };
    
    googleHelper.rename = function(fileId, title, callback) {
        var result;
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'gdrive');
        task.onRun(function() {
            var body = {'title': title};
            var request = gapi.client.drive.files.patch({
                'fileId': fileId,
                'resource': body
            });
            request.execute(function(response) {
                if(response && response.id) {
                    // Rename success
                    result = response;
                    task.chain();
                    return;
                }
                var error = response.error;
                // Handle error
                if(error !== undefined && fileId !== undefined) {
                    if(error.code === 404) {
                        error = 'File ID "' + fileId + '" not found on Google Drive.|removePublish';
                    }
                }
                handleError(error, task);
            });
        });
        task.onSuccess(function() {
            callback(undefined, result);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    googleHelper.createRealtimeFile = function(parentId, title, callback) {
        var result;
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'gdrive');
        task.onRun(function() {
            var metadata = {
                title: title,
                mimeType: 'application/vnd.google-apps.drive-sdk',
            };
            if(parentId !== undefined) {
                // Specify the directory
                metadata.parents = [
                    {
                        kind: 'drive#fileLink',
                        id: parentId
                    }
                ];
            }
            var request = gapi.client.drive.files.insert({
                'resource': metadata
            });
            request.execute(function(response) {
                if(response && response.id) {
                    // Upload success
                    result = response;
                    task.chain();
                    return;
                }
                handleError(response.error, task);
            });
        });
        task.onSuccess(function() {
            callback(undefined, result);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    googleHelper.uploadImg = function(name, content, albumId, callback) {
        var result;
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'picasa');
        task.onRun(function() {
            var headers = {
                "Slug": name
            };
            if(name.match(/.jpe?g$/i)) {
                headers["Content-Type"] = "image/jpeg";
            }
            else if(name.match(/.png$/i)) {
                headers["Content-Type"] = "image/png";
            }
            else if(name.match(/.gif$/i)) {
                headers["Content-Type"] = "image/gif";
            }
            var token = gapi.auth.getToken();
            if(token) {
                headers.Authorization = "Bearer " + token.access_token;
            }

            $.ajax({
                url: constants.PICASA_PROXY_URL + "upload/" + albumId,
                headers: headers,
                data: content,
                processData: false,
                dataType: "xml",
                timeout: constants.AJAX_TIMEOUT,
                type: "POST"
            }).done(function(data) {
                result = data;
                task.chain();
            }).fail(function(jqXHR) {
                var error = {
                    code: jqXHR.status,
                    message: jqXHR.statusText
                };
                if(error.code == 200) {
                    error.message = jqXHR.responseText;
                }
                handleError(error, task);
            });
        });
        task.onSuccess(function() {
            callback(undefined, result);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    googleHelper.checkChanges = function(lastChangeId, callback) {
        var changes = [];
        var newChangeId = lastChangeId || 0;
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'gdrive');
        task.onRun(function() {
            var nextPageToken;
            function retrievePageOfChanges() {
                var request;
                if(nextPageToken === undefined) {
                    request = gapi.client.drive.changes.list({
                        'startChangeId': newChangeId + 1
                    });
                }
                else {
                    request = gapi.client.drive.changes.list({
                        'pageToken': nextPageToken
                    });
                }

                request.execute(function(response) {
                    if(!response || !response.largestChangeId) {
                        // Handle error
                        handleError(response.error, task);
                        return;
                    }
                    // Retrieve success
                    newChangeId = response.largestChangeId;
                    nextPageToken = response.nextPageToken;
                    if(response.items !== undefined) {
                        changes = changes.concat(response.items);
                    }
                    if(nextPageToken !== undefined) {
                        task.chain(retrievePageOfChanges);
                    }
                    else {
                        task.chain();
                    }
                });
            }
            task.chain(retrievePageOfChanges);
        });
        task.onSuccess(function() {
            callback(undefined, changes, newChangeId);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    googleHelper.downloadMetadata = function(ids, callback, skipAuth) {
        var result = [];
        var task = new AsyncTask();
        connect(task);
        if(!skipAuth) {
            authenticate(task, 'gdrive');
        }
        task.onRun(function() {
            function recursiveDownloadMetadata() {
                if(ids.length === 0) {
                    task.chain();
                    return;
                }
                var id = ids[0];
                var headers = {};
                var token = gapi.auth.getToken();
                if(token) {
                    headers.Authorization = "Bearer " + token.access_token;
                }
                $.ajax({
                    url: "https://www.googleapis.com/drive/v2/files/" + id,
                    headers: headers,
                    data: {
                        key: constants.GOOGLE_API_KEY
                    },
                    dataType: "json",
                    timeout: constants.AJAX_TIMEOUT
                }).done(function(data) {
                    result.push(data);
                    ids.shift();
                    task.chain(recursiveDownloadMetadata);
                }).fail(function(jqXHR) {
                    var error = {
                        code: jqXHR.status,
                        message: jqXHR.statusText
                    };
                    // Handle error
                    if(error.code === 404) {
                        error = 'File ID "' + id + '" not found on Google Drive.';
                    }
                    handleError(error, task);
                });
            }
            task.chain(recursiveDownloadMetadata);
        });
        task.onSuccess(function() {
            callback(undefined, result);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    googleHelper.downloadContent = function(objects, callback, skipAuth) {
        var result = [];
        var task = new AsyncTask();
        // Add some time for user to choose his files
        task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
        connect(task);
        if(!skipAuth) {
            authenticate(task, 'gdrive');
        }
        task.onRun(function() {
            function recursiveDownloadContent() {
                if(objects.length === 0) {
                    task.chain();
                    return;
                }
                var object = objects[0];
                result.push(object);
                var file;
                // object may be a file
                if(object.kind == "drive#file") {
                    file = object;
                }
                // object may be a change
                else if(object.kind == "drive#change") {
                    file = object.file;
                }
                if(!file) {
                    objects.shift();
                    task.chain(recursiveDownloadContent);
                    return;
                }
                // if file is a real time document
                if(file.mimeType.indexOf("application/vnd.google-apps.drive-sdk") === 0) {
                    file.content = "";
                    file.isRealtime = true;
                    objects.shift();
                    task.chain(recursiveDownloadContent);
                    return;
                }
                var headers = {};
                var token = gapi.auth.getToken();
                if(token) {
                    headers.Authorization = "Bearer " + token.access_token;
                }
                $.ajax({
                    url: file.downloadUrl,
                    headers: headers,
                    data: {
                        key: constants.GOOGLE_API_KEY
                    },
                    dataType: "text",
                    timeout: constants.AJAX_TIMEOUT
                }).done(function(data) {
                    file.content = data;
                    objects.shift();
                    task.chain(recursiveDownloadContent);
                }).fail(function(jqXHR) {
                    var error = {
                        code: jqXHR.status,
                        message: jqXHR.statusText
                    };
                    // Handle error
                    handleError(error, task);
                });
            }
            task.chain(recursiveDownloadContent);
        });
        task.onSuccess(function() {
            callback(undefined, result);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    googleHelper.loadRealtime = function(fileId, content, callback, errorCallback) {
        var doc;
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'gdrive');
        task.onRun(function() {
            gapi.drive.realtime.load(fileId, function(result) {
                // onFileLoaded
                doc = result;
                task.chain();
            }, function(model) {
                // initializeModel
                var string = model.createString(content);
                model.getRoot().set('content', string);
            }, function(err) {
                errorCallback(err);
                task.error(new Error(err.message));
            });
        });
        task.onSuccess(function() {
            callback(undefined, doc);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    function handleError(error, task) {
        var errorMsg;
        if(error) {
            logger.error(error);
            // Try to analyze the error
            if(typeof error === "string") {
                errorMsg = error;
            }
            else {
                errorMsg = "Google error (" + error.code + ": " + error.message + ").";
                if(error.code >= 500 && error.code < 600) {
                    // Retry as described in Google's best practices
                    task.retry(new Error(errorMsg));
                    return;
                }
                else if(error.code === 401 || error.code === 403 || error.code == "token_refresh_required") {
                    authorizationMgr.reset();
                    errorMsg = "Access to Google account is not authorized.";
                    task.retry(new Error(errorMsg), 1);
                    return;
                }
                else if(error.code === 0 || error.code === -1) {
                    connected = false;
                    authorizationMgr.reset();
                    core.setOffline();
                    errorMsg = "|stopPublish";
                }
            }
        }
        task.error(new Error(errorMsg));
    }

    var pickerLoaded = false;
    function loadPicker(task) {
        task.onRun(function() {
            if(pickerLoaded === true) {
                task.chain();
                return;
            }
            $.ajax({
                url: "//www.google.com/jsapi",
                data: {
                    key: constants.GOOGLE_API_KEY
                },
                dataType: "script",
                timeout: constants.AJAX_TIMEOUT
            }).done(function() {
                google.load('picker', '1', {
                    callback: function() {
                        task.chain();
                    }
                });
                pickerLoaded = true;
            }).fail(function(jqXHR) {
                var error = {
                    code: jqXHR.status,
                    message: jqXHR.statusText
                };
                handleError(error, task);
            });
        });
    }

    googleHelper.picker = function(callback, pickerType) {
        var docs = [];
        var picker;
        function hidePicker() {
            if(picker !== undefined) {
                picker.setVisible(false);
                $(".modal-backdrop, .picker").remove();
            }
        }
        var task = new AsyncTask();
        // Add some time for user to choose his files
        task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
        connect(task);
        loadPicker(task);
        task.onRun(function() {
            var pickerBuilder = new google.picker.PickerBuilder();
            pickerBuilder.setAppId(constants.GOOGLE_DRIVE_APP_ID);
            var view;
            if(pickerType == 'doc') {
                view = new google.picker.DocsView(google.picker.ViewId.DOCS);
                view.setIncludeFolders(true);
                view.setMimeTypes([
                    "text/x-markdown",
                    "text/plain",
                    "application/octet-stream",
                    "application/vnd.google-apps.drive-sdk." + constants.GOOGLE_DRIVE_APP_ID
                ].join(","));
                pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
                pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
                pickerBuilder.addView(view);
            }
            else if(pickerType == 'folder') {
                view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
                view.setIncludeFolders(true);
                view.setSelectFolderEnabled(true);
                view.setMimeTypes('application/vnd.google-apps.folder');
                pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
                pickerBuilder.addView(view);
            }
            else if(pickerType == 'img') {
                view = new google.picker.PhotosView();
                view.setType('flat');
                pickerBuilder.addView(view);
                view = new google.picker.PhotosView();
                view.setType('ofuser');
                pickerBuilder.addView(view);
                pickerBuilder.addView(google.picker.ViewId.PHOTO_UPLOAD);
            }
            pickerBuilder.setCallback(function(data) {
                if(data.action == google.picker.Action.PICKED || data.action == google.picker.Action.CANCEL) {
                    if(data.action == google.picker.Action.PICKED) {
                        docs = data.docs;
                    }
                    hidePicker();
                    task.chain();
                }
            });
            picker = pickerBuilder.build();
            $(utils.createBackdrop()).click(function() {
                hidePicker();
                task.chain();
            });
            picker.setVisible(true);
        });
        task.onSuccess(function() {
            callback(undefined, docs);
        });
        task.onError(function(error) {
            hidePicker();
            callback(error);
        });
        task.enqueue();
    };

    googleHelper.uploadBlogger = function(blogUrl, blogId, postId, isDraft, labelList, title, content, callback) {
        var task = new AsyncTask();
        connect(task);
        authenticate(task, 'blogger');
        task.onRun(function() {
            var headers = {};
            var token = gapi.auth.getToken();
            if(token) {
                headers.Authorization = "Bearer " + token.access_token;
            }
            function publish() {
                var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts/";
                var data = {
                    kind: "blogger#post",
                    blog: {
                        id: blogId
                    },
                    labels: labelList,
                    title: title,
                    content: content
                };
                var type = "POST";
                // If it's an update
                if(postId !== undefined) {
                    url += postId;
                    data.id = postId;
                    type = "PUT";
                }
                // isDraft must be a URL param (vice data)
                if(isDraft) {
                  url += "?isDraft=true";
                }
                $.ajax({
                    url: url,
                    data: JSON.stringify(data),
                    headers: headers,
                    type: type,
                    contentType: "application/json",
                    dataType: "json",
                    timeout: constants.AJAX_TIMEOUT
                }).done(function(post) {
                    postId = post.id;
                    task.chain();
                }).fail(function(jqXHR) {
                    var error = {
                        code: jqXHR.status,
                        message: jqXHR.statusText
                    };
                    // Handle error
                    if(error.code === 404 && postId !== undefined) {
                        error = 'Post ' + postId + ' not found on Blogger.|removePublish';
                    }
                    handleError(error, task);
                });
            }
            function getBlogId() {
                if(blogId !== undefined) {
                    task.chain(publish);
                    return;
                }
                $.ajax({
                    url: "https://www.googleapis.com/blogger/v3/blogs/byurl",
                    data: {
                        url: blogUrl
                    },
                    headers: headers,
                    dataType: "json",
                    timeout: constants.AJAX_TIMEOUT
                }).done(function(blog) {
                    blogId = blog.id;
                    task.chain(publish);
                }).fail(function(jqXHR) {
                    var error = {
                        code: jqXHR.status,
                        message: jqXHR.statusText
                    };
                    // Handle error
                    if(error.code === 404) {
                        error = 'Blog "' + blogUrl + '" not found on Blogger.|removePublish';
                    }
                    handleError(error, task);
                });
            }
            task.chain(getBlogId);
        });
        task.onSuccess(function() {
            callback(undefined, blogId, postId);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    return googleHelper;
});
