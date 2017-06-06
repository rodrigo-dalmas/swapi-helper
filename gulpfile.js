var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  del = require('del'),
  sass = require('gulp-sass'),
  karma = require('karma'),
  jshint = require('gulp-jshint'),
  spritesmith = require('gulp.spritesmith'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
  del([
    'dist/*'
  ], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() {
  
  var install = require("gulp-install");
  
  return gulp.src(['./bower.json'])
    .pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-css', function() {
  return gulp.src('./app/css/*')
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(gulp.dest('./dist/css'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-template-cache', function() {
  
  var ngHtml2Js = require("gulp-ng-html2js"),
    concat = require("gulp-concat");
  
  return gulp.src("./app/partials/*.html")
    .pipe(gulp.dest("./dist/partials"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
  gulp.src('./app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs karma tests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('test', ['build-js'], function() {
  var testFiles = [
    './test/unit/*.js'
  ];
  
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      console.log('karma tests failed: ' + err);
      throw err;
    });
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', function() {
  var b = browserify({
    entries: './app/js/main.js',
    debug: true,
    paths: ['./app/controllers', './app/services', './app/directives'],
    transform: [ngAnnotate]
  });
  
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(cachebust.resources())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist/js/'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites), applies cache busting to the main page css and js bundles
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['bower','build-css','build-template-cache', 'jshint', 'build-js'], function() {
  return gulp.src('./app/index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('./dist'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// watches file system and triggers a build when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
  return gulp.watch(['./app/index.html','./app/partials/*.html', './app/css/*.*css',
    './app/js/**/*.js'], ['build']);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('webserver', ['watch','build'], function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: false,
      fallback: './dist/index.html'
    }));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launch a build upon modification and publish it to a running server
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('dev', ['watch', 'webserver']);

/////////////////////////////////////////////////////////////////////////////////////
//
// generates a sprite png and the corresponding sass sprite map.
// This is not included in the recurring development build and needs to be run separately
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('sprite', function () {
  
  var spriteData = gulp.src('./app/src/img/*.png')
    .pipe(spritesmith({
      imgName: 'todo-sprite.png',
      cssName: '_todo-sprite.scss',
      algorithm: 'top-down',
      padding: 5
    }));
  
  spriteData.css.pipe(gulp.dest('./dist'));
  spriteData.img.pipe(gulp.dest('./dist'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything, including sprites
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['sprite','build', 'test']);
