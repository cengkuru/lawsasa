var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    scsslint = require('gulp-sass-lint'),
    cache = require('gulp-cached'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    minifyHTML = require('gulp-minify-html'),
    size = require('gulp-size'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    deploy = require('gulp-gh-pages'),
    changed = require('gulp-changed'),
    stripDebug = require('gulp-strip-debug'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify');

var bases = {
    app: 'public/app/src/',
    build: 'public/app/build/',
    assets: 'public/assets/',
    index: 'resources/views/',
    bower: 'public/components/'
};

var paths = {
    scripts: ['components/**/**/*.js'],
    styles: ['css/**/*.css'],
    sass: ['css/**/*.scss'],
    html: ['views/*.html'],
    partials: ['views/partials/*.html'],
    php: ['src/*.php'],
    images: ['images/**/*'],
    views: ['views/**/*'],
    extras: ['robots.txt', 'favicon.ico'],
};

// minify index
gulp.task('indexpage', function() {
    var htmlSrc = bases.index + paths.php,// 'resources/views/src/index.php
        htmlDst = bases.index;

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
        .pipe(notify({ message: 'Index page  Task Completed' }))
        .on('error', gutil.log);
});

// Convert sass to css
gulp.task('sass', function() {
    return gulp
        .src(bases.assets + paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(bases.assets + 'css/'))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'sass to css  Task Completed' }))
        .on('error', gutil.log);
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
    gulp.src([bases.assets + 'css/style.css'])
        .pipe(concat('style.css'))
        .pipe(prefix('last 2 versions'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(bases.assets + 'css/'))
        .pipe(notify({ message: 'styles minification  Task Completed' }))
        .on('error', gutil.log);
});

// Vendor CSS concat, auto-prefix and minify
gulp.task('vendorstyles', function() {
    gulp.src([
            bases.bower + 'angular-loading-bar/build/loading-bar.css',
            bases.bower + 'angular-material/angular-material.min.css',
            bases.bower + 'angular-toastr/dist/angular-toastr.min.css',
            bases.bower + 'angular-material-data-table/dist/md-data-table.min.css',
            bases.bower + 'angular-material-icon/angular-material-icon.css'

        ])
        .pipe(concat('vendors.css'))
        .pipe(prefix('last 2 versions'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(notify({ message: 'vendorstyles  Task Completed' }))
        .pipe(gulp.dest(bases.assets + 'css/'))
        .on('error', gutil.log);

});
// Vendor concat, strip debugging and minify
gulp.task('vendorjs', function() {
    gulp.src([
            bases.bower + 'angular/angular.min.js',
            bases.bower + 'underscore/underscore-min.js',
            bases.bower + 'angular-ui-router/release/angular-ui-router.min.js',
            bases.bower + 'angular-local-storage/dist/angular-local-storage.min.js',
            bases.bower + 'restangular/dist/restangular.min.js',
            bases.bower + 'angular-animate/angular-animate.min.js',
            bases.bower + 'angular-aria/angular-aria.min.js',
            bases.bower + 'angular-messages/angular-messages.min.js',
            bases.bower + 'angular-material/angular-material.min.js',
            bases.bower + 'angular-loading-bar/build/loading-bar.min.js',
            bases.bower + 'angular-material-icons/angular-material-icons.min.js',
            bases.bower + 'angular-toastr/dist/angular-toastr.tpls.min.js',
            bases.bower + 'angular-filter/dist/angular-filter.js',
            bases.bower + 'angular-material-data-table/dist/md-data-table.min.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(bases.assets + 'js/'))
        .pipe(notify({ message: 'vendorjs  Task Completed' }))
        .on('error', gutil.log);
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src([
            bases.app + 'app.js',

            bases.app + 'components/main/controllers/mainCtrl.js',
            bases.app + 'components/home/controllers/homeCtrl.js',
            bases.app + 'components/login/controllers/loginCtrl.js',
            bases.app + 'components/users/controllers/usersCtrl.js',
            bases.app + 'components/dashboard/controllers/dashboardCtrl.js',
            bases.app + 'components/terms/controllers/termsCtrl.js',


            bases.app + 'components/users/services/userService.js',
            bases.app + 'components/home/services/termService.js'
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest(bases.build + 'js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(bases.build + 'js/'))
        .pipe(notify({ message: 'scripts  Task Completed' }))
        .on('error', gutil.log);
});

gulp.task('masterJs', function() {
    gulp.src([
            bases.assets + 'js/vendors.min.js',
            bases.build + 'js/script.min.js'
        ])
        .pipe(concat('masterjs.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(bases.build + 'js/'))
        .pipe(notify({ message: 'master.Js  Task Completed' }))
        .on('error', gutil.log);
});

gulp.task('jshint', function() {
    gulp.src(bases.app + paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Watch for changes
gulp.task('watch', function() {
    // watch for HTML changes
    gulp.watch([bases.index + paths.php], ['indexpage']);

    // watch for app.js changes
    gulp.watch([bases.app + 'app.js'], ['scripts','jshint', 'masterJs']);

    // watch for JS changes
    gulp.watch([bases.app + paths.scripts], ['scripts','jshint', 'masterJs']);


    // watch for component changes
    gulp.watch([bases.bower], ['vendorjs']);

    // watch sass for changes
    gulp.watch([bases.assets + paths.sass], ['styles','sass']);


});


gulp.task('default', ['indexpage', 'scripts', 'vendorjs','masterJs','jshint', 'watch']);