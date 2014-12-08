define([], function() {
	var constants = {};
	constants.VERSION = "4.3.2";
	constants.MAIN_URL = "https://stackedit.io/";
	constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-39556145-1";
	constants.GOOGLE_API_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw";
	constants.GOOGLE_DRIVE_APP_ID = "241271498917";
	constants.BITLY_ACCESS_TOKEN = "317e033bfd48cf31155a68a536b1860013b09c4c";
	constants.DEFAULT_FILE_TITLE = "Title";
	constants.DEFAULT_FOLDER_NAME = "New folder";
	constants.EDITOR_DEFAULT_PADDING = 35;
	constants.CHECK_ONLINE_PERIOD = 120000;
	constants.AJAX_TIMEOUT = 30000;
	constants.ASYNC_TASK_DEFAULT_TIMEOUT = 60000;
	constants.ASYNC_TASK_LONG_TIMEOUT = 180000;
	constants.USER_IDLE_THRESHOLD = 300000;
	constants.IMPORT_FILE_MAX_CONTENT_SIZE = 100000;
	constants.IMPORT_IMG_MAX_CONTENT_SIZE = 10000000;
	constants.TEMPORARY_FILE_INDEX = "file.tempIndex";
	constants.WELCOME_DOCUMENT_TITLE = "Hello!";
	constants.DOWNLOAD_IMPORT_URL = "/downloadImport";
	constants.SSH_PUBLISH_URL = '/sshPublish';

	// Site dependent
	constants.BASE_URL = "http://localhost/";
	constants.GOOGLE_CLIENT_ID = '241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com';
	constants.GATEKEEPER_URL = "https://stackedit-gatekeeper-localhost.herokuapp.com/";

	constants.THEME_LIST = {
		"default": "Default"
	};

	return constants;
});
