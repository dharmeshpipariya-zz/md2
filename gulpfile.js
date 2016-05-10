//var gulp = require('gulp');
//var del = require('del');
//var tslint = require('gulp-tslint');
//var tsc = require('gulp-typescript');
//var sourcemaps = require('gulp-sourcemaps');
//var tsProject = tsc.createProject('tsconfig.json');
//var config = require('./gulp.config')();

//var browserSync = require('browser-sync');
//var superstatic = require('superstatic');

//gulp.task('clean', function (cb) {
//    return del(['build', 'src/**/*.js', 'src/**/*.js.map', 'src/**/*.d.ts', '*.js', '!gulpfile.js', '!gulp.config.js', '*.js.map', '*.d.ts'], cb);
//});

//gulp.task('tslint', function () {
//    return gulp.src(config.allTs)
//        .pipe(tslint())
//        .pipe(tslint.report('prose', {
//            emitError: false
//        }));
//})

//gulp.task('compile', ['tslint'], function () {
//    var sourceTsFiles = [config.allTs];

//    var tsResult = gulp
//        .src(sourceTsFiles)
//        .pipe(sourcemaps.init())
//        .pipe(tsc(tsProject));

//    return tsResult.js
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest(config.tsOutputPath));
//});

//gulp.task('resources', function () {
//    return gulp.src(['src/**/*', '!**/*.ts'])
//        .pipe(gulp.dest('./build'));
//});

//gulp.task('watch', function () {
//    gulp.watch([config.allTs], ['compile']).on('change', function (e) {
//        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
//    });
//    gulp.watch(['src/**/*.html', 'src/**/*.css'], ['resources']).on('change', function (e) {
//        console.log('Resource file ' + e.path + ' has been changed. Updating.');
//    });
//});

//gulp.task('libs', function () {
//    gulp.src([
//      'node_modules/systemjs/dist/system.js',
//      'node_modules/angular2/bundles/angular2.dev.js',
//      'node_modules/angular2/bundles/angular2-polyfills.js',
//      'node_modules/angular2/bundles/http.dev.js',
//      'node_modules/angular2/bundles/upgrade.dev.js',
//      'node_modules/angular2/bundles/router.dev.js',
//      'node_modules/es6-shim/es6-shim.js',
//      'node_modules/es6-promise/dist/es6-promise.js',
//      'node_modules/rxjs/bundles/Rx.js'
//    ]).pipe(gulp.dest('./build/lib'));
//});

//gulp.task('build', ['compile', 'resources', 'libs'], function () {
//    console.log('Building the project ...');
//});

//// gulp.task('publish', ['clean', 'compile'], function (done) {
////     gulp.src([
////       'build/components/autocomplete/autocomplete.js',
////       'build/components/autocomplete/autocomplete.js.map',
////       'build/components/autocomplete/autocomplete-pipes.js',
////       'build/components/autocomplete/autocomplete-pipes.js.map',
////       'build/components/dialog/dialog.js',
////       'build/components/dialog/dialog.js.map',
////       'build/components/menu/menu.js',
////       'build/components/menu/menu.js.map',
////       'build/components/select/select.js',
////       'build/components/select/select.js.map',
////       'build/components/switch/switch.js',
////       'build/components/switch/switch.js.map'
////     ]).pipe(gulp.dest('./'));
//// });

//// gulp.task('publish', ['compile'], function() {
////     return gulp.src(['src/components/**/*'])
////         .pipe(gulp.dest('publish'));
//// });

//gulp.task('serve', ['tslint', 'build'], function () {

//    gulp.watch([config.allTs], ['tslint', 'compile']);

//    browserSync({
//        port: 3000,
//        files: ['index.html', 'app/**/*.js', 'app/**/*.html'],
//        injectChanges: true,
//        logFileChanges: false,
//        logLevel: 'silent',
//        notify: true,
//        reloadDelay: 0,
//        server: {
//            baseDir: ['./build/'],
//            middleware: superstatic({ debug: false })
//        }
//    });
//});

//gulp.task('default', ['serve']);

"use strict";

var gulp = require("gulp");
var del = require("del");
var tsc = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var tsProject = tsc.createProject("tsconfig.json");
var tslint = require('gulp-tslint');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
  return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', function () {
  return gulp.src("src/**/*.ts")
      .pipe(tslint())
      .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", function () {
  var tsResult = gulp.src("src/**/*.ts")
      .pipe(sourcemaps.init())
      .pipe(tsc(tsProject));
  return tsResult.js
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", function () {
  return gulp.src(["src/**/*", "!**/*.ts"])
      .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
  return gulp.src([
          'es6-shim/es6-shim.min.js',
          'systemjs/dist/system-polyfills.js',
          'systemjs/dist/system.src.js',
          'reflect-metadata/Reflect.js',
          'rxjs/**',
          'zone.js/dist/**',
          '@angular/**'
  ], { cwd: "node_modules/**" }) /* Glob required here. */
      .pipe(gulp.dest("build/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
  gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'libs'], function () {
  console.log("Building the project ...");
});

gulp.task('publish', function () {
  return gulp.src('./**/*.ts')
		.pipe(tsc({
		  noImplicitAny: true,
		  declaration: true
		}))
		.pipe(gulp.dest('.'));
});