const gulp = require('gulp')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const gutil = require('gulp-util')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('default', () => {
  console.log('good to go')
})

gulp.task('build-ts', () => {
  gutil.log(gutil.colors.blue('\nCompiling TS files...\n'))

  var tsResult = tsProject.src()
    .pipe(tsProject())

  return tsResult.js.pipe(gulp.dest('dist'))
})

gulp.task('watch-ts', () => {
  watch('src/**/*.ts', batch((events, done) => {
    gulp.start('build-ts', done)
  }))
})