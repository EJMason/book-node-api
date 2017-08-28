const gulp = require('gulp')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const gutil = require('gulp-util')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')

const pump = require('pump')
const del = require('del')
// const sourcemaps = require('gulp-sourcemaps')

const tsProject = ts.createProject('tsconfig.json')
// --------------------------------------------------------- //
gulp.task('build-ts', () => {
  gutil.log(gutil.colors.blue('\nCompiling TS files...\n'))
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist2'))
})

gulp.task('watch-ts', () => {
  watch(
    'src/**/*.ts',
    batch((events) => gulp.start('build-ts'))
  )
})

gulp.task('ts-batcher', () => batch((events) => gulp.start('build-ts')))

/*
* Nodemon now compiles TS files too!
*/
gulp.task('dev:nodemon', () => {
  nodemon({
    script: './dist/server.js',
    env: {
      NODE_ENV: 'dev'
    },
    tasks: ['ts-batcher']
  })
})