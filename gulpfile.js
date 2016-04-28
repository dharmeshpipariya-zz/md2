var gulp = require('gulp');
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tsProject = tsc.createProject('tsconfig.json');
var config = require('./gulp.config')();

var browserSync = require('browser-sync');
var superstatic = require('superstatic');

gulp.task('clean', function(cb) {
    return del(["build"], cb);
});

gulp.task('tslint', function() {
    return gulp.src(config.allTs)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
})

gulp.task('compile', ['tslint'],function() {
    var sourceTsFiles = [
        config.allTs
    ];

    var tsResult = gulp
        .src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task("resources", function() {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});

gulp.task('watch', function () {
    gulp.watch([config.allTs], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    // gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        // console.log('Resource file ' + e.path + ' has been changed. Updating.');
    // });
});

// gulp.task("libs", function() {
    // return gulp.src([
            // 'es6-shim/es6-shim.min.js',
            // 'systemjs/dist/system-polyfills.js',
            // 'angular2/bundles/angular2-polyfills.js',
            // 'angular2/es6/dev/src/testing/shims_for_IE.js',
            // 'systemjs/dist/system.src.js',
            // 'rxjs/bundles/Rx.js',
            // 'angular2/bundles/angular2.dev.js',
            // 'angular2/bundles/router.dev.js'
        // ], {cwd: "node_modules/**"}) /* Glob required here. */
        // .pipe(gulp.dest("build/lib"));
// });

// gulp.task("build", ['compile', 'resources'], function() {
    // console.log("Building the project ...");
// });

gulp.task("publish", ['compile'], function() {
    return gulp.src(["src/components/**/*"])
        .pipe(gulp.dest("publish"));
});

gulp.task('serve', ['tslint', 'compile'], function() {
    	
    gulp.watch([config.allTs], ['tslint', 'compile']);
	
    browserSync({
        port: 3000,
        files: ['index.html', 'app/**/*.js', 'app/**/*.html'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',    
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: ['./src/'],
            middleware: superstatic({ debug: false})
        }
    });	
});

gulp.task('default', ['serve']);
