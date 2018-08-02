var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var browserSync = require('browser-sync')
var sourcemaps = require('gulp-sourcemaps')
var opn = require('opn')

var path = {
  js: './src/js/*.js',
  html: './*.html',
  src: './',
}

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(uglify())
    .pipe(concat('build.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['js'], function () {
  browserSync.init({
    server: {
      baseDir: path.src
    },
    port: 8080,
    open: false,
  }, function () {
    var homepage = 'http://localhost:8080/'
    opn(homepage)
  })

  gulp.watch(path.js, ['js'])
  gulp.watch([path.html, path.js]).on('change', function () {
    browserSync.reload()
  })
})