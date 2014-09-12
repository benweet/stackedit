var request = require('request');
var async = require('async');

var validate = function(newDoc) {
	Object.keys(newDoc).forEach(function(key) {
		if(key[0] !== '_' && [
			'updated',
			'tags',
			'title'
		].indexOf(key) === -1) {
			throw({forbidden: 'Unknown document attribute: ' + key});
		}
	});
	var toString = Object.prototype.toString;
	if(toString.call(newDoc._id) !== '[object String]') {
		throw({forbidden: 'ID must be a string.'});
	}
	if(!newDoc._id.match(/[a-zA-Z0-9]{24}/)) {
		throw({forbidden: 'Invalid ID format.'});
	}
	if(newDoc._deleted) {
		if(newDoc.updated !== undefined ||
			newDoc.tags !== undefined ||
			newDoc.title !== undefined ||
			newDoc._attachments !== undefined) {
			throw({forbidden: 'Deleted document must be empty.'});
		}
		return;
	}
	if(toString.call(newDoc.updated) !== '[object Number]') {
		throw({forbidden: 'Update time must be an integer.'});
	}
	if(newDoc.updated > Date.now() + 300000) {
		throw({forbidden: 'Update time is in the future, please check your clock!'});
	}
	if(toString.call(newDoc.title) !== '[object String]') {
		throw({forbidden: 'Title must be a string.'});
	}
	if(!newDoc.title) {
		throw({forbidden: 'Title is empty.'});
	}
	if(newDoc.title.length >= 256) {
		throw({forbidden: 'Title too long.'});
	}
	if(newDoc.tags !== undefined) {
		if(toString.call(newDoc.tags) !== '[object Array]') {
			throw({forbidden: 'Tags must be an array.'});
		}
		if(newDoc.tags.length >= 16) {
			throw({forbidden: 'Too many tags.'});
		}
		newDoc.tags.forEach(function(tag) {
			if(toString.call(tag) !== '[object String]') {
				throw({forbidden: 'Tags must contain strings only.'});
			}
			if(!tag) {
				throw({forbidden: 'Tag is empty.'});
			}
			if(tag.length > 32) {
				throw({forbidden: 'Tag is too long.'});
			}
		});
	}
	var attachment = (newDoc._attachments || {}).content;
	if(!attachment) {
		throw({forbidden: 'Missing attached content.'});
	}
	if(attachment.content_type != 'text/plain') {
		throw({forbidden: 'Invalid content type.'});
	}
	if(Object.keys(newDoc._attachments).length > 1) {
		throw({forbidden: 'Too many attachments.'});
	}
};

var byUpdate = function(doc) {
	if(!doc.tags || !doc.tags.length) {
		emit(doc.updated, null);
	}
};

var byTagAndUpdate = function(doc) {
	doc.tags && doc.tags.forEach(function(tag) {
		emit([
			tag,
			doc.updated
		], null);
	});
};


if(process.argv.length < 3) {
	console.error('Missing URL parameter');
	process.exit(-1);
}

var url = process.argv[2];

var ddocs = [
	{
		path: '/_design/validate',
		body: {
			validate_doc_update: validate.toString()
		}
	},
	{
		path: '/_design/by_update',
		body: {
			views: {
				default: {
					map: byUpdate.toString()
				}
			}
		}
	},
	{
		path: '/_design/by_tag_and_update',
		body: {
			views: {
				default: {
					map: byTagAndUpdate.toString()
				}
			}
		}
	}
];

async.each(ddocs, function(ddoc, cb) {

	request.get(url + ddoc.path, function(err, res) {
		if(res && res.body) {
			ddoc.body._rev = JSON.parse(res.body)._rev;
		}
		request.put({
			url: url + ddoc.path,
			json: true,
			body: ddoc.body
		}, function(err, res) {
			if(err) {
				return cb(res);
			}
			if(res.statusCode >= 300) {
				return cb(res.body);
			}
			cb();
		});
	});

}, function(err) {
	if(err) {
		console.error(err);
	} else {
		console.log('All design documents updated successfully');
	}
});
