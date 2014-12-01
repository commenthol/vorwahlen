var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    preprocess = require('gulp-preprocess');
 
var context = {
  context: {
    "1": true, // uncomment lines to exclude phone data
    "33": true,
    "41": true,
    "43": true,
    "49": true,
  }
};

gulp.task('src', function() {
  require('./build/index')();
  gulp.src('./src/vorwahlen.js')
    .pipe(preprocess(context))
    .pipe(gulp.dest('./'))
    .pipe(rename(function(path){
      path.basename += "-min"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('jshint', function() {
  gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function () {
  gulp.src('test/*', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['jshint', 'src', 'mocha']);
