define(['./lessc'], function(less) {

	if (['node', 'rhino'].indexOf(less.mode) == -1) {
		throw new Error('Environment not supported by require-less builder: ' + less.mode);
	}

    var readFile = (function() {
    	if (less.mode === 'node') {
    		var fs = require.nodeRequire('fs');
    		var path = require.nodeRequire('path');
    		return function(pathname) {
    			return fs.readFileSync(pathname, 'utf-8');
    		};
    	} else if (less.mode === 'rhino') {
    		return function(pathname) {
    			return readFile(pathname, 'UTF-8');
    		};
    	}
    }());

    var checkPath = (function() {
    	if (less.mode === 'node') {
    		var fs = require.nodeRequire('fs');
    		var path = require.nodeRequire('path');
    		return function(pathname, file) {
    			try {
    				pathname = path.join(pathname, file);
    				fs.statSync(pathname);
    				return pathname;
    			} catch (e) {
    				return null;
    			}
    		};
    	} else if (less.mode === 'rhino') {
    		return function(pathname, file) {
    			var f = new java.io.File(pathname, file);
    			if (f.isFile()) {
    				return f.getPath();
    			} else {
    				return null;
    			}
    		};
    	}
    }());
    
    less.Parser.importer = function (file, paths, callback, env) {
        var pathname, data;

        // TODO: Undo this at some point,
        // or use different approach.
        var paths = [].concat(paths);
        paths.push('.');

        for (var i = 0; i < paths.length; i++) {
        	pathname = checkPath(paths[i], file);
        	if (pathname != null) {
        		break;
        	}
        }
        
        paths = paths.slice(0, paths.length - 1);

        if (!pathname) {
            if (typeof(env.errback) === "function") {
                env.errback(file, paths, callback);
            } else {
                callback({ type: 'File', message: "'" + file + "' wasn't found.\n" });
            }
            return;
        }

        function parseFile(e, data) {
            if (e) return callback(e);
                env.contents = env.contents || {};
                env.contents[pathname] = data;      // Updating top importing parser content cache.
            new(less.Parser)({
                    paths: [path.dirname(pathname)].concat(paths),
                    filename: pathname,
                    contents: env.contents,
                    files: env.files,
                    syncImport: env.syncImport,
                    dumpLineNumbers: env.dumpLineNumbers
            }).parse(data, function (e, root) {
                    callback(e, root, pathname);
            });
        };

        try {
        	readFile(pathname);
            parseFile(null, data);
        } catch (e) {
            parseFile(e);
        }
    }
    return less;
});