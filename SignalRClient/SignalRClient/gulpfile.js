/// <binding AfterBuild='build' />
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    watch = require('gulp-watch'),
    clean = require('gulp-clean');

var root_path = {
    webroot: "./wwwroot/"
};

//library source
root_path.nmSrc = "./node_modules/";

//library Destination
root_path.package_lib = root_path.webroot + "lib/";

gulp.task('lib-js', done => {
    gulp.src('./node_modules/core-js/**/*.+(js|js.map)')
        .pipe(gulp.dest(root_path.package_lib + 'core-js'));

    gulp.src('./node_modules/@angular/**/*.+(js|js.map)')
        .pipe(gulp.dest(root_path.package_lib + '@angular'));

    gulp.src('./node_modules/zone.js/**/*.+(js|js.map)')
        .pipe(gulp.dest(root_path.package_lib + 'zone.js'));

    gulp.src('./node_modules/systemjs/**/*.+(js|js.map)')
        .pipe(gulp.dest(root_path.package_lib + 'systemjs'));

    gulp.src('./node_modules/reflect-metadata/**/*.+(js|js.map)')
        .pipe(gulp.dest(root_path.package_lib + 'reflect-metadata'));

    gulp.src('./node_modules/rxjs/**/*.+(js|js.map)')
        .pipe(gulp.dest(root_path.package_lib + 'rxjs'));

    gulp.src('./node_modules/@aspnet/signalr/dist/browser/**/*.+(js|js.map)')
        .pipe(gulp.dest(root_path.package_lib + 'signalr'));

    done();
});
//library End

gulp.task('dev-js', done => {
    gulp.src(['./src/**/*.js'])
        .pipe(gulp.dest(root_path.webroot + 'app'));
        done();
});

gulp.task('dev-html', done => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest(root_path.webroot + 'app'));
        done();
});

gulp.task("build", gulp.parallel("dev-js", "dev-html"));
//Build End


gulp.task('dev-watcher-js-build', done => {
    gulp.watch('./src/**/*.js', gulp.parallel("dev-js"));
    done();
});

gulp.task('dev-watcher-html-build', done => {
    gulp.watch('src/**/*.html', gulp.parallel("dev-html"));
    done();
});
gulp.task('watcher', gulp.parallel('dev-watcher-js-build','dev-watcher-html-build'));

//Watcher End

gulp.task('dev-js-minify', done => {
    gulp.src(['./src/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(root_path.webroot + 'app'));
        done();
});

gulp.task("publish", gulp.parallel("dev-js-minify", "dev-html"));
//Publish End

//gulp.task('default', gulp.parallel('watcher'));
//gulp.task('default', gulp.parallel('build'));
//gulp.task('default', gulp.parallel('publish'));
