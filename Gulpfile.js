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
		.pipe(inject(gulp.src([
				'./res-min/**/*.*',
				'./libs/MathJax/MathJax.js',
				'./libs/MathJax/config/Safe.js',
				'./libs/MathJax/config/TeX-AMS_HTML.js',
				'./libs/MathJax/images/CloseX-31.png',
				'./libs/MathJax/images/MenuArrow-15.png',
				'./libs/MathJax/jax/output/HTML-CSS/jax.js',
				'./libs/MathJax/extensions/**/*.*',
				'./libs/MathJax/fonts/HTML-CSS/TeX/woff/**/*.*',
				'./libs/MathJax/jax/element/**/*.*',
				'./libs/MathJax/jax/output/HTML-CSS/autoload/**/*.*',
				'./libs/MathJax/jax/output/HTML-CSS/fonts/TeX/**/*.*',
				'./libs/MathJax/jax/output/HTML-CSS/fonts/STIX/**/*.*'
			], {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_resources',
				endtag: '# end_inject_resources',
				ignoreExtensions: true,
				transform: function(filepath) {
					filepath = filepath.substring(1);
					if(filepath == 'libs/MathJax/MathJax.js') {
						filepath += '?config=TeX-AMS_HTML';
					}
					return cdn + filepath;
				}
			}))
		.pipe(gulp.dest(dest));
}

gulp.task('cache-manifest', function() {
	return makeCacheManifest('./public/');
});

gulp.task('cache-manifest-stackedit-io', function() {
	return makeCacheManifest('./public-stackedit.io/', 'https://cdn.stackedit.io/v' + getVersion() + '/');
});

gulp.task('bower-requirejs', function(cb) {
	bowerRequirejs({
		config: './public/res/main.js'
	}, function() {
		cb();
	});
});

gulp.task('clean', [
	'clean-requirejs',
	'clean-less',
	'clean-font',
	'clean-img'
]);
gulp.task('default', function() {
	return runSequence([
			'jshint',
			'requirejs',
			'less',
			'copy-font',
			'copy-img'
		],
		'cache-manifest');
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

gulp.task('bump', bumpTask('patch'));
gulp.task('bump-patch', bumpTask('patch'));
gulp.task('bump-minor', bumpTask('minor'));
gulp.task('bump-major', bumpTask('major'));

gulp.task('commit', function() {
	return gulp.src('./public/res-min/**/*')
		.pipe(git.add())
		.pipe(git.commit('Prepare release', {args: '-A'}));
});

gulp.task('tag', function() {
	var tag = 'v' + getVersion();
	util.log('Tagging as: ' + util.colors.cyan(tag));
	git.tag(tag, 'Version ' + getVersion());
});

gulp.task('push', function() {
	git.push('origin', 'master', { args: ' --tags' }).end();
});

function releaseTask(importance) {
	return function() {
		return runSequence(
				'bump-' + importance,
			'default',
			'commit',
			'tag',
			'push');
	};
}

gulp.task('release', releaseTask('patch'));
gulp.task('release-patch', releaseTask('patch'));
gulp.task('release-minor', releaseTask('minor'));
gulp.task('release-major', releaseTask('major'));