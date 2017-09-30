const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const spawn = require('child_process').spawn;
const util = require('gulp-util');
const version = require('./package').version;

const prismScripts = [
  'prismjs/components/prism-core',
  'prismjs/components/prism-markup',
  'prismjs/components/prism-clike',
  'prismjs/components/prism-c',
  'prismjs/components/prism-javascript',
  'prismjs/components/prism-css',
  'prismjs/components/prism-ruby',
].map(require.resolve);
prismScripts.push(
  path.join(path.dirname(require.resolve('prismjs/components/prism-core')), 'prism-!(*.min).js'));

function exec(commands, cb) {
  if (commands.length === 0) {
    cb();
    return;
  }
  let file;
  let args;
  const command = commands.shift();
  const options = {
    cwd: process.cwd(),
  };
  // Credit: https://github.com/nodejs/node/blob/master/lib/child_process.js
  if (process.platform === 'win32') {
    file = process.env.comspec || 'cmd.exe';
    args = ['/s', '/c', `"${command}"`];
    options.windowsVerbatimArguments = true;
  } else {
    file = '/bin/sh';
    args = ['-c', command];
  }
  const proc = spawn(file, args, options);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  proc.on('error', (error) => {
    util.log(util.colors.red(error));
    cb(error);
  });
  proc.on('exit', (code) => {
    if (code) {
      cb(code);
    } else {
      exec(commands, cb);
    }
  });
}

gulp.task('build-prism', () => gulp.src(prismScripts)
.pipe(concat('prism.js'))
.pipe(gulp.dest(path.dirname(require.resolve('prismjs')))));

gulp.task('tag', (cb) => {
  const tag = `v${version}`;
  util.log(`Tagging as: ${util.colors.cyan(tag)}`);
  exec([
    'git add package.json',
    'git commit -m "Prepare release"; true', // Ignore "no changes added to commit" error
    `git tag -a ${tag} -m "Version ${version}"`,
    'git push origin master --tags',
    'npm publish',
  ], cb);
});
