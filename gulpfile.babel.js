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

gulp.task('watch', () => {
  gulp.watch([sourcePattern, testPattern], ['test'])
})
