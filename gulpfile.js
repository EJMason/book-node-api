const gulp = require('gulp')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const gutil = require('gulp-util')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')

const pump = require('pump')
const del = require('del')
const path = require('path')
const runSequence = require('run-sequence')
// const sourcemaps = require('gulp-sourcemaps')

const tsProject = ts.createProject('tsconfig.json')
// --------------------------------------------------------- //

gulp.task('build-ts', ['clean:modules'], () => {
  gutil.log(gutil.colors.blue('\nCompiling TS files...\n'))
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'))
})

gulp.task('watch-ts', () => {
  watch(
    'src/**/*.ts',
    batch((events) => gulp.start('build-ts'))
  )
})

gulp.task('buildSequence', (done) => {
  runSequence('clean:modules', 'build-ts', 'move:logger', done)
})

gulp.task('nodemon:core', () => {
  nodemon({
    script: './dist/server.js',
    watch: './src',
    env: {
      NODE_ENV: 'development'
    },
    tasks: ['buildSequence']
  })
})

gulp.task('nodemon', (done) => {
  runSequence('buildSequence', 'nodemon:core', done)
})

// ------------ utils ---------------- //
gulp.task('move:logger', () => {
  return gulp.src('dist/util/logger.js')
    .pipe(gulp.dest('node_modules/'))
})
gulp.task('ts-batcher', () => batch((events) => gulp.start('build-ts')))
gulp.task('clean:modules', () => del(['node_modules/logger.js']))