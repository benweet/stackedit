/* jshint -W015 */
var gulp = require('gulp');
var util = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var requirejs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var manifest = require('gulp-manifest');
var replace = require('gulp-replace');
var bump = require('gulp-bump');
var childProcess = require('child_process');
var runSequence = require('run-sequence');
var fs = require('fs');

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
		'./*.js',
		'./app/**/*.js',
		'./public/res/classes/**/*.js',
		'./public/res/extensions/**/*.js',
		'./public/res/helpers/**/*.js',
		'./public/res/plugins/**/*.js',
		'./public/res/providers/**/*.js',
		'./public/res/*.js'
	])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

/** __________________________________________
 * RequireJS
 */

gulp.task('clean-requirejs', function() {
	return del([
		'./public/res-min/main.js',
		'./public/res-min/require.js'
	]);
});

gulp.task('copy-requirejs', function() {
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
			ascii_only: true
		}
	}))
	.pipe(gulp.dest('./public/res-min/'));
});

/** __________________________________________
 * Less
 */

gulp.task('clean-less', function() {
	return del('./public/res-min/themes');
});

gulp.task('less', function() {
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
	return del('./public/res-min/font');
});

gulp.task('copy-font', function() {
	return gulp.src('./public/res/font/*')
		.pipe(gulp.dest('./public/res-min/font/'));
});

/** __________________________________________
 * Images
 */

gulp.task('clean-img', function() {
	return del('./public/res-min/img');
});

gulp.task('copy-img', function() {
	return gulp.src('./public/res/img/*')
		.pipe(gulp.dest('./public/res-min/img/'));
});

/** __________________________________________
 * cache.manifest
 */

gulp.task('cache-manifest', function() {
	return gulp.src([
				'./public/res-min/**/*.*'
			], {
				base: './public'
			})
		.pipe(manifest({
			hash: true,
			cache: [ '.', 'editor', 'viewer' ],
			filename: 'cache.manifest',
			exclude: 'cache.manifest'
		}))
		.pipe(gulp.dest('./public/'));
});

gulp.task('clean', [
	'clean-requirejs',
	'clean-less',
	'clean-font',
	'clean-img'
]);
gulp.task('build', [
			'jshint',
			'requirejs',
			'less',
			'copy-font',
			'copy-img'
		]);

gulp.task('default', [
			'build',
			'cache-manifest'
		]);

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

function exec(cmd, cb) {
	childProcess.exec(cmd, {cwd: process.cwd()}, function(err, stdout, stderr) {
		if(!err) {
			util.log(stdout, stderr);
		}
		cb(err);
	});
}

gulp.task('git-tag', function(cb) {
	var tag = 'v' + getVersion();
	util.log('Tagging as: ' + util.colors.cyan(tag));
	exec('git add ./public/res-min', function(err) {
		if(err) {
			return cb(err);
		}
		exec('git commit -a -m "Prepare release"', function(err) {
			if(err) {
				return cb(err);
			}
			exec('git tag -a ' + tag + ' -m "Version ' + getVersion() + '"', function(err) {
				if(err) {
					return cb(err);
				}
				exec('git push origin master --tags', cb);
			});
		});
	});
});

function releaseTask(importance) {
	return function(cb) {
		runSequence(
			'bump-' + importance,
			'default',
			'git-tag',
			cb);
	};
}

gulp.task('patch', releaseTask('patch'));
gulp.task('minor', releaseTask('minor'));
gulp.task('major', releaseTask('major'));
