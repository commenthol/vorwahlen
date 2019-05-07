var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    preprocess = require('gulp-preprocess');

var context = {
  context: {
    "1": true, // uncomment lines to exclude phone data
    "33": true,
    "41": true,
    "43": true,
    "44": true,
    "49": true,
  }
};

function build () {
  require('./build/index')();
  return gulp.src('./src/vorwahlen.js')
    .pipe(preprocess(context))
    .pipe(gulp.dest('./'))
    .pipe(rename(function(path){
      path.basename += "-min"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
}

exports.default = gulp.series(build)
