const gulp = require('gulp')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const gutil = require('gulp-util')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')
const pump = require('pump')
// const sourcemaps = require('gulp-sourcemaps')

const tsProject = ts.createProject('tsconfig.json')

const PATHS = {
  UTIL_DEST: 'node_modules/my'
}

// --------------------------------------------------------- //
gulp.task('build-ts', () => {
  gutil.log(gutil.colors.blue('\nCompiling TS files...\n'))
  var tsResult = tsProject.src()
    // .pipe(sourcemaps.init())
    .pipe(tsProject())

  return tsResult.js
    // .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch-ts', () => {
  watch('src/**/*.ts', batch((events, done) => {
    gulp.start('build-ts', done)
  }))
})

// -------------------------------------------------- //
gulp.task('clean:utils', () => {
  gutil.log(gutil.colors.blue('\nRemoving old config files...\n'))
  // move custom tools to node modules
  // first delete the existing tools folder
  return gulp.src(PATHS.UTIL_DEST, {read: false})
    .pipe(clean())
    // move the utilites to node_modules for easier import
})

gulp.task('build:utils', ['clean:utils'], done => {
  gutil.log(gutil.colors.blue('\nAdding utilities...\n'))
  pump([
    gulp.src(['util/**']),
    gulp.dest(PATHS.UTIL_DEST)
  ], done)
})