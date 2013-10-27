var VERSION = "2.2.3";

var MAIN_URL = "https://stackedit.io/";
var GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-39556145-1";
var GOOGLE_API_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw";
var GOOGLE_DRIVE_APP_ID = "241271498917";
var DROPBOX_APP_KEY = "lq6mwopab8wskas";
var DROPBOX_APP_SECRET = "851fgnucpezy84t";
var BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c";
var DEFAULT_FILE_TITLE = "Title";
var DEFAULT_FOLDER_NAME = "New folder";
var GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document";
var EDITOR_DEFAULT_PADDING = 15;
var CHECK_ONLINE_PERIOD = 120000;
var AJAX_TIMEOUT = 30000;
var ASYNC_TASK_DEFAULT_TIMEOUT = 60000;
var ASYNC_TASK_LONG_TIMEOUT = 180000;
var SYNC_PERIOD = 180000;
var USER_IDLE_THRESHOLD = 300000;
var IMPORT_FILE_MAX_CONTENT_SIZE = 100000;
var IMPORT_IMG_MAX_CONTENT_SIZE = 10000000;
var TEMPORARY_FILE_INDEX = "file.tempIndex";
var WELCOME_DOCUMENT_TITLE = "Welcome document";
var DOWNLOAD_PROXY_URL = "https://stackedit-download-proxy.herokuapp.com/";
var PICASA_PROXY_URL = "https://stackedit-picasa-proxy.herokuapp.com/";
var SSH_PROXY_URL = "https://stackedit-ssh-proxy.herokuapp.com/";
var HTMLTOPDF_URL = "https://stackedit-htmltopdf.herokuapp.com/";

// Use by Google's client.js
var delayedFunction = undefined;
function runDelayedFunction() {
    if(delayedFunction !== undefined) {
        delayedFunction();
    }
}

// Site dependent
var BASE_URL = "http://localhost/";
var GOOGLE_CLIENT_ID = '241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com';
var GITHUB_CLIENT_ID = 'e47fef6055344579799d';
var GATEKEEPER_URL = "https://stackedit-gatekeeper-localhost.herokuapp.com/";
var TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy-local.herokuapp.com/";
var WORDPRESS_CLIENT_ID = '23361';
var WORDPRESS_PROXY_URL = "https://stackedit-io-wordpress-proxy.herokuapp.com/";

if(location.hostname.indexOf("stackedit.io") === 0) {
    BASE_URL = MAIN_URL;
    GOOGLE_CLIENT_ID = '241271498917-t4t7d07qis7oc0ahaskbif3ft6tk63cd.apps.googleusercontent.com';
    GITHUB_CLIENT_ID = '710fc67886ab1ae8fee6';
    GATEKEEPER_URL = "https://stackedit-io-gatekeeper.herokuapp.com/";
    TUMBLR_PROXY_URL = "https://stackedit-io-tumblr-proxy.herokuapp.com/";
}

if(location.hostname.indexOf("benweet.github.io") === 0) {
    BASE_URL = 'http://benweet.github.io/stackedit/';
    GOOGLE_CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
    GITHUB_CLIENT_ID = 'fa0d09514da8377ee32e';
    GATEKEEPER_URL = "https://stackedit-gatekeeper.herokuapp.com/";
    TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy.herokuapp.com/";
    WORDPRESS_CLIENT_ID = '3185';
    WORDPRESS_PROXY_URL = "https://stackedit-wordpress-proxy.herokuapp.com/";
}

if(location.hostname.indexOf("benweet.insomnia247.nl") === 0) {
    BASE_URL = "http://benweet.insomnia247.nl/stackedit/";
    GOOGLE_CLIENT_ID = '241271498917-52hae7a08hv7ltenv7km8h7lghno9sk3.apps.googleusercontent.com';
    GITHUB_CLIENT_ID = 'd2943d6074b2d9c4a830';
    GATEKEEPER_URL = "https://stackedit-gatekeeper-insomnia.herokuapp.com/";
    TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy-beta.herokuapp.com/";
}

var THEME_LIST = {
    "default": "Default",
    "blue-gray": "Blue-Gray",
    "night": "Night",
    "school": "School",
};
