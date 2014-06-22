define([], function() {
    var constants = {};
    constants.VERSION = "3.1.14";
    
    constants.MAIN_URL = "http://mospaw.com/edit/public/";
    constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-39556145-1";
    constants.GOOGLE_API_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw";
    constants.GOOGLE_DRIVE_APP_ID = "241271498917";
    constants.DROPBOX_APP_KEY = "lq6mwopab8wskas";
    constants.DROPBOX_APP_SECRET = "851fgnucpezy84t";
    constants.DROPBOX_RESTRICTED_APP_KEY = "sw0hlixhr8q1xk0";
    constants.DROPBOX_RESTRICTED_APP_SECRET = "1r808p2xygs6lbg";
    constants.BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c";
    constants.DEFAULT_FILE_TITLE = "Title";
    constants.DEFAULT_FOLDER_NAME = "New folder";
    constants.GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document";
    constants.EDITOR_DEFAULT_PADDING = 15;
    constants.CHECK_ONLINE_PERIOD = 120000;
    constants.AJAX_TIMEOUT = 30000;
    constants.ASYNC_TASK_DEFAULT_TIMEOUT = 60000;
    constants.ASYNC_TASK_LONG_TIMEOUT = 180000;
    constants.USER_IDLE_THRESHOLD = 300000;
    constants.IMPORT_FILE_MAX_CONTENT_SIZE = 100000;
    constants.IMPORT_IMG_MAX_CONTENT_SIZE = 10000000;
    constants.TEMPORARY_FILE_INDEX = "file.tempIndex";
    constants.WELCOME_DOCUMENT_TITLE = "Welcome document";
    constants.DOWNLOAD_PROXY_URL = "https://stackedit-download-proxy.herokuapp.com/";
    constants.PICASA_PROXY_URL = "https://stackedit-picasa-proxy.herokuapp.com/";
    constants.SSH_PROXY_URL = "https://stackedit-ssh-proxy.herokuapp.com/";
    constants.HTMLTOPDF_URL = "https://stackedit-htmltopdf.herokuapp.com/";
    
    // Site dependent
    constants.BASE_URL = "http://localhost/";
    constants.GOOGLE_CLIENT_ID = '241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com';
    constants.GITHUB_CLIENT_ID = 'e47fef6055344579799d';
    constants.GATEKEEPER_URL = "https://stackedit-gatekeeper-localhost.herokuapp.com/";
    constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy-local.herokuapp.com/";
    constants.WORDPRESS_CLIENT_ID = '23361';
    constants.WORDPRESS_PROXY_URL = "https://stackedit-io-wordpress-proxy.herokuapp.com/";
    
    if(location.hostname.indexOf("stackedit.io") === 0) {
        constants.BASE_URL = constants.MAIN_URL;
        constants.GOOGLE_CLIENT_ID = '241271498917-t4t7d07qis7oc0ahaskbif3ft6tk63cd.apps.googleusercontent.com';
        constants.GITHUB_CLIENT_ID = '710fc67886ab1ae8fee6';
        constants.GATEKEEPER_URL = "https://stackedit-io-gatekeeper.herokuapp.com/";
        constants.TUMBLR_PROXY_URL = "https://stackedit-io-tumblr-proxy.herokuapp.com/";
    }
    else if(location.hostname.indexOf("benweet.github.io") === 0) {
        constants.BASE_URL = 'http://benweet.github.io/stackedit/';
        constants.GOOGLE_CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
        constants.GITHUB_CLIENT_ID = 'fa0d09514da8377ee32e';
        constants.GATEKEEPER_URL = "https://stackedit-gatekeeper.herokuapp.com/";
        constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy.herokuapp.com/";
        constants.WORDPRESS_CLIENT_ID = '3185';
        constants.WORDPRESS_PROXY_URL = "https://stackedit-wordpress-proxy.herokuapp.com/";
    }
    else if(location.hostname.indexOf("benweet.insomnia247.nl") === 0) {
        constants.BASE_URL = "http://benweet.insomnia247.nl/stackedit/";
        constants.GOOGLE_CLIENT_ID = '241271498917-52hae7a08hv7ltenv7km8h7lghno9sk3.apps.googleusercontent.com';
        constants.GITHUB_CLIENT_ID = 'd2943d6074b2d9c4a830';
        constants.GATEKEEPER_URL = "https://stackedit-gatekeeper-insomnia.herokuapp.com/";
        constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy-beta.herokuapp.com/";
    }
    else if(location.hostname.indexOf("mospaw.com") === 0) {
        constants.BASE_URL = "http://mospaw.com/edit/public/";
        constants.GOOGLE_CLIENT_ID = '50371628984-k3drccemss9o4pacde8dkes9jdds438i.apps.googleusercontent.com';
    }
    
    constants.THEME_LIST = {
        "default": "Default",
        "gray": "Gray",
        "night": "Night",
        "school": "School",
        "clean": "Clean Theme",
    };
    
    return constants;
});
