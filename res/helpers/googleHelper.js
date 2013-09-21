define([
    "jquery",
    "core",
    "utils",
    "eventMgr",
    "classes/AsyncTask"
], function($, core, utils, eventMgr, AsyncTask) {

    var connected = false;
    var authenticated = false;

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
            delayedFunction = function() {
                gapi.load("client,drive-realtime", function() {
                    connected = true;
                    task.chain();
                });
            };
            $.ajax({
                url: "https://apis.google.com/js/api.js?onload=runDelayedFunction",
                dataType: "script",
                timeout: AJAX_TIMEOUT
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
    function authenticate(task) {
        task.onRun(function() {
            if(authenticated === true) {
                task.chain();
                return;
            }
            var immediate = true;
            function localAuthenticate() {
                if(immediate === false) {
                    eventMgr.onMessage("Please make sure the Google authorization popup is not blocked by your browser.");
                    // If not immediate we add time for user to enter his
                    // credentials
                    task.timeout = ASYNC_TASK_LONG_TIMEOUT;
                }
                gapi.auth.authorize({
                    'client_id': GOOGLE_CLIENT_ID,
                    'scope': GOOGLE_SCOPES,
                    'immediate': immediate
                }, function(authResult) {
                    gapi.client.load('drive', 'v2', function() {
                        if(!authResult || authResult.error) {
                            // If immediate did not work retry without immediate
                            // flag
                            if(connected === true && immediate === true) {
                                immediate = false;
                                task.chain(localAuthenticate);
                                return;
                            }
                            // Error
                            task.error(new Error("Access to Google account is not authorized."));
                            return;
                        }
                        // Success
                        authenticated = true;
                        task.chain();
                    });
                });
            }
            task.chain(localAuthenticate);
        });
    }
    googleHelper.forceAuthenticate = function() {
        authenticated = false;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.enqueue();
    };

    googleHelper.upload = function(fileId, parentId, title, content, contentType, etag, callback) {
        var result = undefined;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
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
                        localStorage.removeItem("gdrive.lastChangeId");
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
        var result = undefined;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
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
        var result = undefined;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
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
        var result = undefined;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            var headers = {
                "Slug": name
            };
            if(name.match(/.jpe?g$/)) {
                headers["Content-Type"] = "image/jpeg";
            }
            else if(name.match(/.png$/)) {
                headers["Content-Type"] = "image/png";
            }
            else if(name.match(/.gif$/)) {
                headers["Content-Type"] = "image/gif";
            }
            var token = gapi.auth.getToken();
            if(token) {
                headers.Authorization = "Bearer " + token.access_token;
            }

            $.ajax({
                url: PICASA_PROXY_URL + "upload/" + albumId,
                headers: headers,
                data: content,
                processData: false,
                dataType: "xml",
                timeout: AJAX_TIMEOUT,
                type: "POST"
            }).done(function(data, textStatus, jqXHR) {
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
        authenticate(task);
        task.onRun(function() {
            var nextPageToken = undefined;
            function retrievePageOfChanges() {
                var request = undefined;
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
            authenticate(task);
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
                        key: GOOGLE_API_KEY
                    },
                    dataType: "json",
                    timeout: AJAX_TIMEOUT
                }).done(function(data, textStatus, jqXHR) {
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
        task.timeout = ASYNC_TASK_LONG_TIMEOUT;
        connect(task);
        if(!skipAuth) {
            authenticate(task);
        }
        task.onRun(function() {
            function recursiveDownloadContent() {
                if(objects.length === 0) {
                    task.chain();
                    return;
                }
                var object = objects[0];
                result.push(object);
                var file = undefined;
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
                        key: GOOGLE_API_KEY
                    },
                    dataType: "text",
                    timeout: AJAX_TIMEOUT
                }).done(function(data, textStatus, jqXHR) {
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
        var doc = undefined;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
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
        var errorMsg = undefined;
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
                    authenticated = false;
                    errorMsg = "Access to Google account is not authorized.";
                    task.retry(new Error(errorMsg), 1);
                    return;
                }
                else if(error.code === 0 || error.code === -1) {
                    connected = false;
                    authenticated = false;
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
                    key: GOOGLE_API_KEY
                },
                dataType: "script",
                timeout: AJAX_TIMEOUT
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
        var picker = undefined;
        function hidePicker() {
            if(picker !== undefined) {
                picker.setVisible(false);
                $(".modal-backdrop, .picker").remove();
            }
        }
        var task = new AsyncTask();
        // Add some time for user to choose his files
        task.timeout = ASYNC_TASK_LONG_TIMEOUT;
        connect(task);
        loadPicker(task);
        task.onRun(function() {
            var pickerBuilder = new google.picker.PickerBuilder();
            pickerBuilder.setAppId(GOOGLE_DRIVE_APP_ID);
            if(pickerType == 'doc') {
                var view = new google.picker.DocsView(google.picker.ViewId.DOCS);
                view.setIncludeFolders(true);
                view.setMimeTypes([
                    "text/x-markdown",
                    "text/plain",
                    "application/octet-stream",
                    "application/vnd.google-apps.drive-sdk." + GOOGLE_DRIVE_APP_ID
                ].join(","));
                pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
                pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
                pickerBuilder.addView(view);
            }
            else if(pickerType == 'folder') {
                var view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
                view.setIncludeFolders(true);
                view.setSelectFolderEnabled(true);
                view.setMimeTypes('application/vnd.google-apps.folder');
                pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
                pickerBuilder.addView(view);
            }
            else if(pickerType == 'img') {
                pickerBuilder.addView(google.picker.ViewId.PHOTOS);
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

    googleHelper.uploadBlogger = function(blogUrl, blogId, postId, labelList, title, content, callback) {
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
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
                $.ajax({
                    url: url,
                    data: JSON.stringify(data),
                    headers: headers,
                    type: type,
                    contentType: "application/json",
                    dataType: "json",
                    timeout: AJAX_TIMEOUT
                }).done(function(post, textStatus, jqXHR) {
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
                    timeout: AJAX_TIMEOUT
                }).done(function(blog, textStatus, jqXHR) {
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
