// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    markdown = require('gulp-markdown-it'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();

//file watch paths
var paths = {
        css: {
            home: 'src/css/',
            src: '**/*.scss',
        },
        js: {
            home: 'src/js/',
            src: '**/*.js',
        }
    },

    dist = './dist/',
    dev = './dev/';

// JS Linting
gulp.task('lint', function() {
    return gulp.src(paths.js.home + paths.js.src, { base: './src' })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// JS Task
gulp.task('js', function() {
    return gulp.src(paths.js.home + paths.js.src, { base: './src' })
        .pipe(gulp.dest(dev));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.css.home + paths.css.src, { base: './src' })
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['> 0.75%', 'not IE 7', 'not IE 8', 'not IE 9' /*, 'not OperaMobile'*/ ]
        }))
        .pipe(gulp.dest(dev));
});

// Minify JS
gulp.task('buildJS', ['lint'], function() {

    return gulp.src(paths.js.home + paths.js.src, { base: './src' })
        // .pipe(babel())
        .pipe(uglify({
            preserveComments: 'some'
        }))
        // .pipe(rename('main.min.js'))
        // .pipe(header(headerText('main.min.js')))
        .pipe(gulp.dest(dist));
});

// Minify CSS
gulp.task('buildCSS', ['sass'], function() {

    return gulp.src(paths.css.home + paths.css.src, { base: './src' })
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['> 0.75%', 'not IE 7', 'not IE 8', 'not IE 9' /*, 'not OperaMobile'*/ ]
        }))
        .pipe(minifyCss())
        // .pipe(rename('main.min.css'))
        // .pipe(header(headerText('main.min.css')))
        .pipe(gulp.dest(dist));
});

// Move JS Libs
gulp.task('moveJsLibs', function() {
    return gulp.src(['lib/**/*.js', './node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(dev + '/lib'))
        .pipe(gulp.dest(dist + '/lib'));
});

// Move Images
gulp.task('moveImg', function() {
    return gulp.src(['src/img/**/*.*'], { base: './src' })
        .pipe(gulp.dest(dev))
        .pipe(gulp.dest(dist));
});

//webserver
browserSync.init({
    server: {
        baseDir: "./"
    },
    open: false,
    notify: false,
    port: 3001
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(dev + '**/*.hbs', browserSync.reload);
    gulp.watch(dev + paths.js.home + paths.js.src, browserSync.reload);
    gulp.watch(paths.js.home + paths.js.src, ['js'], browserSync.reload);
    gulp.watch(paths.css.home + paths.css.src, ['sass']).on('change', function() {
        gulp.src(dist + '**/*.css').pipe(browserSync.stream());
    });;
    gulp.watch(dev + paths.css.home + paths.css.src + '*.css', browserSync.reload);
});


gulp.task('default', ['watch', 'dev']);
gulp.task('dist', ['lint', 'buildCSS', 'buildJS', 'moveJsLibs', 'moveImg']);
gulp.task('build', ['dist', 'dev']);
gulp.task('dev', ['lint', 'js', 'sass', 'moveJsLibs', 'moveImg']);
