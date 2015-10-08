import gulp from 'gulp'

gulp.task('compile', () => {
  let babel = require('gulp-babel')
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})
