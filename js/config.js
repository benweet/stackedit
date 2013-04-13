var GOOGLE_SCOPES = [ "https://www.googleapis.com/auth/drive.install",
	"https://www.googleapis.com/auth/drive",
	"https://www.googleapis.com/auth/blogger" ];
var GOOGLE_DRIVE_APP_ID = "241271498917";
var DROPBOX_APP_KEY = "lq6mwopab8wskas";
var DROPBOX_APP_SECRET = "851fgnucpezy84t";
var DEFAULT_FILE_TITLE = "Title";
var GDRIVE_DEFAULT_FILE_TITLE = "New Markdown document";
var CHECK_ONLINE_PERIOD = 60000;
var AJAX_TIMEOUT = 10000;
var ASYNC_TASK_DEFAULT_TIMEOUT = 30000;
var AUTH_POPUP_TIMEOUT = 90000;
var SYNC_PERIOD = 180000;
var USER_IDLE_THRESHOLD = 300000;
var SYNC_PROVIDER_GDRIVE = "sync.gdrive.";
var SYNC_PROVIDER_DROPBOX = "sync.dropbox.";
var PUBLISH_PROVIDER_GITHUB = "github";
var PUBLISH_PROVIDER_BLOGGER = "blogger";

// Use by Google's client.js
var delayedFunction = undefined;
function runDelayedFunction() {
	if (delayedFunction !== undefined) {
		delayedFunction();
	}
}

// Site dependent
var BASE_URL = "http://localhost/";
var GOOGLE_KEY = "AIzaSyAeCU8CGcSkn0z9js6iocHuPBX4f_mMWkw";
var GOOGLE_CLIENT_ID = '241271498917-lev37kef013q85avc91am1gccg5g8lrb.apps.googleusercontent.com';
var GITHUB_CLIENT_ID = 'e47fef6055344579799d';
var GATEKEEPER_URL = "http://stackedit-gatekeeper-localhost.herokuapp.com/";

if(location.hostname.indexOf("benweet.github.io") === 0) {
	BASE_URL = "http://benweet.github.io/stackedit/";
	GOOGLE_KEY = "AIzaSyB1Bc1wI_YUWkkOR-5Gri5BFuypgZl0Sxc";
	GOOGLE_CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
	GITHUB_CLIENT_ID = 'fa0d09514da8377ee32e';
	GATEKEEPER_URL = "http://stackedit-gatekeeper.herokuapp.com/";
}
