**Where is my data stored?**

If your workspace is not synced, your files are only stored inside your browser (using the [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)) and are not stored anywhere else.

We recommend syncing your workspace to make sure files won't be lost in case your browser data is cleared.

**Where is my data stored once I sync my workspace?**

If you sign in with Google, your main workspace will be stored in Google Drive (in your [app data folder](https://developers.google.com/drive/v3/web/appdata)).

If you open a Google Drive workspace, the files in the workspace will be stored inside a Google Drive folder which you can share with other users.

If you open a CouchDB workspace, the files in the workspace will be stored in the CouchDB database which can be hosted on premises for privacy concerns.

**Can StackEdit access my data without telling me?**

StackEdit is a frontend application. The access tokens issued by Google, Dropbox, GitHub... are stored in your browser and are not sent to any backend or 3^rd^ parties so your data won't be accessed by anyone.
