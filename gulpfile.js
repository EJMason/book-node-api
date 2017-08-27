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

const PATHS = {
  UTIL_DEST: 'node_modules'
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
  // delete the existing tools folder
  return del([
    'node_modules/my.config/**',
    'node_modules/my.logger/**',
  ])
})

gulp.task('build:utils', ['clean:utils'], done => {
  gutil.log(gutil.colors.blue('\nAdding utilities...\n'))
  pump([
    gulp.src(['util/**']),
    gulp.dest(PATHS.UTIL_DEST)
  ], done)
})

gulp.task('dev:nodemon', () => {
  nodemon({
    script: './dist/server.js',
    env: {
      NODE_ENV: 'dev'
    },
    tasks: ['build:utils']
  })
})