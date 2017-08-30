const gulp = require('gulp')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const gutil = require('gulp-util')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')
const shell = require('gulp-shell')

const pump = require('pump')
const del = require('del')
const path = require('path')
const runSequence = require('run-sequence')
// const sourcemaps = require('gulp-sourcemaps')

/*
- del(['./dist'])  ->  Deletes the dist folder
- del(['./dist/**'])  ->  Deletes everything inside the dist folder
*/

// './file/path/**' should only grab children
const logger = (files) => {
  gutil.log(gutil.colors.blue(`\nThe path is: ${files.join('\n')}\n`))
}
const tsProject = ts.createProject('tsconfig.json')
// --------------------------------------------------------- //
// !First, clean the files
gulp.task('delete-dist', (done) => {
  gutil.log(gutil.colors.red('GULP:delete-dist --> Deleteing the DIST directory'))
  del(['./dist'])
  .then(done)
})
// ! rebuild the Typescript files, put them in the DIST directory
gulp.task('build-ts', () => {
  gutil.log(gutil.colors.blue('\nCompiling TS files...\n'))
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'))
})

gulp.task('watch-ts', () => {
  watch(
    '**/*.ts',
    batch((events) => gulp.start('build-ts'))
  )
})

gulp.task('buildSequence', (done) => {
  runSequence('clean:modules', 'build-ts', done)
})

gulp.task('nodemon:core', () => {
  nodemon({
    script: './dist/server.js',
    watch: '**/*',
    tasks: ['build-ts']
  })
})

gulp.task('watch:testAPI', () => {
  watch('**/*.ts', batch(function (events, done) {
    gulp.start('test', done);
  }));
})

gulp.task('test', ['visual', 'build-ts'], shell.task('yarn run test'))

gulp.task('visual', () => {
  gutil.log(gutil.colors.red('\n\n\n______________ START TESTS____________\n'))
})


// ------------ utils ---------------- //
gulp.task('ts-batcher', () => batch((events) => gulp.start('build-ts')))
