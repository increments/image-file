import gulp from 'gulp'

let sourcePattern = 'src/*.js'
let testPattern = 'test/*.js'

gulp.task('compile', () => {
  let babel = require('gulp-babel')
  return gulp.src(sourcePattern)
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('test', () => {
  let mocha = require('gulp-mocha')
  return gulp.src(testPattern)
    .pipe(mocha())
})

gulp.task('browser-test', ['bundle-tests'], () => {
  let child_process = require('child_process')
  child_process.spawn('open', ['test/test.html'])
})

gulp.task('bundle-tests', () => {
  let glob = require('glob')
  let browserify = require('browserify')
  let babelify = require('babelify')
  let source = require('vinyl-source-stream')

  let testPaths = glob.sync(testPattern);
  testPaths.unshift('test/support/browserify.js')

  return browserify(testPaths, { debug: true })
    .transform(babelify.configure({ sourceMapRelative: __dirname }))
    .bundle()
    .pipe(source('test-bundle.js'))
    .pipe(gulp.dest('tmp'))
})

// Serialize fixture image files as JSON because browsers have no access to the file system.
gulp.task('serialize-fixtures', () => {
  let glob = require('glob')
  let fs = require('fs')
  let path = require('path')

  let imagePaths = glob.sync('test/fixtures/*')
  let fixtures = {}

  for (let imagePath of imagePaths) {
    let buffer = fs.readFileSync(imagePath)
    let fixtureName = path.basename(imagePath)
    fixtures[fixtureName] = buffer.toJSON()
  }

  fs.writeFileSync('test/fixtures.json', JSON.stringify(fixtures))
})

gulp.task('watch', () => {
  gulp.watch([sourcePattern, testPattern], ['test'])
})
