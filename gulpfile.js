const gulp = require('gulp')
const del = require('del')
const cache = require('gulp-cached')
const eslint = require('gulp-eslint')
const help = require('gulp-task-listing')
const ava = require('gulp-ava')
const babel = require('gulp-babel')
const ext = require('gulp-ext')

gulp.task('help', help)

gulp.task('compile', [
  'compile-bin',
  'compile-test'
])

gulp.task('compile-bin', function () {
  return gulp.src('bin/**/*')
  .pipe(cache('bin'))
  .pipe(babel())
  .pipe(ext.crop())
  .pipe(gulp.dest('build/bin'))
})

gulp.task('compile-test', function () {
  return gulp.src('test/*.js')
  .pipe(cache('test'))
  .pipe(babel())
  .pipe(gulp.dest('build/test'))
})

gulp.task('test', ['compile'], function () {
  return gulp.src('build/test/*.js')
  .pipe(ava())
})

gulp.task('lint', function () {
  return gulp.src([
    'gulpfile.js',
    'test/*.js',
    'bin/*'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('clean', function () {
  del(['build'])
})
gulp.task('default', ['lint', 'compile', 'test'])
