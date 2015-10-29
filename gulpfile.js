var gulp = require('gulp');
var gutil = require('gulp-util');
var jasmine = require('gulp-jasmine');
var mocha = require('gulp-mocha');
var coffee = require('gulp-coffee');
var run = require('gulp-run');
var foreach = require('gulp-foreach');
var tap = require('gulp-tap');
var docco = require("gulp-docco");
var exit = require('gulp-exit');

require('coffee-script/register');

var paths = {
  coffee: ['spec/**/*.coffee', 'lib/*.coffee']
};

gulp.task('compile', function() {
  gulp.src('test/mocha/coffee/*.coffee')
    .pipe(coffee({bare: true})).on('error', gutil.log)
    .pipe(gulp.dest('test/mocha/js/'));
});


gulp.task('test',['test-js','test-coffee']);
gulp.task('test-js', () => {
  return gulp.src('test/mocha/*.js', { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('expect.js')
      }
    }))
});

gulp.task('test-coffee', ["compile"], () => {
  gulp.src('test/mocha/js/*.js', { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('expect.js')
      }
    }))
});


gulp.task('doc', function() {
  //return gulp.src("./lib/*.js")
  return gulp.src(["./lib/*.js","./examples/*.js","./test/*.js"])
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});


gulp.task('default', ['test','doc']);

// gulp.task('test', function() {
//   run('mocha --harmony -R spec').exec();
//   //run('mocha --harmony -R spec test/*.js').exec();
// });
// gulp.task('mocha-test', function() {
//   run('mocha --harmony -R spec').exec();
//   //run('mocha --harmony -R spec test/*.js').exec();
// });
// gulp.task('mocha-test', function() {
//   return gulp.src(['test/mocha/*.js'], { read: false })
//     .pipe(mocha({
//       reporter: 'spec',
//       globals: {
//         should: require('expect.js')
//       }
//     }));
// });

// gulp.task('jasmine-test', function () {
//   return gulp.src('spec/*.spec.js')
//     .pipe(jasmine({
// 	  includeStackTrace: true,
// 	  timeout : 5000
// 	})).on('error', gutil.log);
// });



// gulp.task('default', ['mocha-test']);
