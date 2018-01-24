### Pre-requisites

- CouchDB 0.11 or later,
- In order to work with https://stackedit.io, your database needs to be accessible over HTTPS.

> **Tip:** [Smileupps](https://www.smileupps.com/) provide free CouchDB hosting.

### Enable CORS

Add the following key/value pairs to your CouchDB configuration:

```
[httpd]
enable_cors = true

[cors]
origins = https://stackedit.io
```


### Create the database

```bash
curl -X PUT https://instance.smileupps.com/stackedit-workspace
```

> You may want to restrict access to the database by [specifying members](http://docs.couchdb.org/en/latest/api/database/security.html).
