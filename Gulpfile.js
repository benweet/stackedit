/* jshint -W015 */
var gulp = require('gulp');
var util = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var requirejs = require('gulp-requirejs');
var bowerRequirejs = require('bower-requirejs');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var bump = require('gulp-bump');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var es = require('event-stream');
var fs = require('fs');
var knox = require('knox');
var zlib = require('zlib');
var mime = require('mime');
var async = require("async");


/** __________________________________________
 * constants.js
 */
function getVersion() {
	var packageJson = JSON.parse(fs.readFileSync(__dirname + '/package.json', {
		encoding: 'utf8'
	}));
	return packageJson.version;
}

gulp.task('constants', function() {
	return gulp.src('./public/res/constants.js')
		.pipe(replace(/constants\.VERSION = .*/, 'constants.VERSION = "' + getVersion() + '";'))
		.pipe(gulp.dest('./public/res/'));
});

/** __________________________________________
 * JSHint
 */

gulp.task('jshint', function() {
	return gulp.src([
		'./**/*.js',
		'!./node_modules/**/*.js',
		'!./public/libs/**/*.js',
		'!./public/res/libs/**/*.js',
		'!./public/res/bower-libs/**/*.js',
		'!./public/res-min/**/*.js'
	])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

/** __________________________________________
 * RequireJS
 */

gulp.task('clean-requirejs', function() {
	return gulp.src([
		'./public/res-min/main.js',
		'./public/res-min/require.js'
	])
		.pipe(clean());
});

gulp.task('copy-requirejs', ['clean-requirejs'], function() {
	return gulp.src('./public/res/bower-libs/requirejs/require.js')
		.pipe(gulp.dest('./public/res-min/'));
});

gulp.task('requirejs', [
	'copy-requirejs',
	'constants'
], function() {
	return requirejs({
		baseUrl: 'public/res',
		name: 'main',
		out: 'main.js',
		mainConfigFile: 'public/res/main.js',
		optimize: 'uglify2',
		inlineText: true,
		paths: {
			mathjax: 'empty:'
		},
		excludeShallow: [
			'css/css-builder',
			'less/lessc-server',
			'less/lessc'
		]
	})
		.pipe(uglify({
			output: {
				beautify: true,
				indent_level: 1
			}
		}))
		.pipe(gulp.dest('./public/res-min/'));
});

gulp.task('bower-requirejs', function(cb) {
	bowerRequirejs({
		config: './public/res/main.js'
	}, function() {
		cb();
	});
});

/** __________________________________________
 * Less
 */

gulp.task('clean-less', function() {
	return gulp.src('./public/res-min/themes')
		.pipe(clean());
});

gulp.task('less', ['clean-less'], function() {
	return gulp.src([
		'./public/res/styles/base.less',
		'./public/res/themes/*.less'
	])
		.pipe(less({
			compress: true
		}))
		.pipe(gulp.dest('./public/res-min/themes/'));
});

/** __________________________________________
 * Fonts
 */

gulp.task('clean-font', function() {
	return gulp.src('./public/res-min/font')
		.pipe(clean());
});

gulp.task('copy-font', ['clean-font'], function() {
	return gulp.src('./public/res/font/*')
		.pipe(gulp.dest('./public/res-min/font/'));
});

/** __________________________________________
 * Images
 */

gulp.task('clean-img', function() {
	return gulp.src('./public/res-min/img')
		.pipe(clean());
});

gulp.task('copy-img', ['clean-img'], function() {
	return gulp.src('./public/res/img/*')
		.pipe(gulp.dest('./public/res-min/img/'));
});

/** __________________________________________
 * cache.manifest
 */

function makeCacheManifest(dest, cdn) {
	cdn = cdn || '';
	return gulp.src('./public/cache.manifest')
		.pipe(replace(/(#Date ).*/, '$1' + Date()))
		.pipe(inject(gulp.src('./res-min/**/*.*', {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_resources',
				endtag: '# end_inject_resources',
				ignoreExtensions: true,
				transform: function(filepath) {
					return cdn + filepath.substring(1);
				}
			}))
		.pipe(inject(gulp.src([
				'./MathJax.js',
				'./config/Safe.js',
				'./config/TeX-AMS_HTML.js',
				'./images/CloseX-31.png',
				'./images/MenuArrow-15.png',
				'./jax/output/HTML-CSS/jax.js',
				'./extensions/**/*.*',
				'./fonts/HTML-CSS/TeX/woff/**/*.*',
				'./jax/element/**/*.*',
				'./jax/output/HTML-CSS/autoload/**/*.*',
				'./jax/output/HTML-CSS/fonts/TeX/**/*.*',
				'./jax/output/HTML-CSS/fonts/STIX/**/*.*'
			], {
				read: false,
				cwd: './public/res/bower-libs/MathJax'
			}),
			{
				starttag: '# start_inject_mathjax',
				endtag: '# end_inject_mathjax',
				ignoreExtensions: true,
				transform: function(filepath) {
					if(filepath == '/MathJax.js') {
						filepath += '?config=TeX-AMS_HTML';
					}
					else {
						filepath += '?rev=2.4-beta-2';
					}
					return '//cdn.mathjax.org/mathjax/2.4-latest' + filepath;
				}
			}))
		.pipe(gulp.dest(dest));
}

gulp.task('cache-manifest', function() {
	return makeCacheManifest('./public/');
});

gulp.task('cache-manifest-stackedit-io', function() {
	return makeCacheManifest('./public-stackedit.io/', '//cdn.stackedit.io/' + getVersion() + '/');
});

gulp.task('clean', [
	'clean-requirejs',
	'clean-less',
	'clean-font',
	'clean-img'
]);
gulp.task('default', function(cb) {
	runSequence([
			'jshint',
			'requirejs',
			'less',
			'copy-font',
			'copy-img'
		],
		'cache-manifest',
		'cache-manifest-stackedit-io',
		cb);
});

function bumpTask(importance) {
	return function() {
		return gulp.src([
			'./package.json',
			'./bower.json'
		])
			.pipe(bump({type: importance}))
			.pipe(gulp.dest('./'));
	};
}

gulp.task('bump-patch', bumpTask('patch'));
gulp.task('bump-minor', bumpTask('minor'));
gulp.task('bump-major', bumpTask('major'));

gulp.task('git-add', function() {
	return gulp.src('./public/res-min/**/*')
		.pipe(git.add());
});

gulp.task('git-tag', function() {
	var version = getVersion();
	var message = 'Version ' + version;
	var tag = 'v' + version;
	git.commit(message, { args: '-a' }).end();
	util.log('Tagging as: ' + util.colors.cyan(tag));
	git.tag(tag, message);
	git.push('origin', 'master', { args: ' --tags' });
});

function releaseTask(importance) {
	return function(cb) {
		runSequence(
				'bump-' + importance,
			'default',
			'git-add',
			'git-tag',
			cb);
	};
}

gulp.task('patch', releaseTask('patch'));
gulp.task('minor', releaseTask('minor'));
gulp.task('major', releaseTask('major'));

gulp.task('deploy-cdn', function() {
	var s3Client = knox.createClient({
		key: process.env.STACKEDIT_AWS_ACCESS_KEY_ID,
		secret: process.env.STACKEDIT_AWS_SECRET_KEY,
		bucket: 'cdn.stackedit.io'
	});
	var zippedFormat = {
		'text/plain': true,
		'text/html': true,
		'text/css': true,
		'text/cache-manifest': true,
		'application/javascript': true,
		'image/svg+xml': true
	};
	function upload(file, cb) {
		var headers = {
			'x-amz-acl': 'public-read',
			'Content-Length': file.contents.length,
			'Content-Type': file.contentType,
			'Cache-Control': 'max-age=' + file.maxAge
		};
		file.contentEncoding && (headers['Content-Encoding'] = file.contentEncoding);
		s3Client.putBuffer(file.contents, file.dest + file.relative, headers, cb);
	}
	var queue = async.queue(upload, 16).push;
	var version = getVersion();
	return gulp.src([
		'./**/*',
		'!./res/bower-libs/**/*'
	], {
		cwd: './public',
		buffer: false
	})
		.pipe(es.map(function(file, cb) {
			if(!file.contents) {
				return cb(null, file);
			}
			file.contentType = mime.lookup(file.path);
			var stream = file.contents;
			if(zippedFormat.hasOwnProperty(file.contentType)) {
				var gzip = zlib.createGzip();
				stream = stream.pipe(gzip);
				file.contentEncoding = 'gzip';
			}
			var bufs = [];
			stream.on('data', function(d) {
				bufs.push(d);
			});
			stream.on('error', function(err) {
				cb(err);
			});
			stream.on('end', function() {
				file.contents = Buffer.concat(bufs);
				file.dest = 'latest/';
				file.maxAge = 86400;
				queue(file, function(err) {
					file.dest = version + '/';
					file.maxAge = 31536000;
					err ? cb(err) : queue(file, cb);
				});
			});
		}));
});