const del = require('del');
const merge2 = require('merge2');
const through2 = require('through2');
const gulp = require('gulp');
const less = require('gulp-less');
const ts = require('gulp-typescript');


gulp.task('build', function() {
  del.sync(['dist']);
  const lessStream = gulp
    .src(['src/**/*.less'])
    .pipe(less())
    .pipe(gulp.dest('dist'));
  const tsResult = gulp
    .src(['src/**/*.tsx', 'src/**/*.ts', 'typings/**/*.d.ts'])
    .pipe(ts(require('./tsconfig.json').compilerOptions));
  const tsStream = tsResult.js.pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(content.replace(/\.less/g, '.css'));
        this.push(file);
        next();
      } else {
        next();
      }
    })
  ).pipe(gulp.dest('dist'));
  const dtsStream = tsResult.dts.pipe(gulp.dest('dist'));
  return merge2([lessStream, tsStream, dtsStream]);
});
