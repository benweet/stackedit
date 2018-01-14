const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');

const prismScripts = [
  'prismjs/components/prism-core',
  'prismjs/components/prism-markup',
  'prismjs/components/prism-clike',
  'prismjs/components/prism-c',
  'prismjs/components/prism-javascript',
  'prismjs/components/prism-css',
  'prismjs/components/prism-ruby',
  'prismjs/components/prism-cpp',
].map(require.resolve);
prismScripts.push(
  path.join(path.dirname(require.resolve('prismjs/components/prism-core')), 'prism-!(*.min).js'));

gulp.task('build-prism', () => gulp.src(prismScripts)
  .pipe(concat('prism.js'))
  .pipe(gulp.dest(path.dirname(require.resolve('prismjs')))));
