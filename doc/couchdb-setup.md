### Pre-requisites

- **CouchDB 1.5 or later**, because of the use of `POST /{db}/_changes`,
- **Node.js**, to load the design documents in the database.

> **Note:**
> 
> - In order to work with https://stackedit.io, your database has to be accessible through HTTPS. You can use a free hosting service like [Smileupps](https://www.smileupps.com/) or [configure your own instance to use SSL](http://docs.couchdb.org/en/latest/config/http.html#ssl).
> 
> - StackEdit doesn't deal with user access rights, but you can still set permissions for your database and configure StackEdit to connect to it using URL like this: `https://username:password@instance.smileupps.com/documents`.
> 
> - It's up to you to trigger the database compaction, or to keep the full history of your documents.


### Enable CORS

Add the following key/value pairs to your CouchDB configuration:

```
[httpd]
enable_cors = true

[cors]
origins = http://localhost, https://stackedit.io
```


### Create the database

```bash
curl -X PUT https://instance.smileupps.com/documents
```

### Insert the design documents

```bash
curl -O https://raw.githubusercontent.com/benweet/stackedit/master/couchdb/setup.js
node setup.js https://instance.smileupps.com/documents
```

Or directly:

```bash
curl https://raw.githubusercontent.com/benweet/stackedit/master/couchdb/setup.js | node /dev/stdin https://instance.smileupps.com/documents
```

### Update StackEdit settings

To configure StackEdit to use your CouchDB instance, change the in URL in `Menu` > `Settings` > `Advanced` > `CouchDB URL` to `https://instance.smileupps.com/documents`.


> Written with [StackEdit](https://stackedit.io/).