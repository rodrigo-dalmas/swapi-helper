var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject'),
    browserify = require('browserify'),
    CacheBuster = require('gulp-cachebust'),
    cachebust = new CacheBuster(),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    spritesmith = require('gulp.spritesmith'),
    include = require('gulp-include');
    concat = require('gulp-concat');

/////////////////////////////////////////////////////////////////////////////////////
//
// Development Tasks
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './dist'
    }
  })
})

gulp.task('vendor-css', function () {
  gulp.src([
      "./node_modules/angular-material/angular-material.min.css",
      "./node_modules/flexboxgrid/dist/flexboxgrid.min.css",
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "./node_modules/bootstrap/dist/css/bootstrap-theme.min.css"])
    .on('error', console.log)
    .pipe(gulp.dest("dist/css"));
});

gulp.task('build-vendor-js', function() {
  gulp.src([
    "./node_modules/angular/angular.min.js",
    "./node_modules/angular-ui-router/release/angular-ui-router.min.js",
    "./node_modules/angular-material/angular-material.min.js"])
    .on('error', console.log)
    .pipe(gulp.dest("dist/lib"));
});

gulp.task('build-app-js', function() {
  gulp.src("./app/js/*.js")
    .on('error', console.log)
    .pipe(gulp.dest("dist/js"));
});

gulp.task('build-ctrls-js', function() {
  gulp.src("./app/controllers/*.js")
    .on('error', console.log)
    .pipe(gulp.dest("dist/controllers"));
});

gulp.task('build-service', function() {
  gulp.src("./app/services/*.js")
    .on('error', console.log)
    .pipe(gulp.dest("dist/services"));
});

gulp.task('build-index', function() {
  gulp.src(["./app/index.html"])
    .on('error', console.log)
    .pipe(gulp.dest("dist"));
});

gulp.task('sass', function() {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('build-template', function() {
  return gulp.src("./app/templates/*.html")
    .pipe(gulp.dest("./dist/templates"));
});

gulp.task('build-partials', function() {
  return gulp.src("./app/partials/*.html")
    .pipe(gulp.dest("./dist/partials"));
});

gulp.task('watch', function() {
  gulp.watch('./app/scss/*.scss', ['sass']);
  gulp.watch('./app/*.html', browserSync.reload);
  gulp.watch('./app/partials/*.html', browserSync.reload);
  gulp.watch('./app/templates/*.html', browserSync.reload);
  gulp.watch('./app/js/*.js', browserSync.reload);
  gulp.watch('./app/controllers/*.js', browserSync.reload);
})

/////////////////////////////////////////////////////////////////////////////////////
//
// Optimization Tasks
//
/////////////////////////////////////////////////////////////////////////////////////

// Optimizing CSS and JavaScript
gulp.task('useref', function() {
  
  return gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpIf('./app/css/*.css', cssnano()))
    .pipe(gulp.dest('./dist'));
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('./app/src/img/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('./dist/images'))
});

//Generating Sprites
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

//Copying favicon
gulp.task('favicon', function() {
  return gulp.src('*.ico')
    .pipe(gulp.dest('./dist'))
})

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('./app/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'))
})

// Cleaning 
gulp.task('clean', function (cb) {
  del([
    'dist/*'
  ], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Build Sequences
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('all', function(callback) {
  runSequence(['clean','sass', 'vendor-css', 'build-index',
    'build-app-js', 'build-vendor-js', 'build-template',
    'build-partials', 'build-ctrls-js', 'sprite', 'favicon',
    'build-service', 'browserSync', 'watch'],
    callback
  )
})
