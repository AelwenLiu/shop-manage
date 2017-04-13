var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');
var cssmin = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();
var contentIncluder = require('gulp-content-includer');
var reload = browserSync.reload;
// 项目配置
var app = {
    version: '0.0.6',
    src: 'src/',
    build: 'build/',
    inc: 'include/'
}

// Server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: app.build
        }
    });
});

// dev
gulp.task('sass', function () {
    return sass(app.src + 'style.scss', {lineNumbers: true})
        .pipe(gulp.dest(app.build + 'css'))
        .pipe(reload({stream:true}));
});
// build
gulp.task('cssmin', ['sass'], function () {
    gulp.src(app.build + 'css/style.css').pipe(cssmin()).pipe(gulp.dest(app.build + 'css'));
});

// dev or build
gulp.task('include', function() {
    return gulp.src(app.src + "**/*.html")
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(htmlreplace({
            'css': ['./css/base.css?v=' + app.version, './css/function.css?v=' + app.version, './css/style.css?v=' + app.version],
        }))
        .pipe(gulp.dest(app.build))
        .pipe(reload({stream:true}));
});
// 监控
gulp.task('watch', ['sass', 'include'], function() {
    gulp.watch(app.src + '*.scss', ['sass']);
    gulp.watch([app.src + '**/*.html', app.inc + '**/*.html'], ['include']);
});

gulp.task('dev', ['watch', 'browser-sync']);
gulp.task('build', ['cssmin', 'include']);