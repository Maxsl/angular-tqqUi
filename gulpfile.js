/**
 * Created by Administrator on 2016/2/21.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngMin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    stripDebug = require('gulp-strip-debug');
//生产环境输出
gulp.task('production',['sass-min','angular-min']);

gulp.task('default',['watch-angular','watch-sass']);
//监视编译angular
gulp.task('watch-angular',function(){
    gulp.watch(['./assets/js/*.js','./assets/js/*/*.js'],['angular'])
})
//监视sass
gulp.task('watch-sass',function(){
    gulp.watch(['./assets/sass/*.scss','./assets/sass/mixin/*.scss'],['sass']);
})
//sass编译，普通版（未压缩）
gulp.task('sass',function(){
    gulp.src('./assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('tqqUi.css'))
        .pipe(gulp.dest('./dist'))
})
//sass编译，压缩版
gulp.task('sass-min',function(){
    gulp.src('./assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('tqqUi.min.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(minifycss())
})
//angular 编译-合并
gulp.task('angular',function(){
    gulp.src(['./assets/js/*.js','./assets/js/*/*.js'])
        .pipe(ngAnnotate())
         .pipe(concat('tqqUi.js'))
        .pipe(gulp.dest('./dist'))
})
//angular 编译合并压缩
gulp.task('angular-min',function(){
    gulp.src(['./assets/js/*.js','./assets/js/*/*.js'])
        .pipe(ngAnnotate())
        .pipe(ngMin({dynamic:false}))
        .pipe(stripDebug())  //console
        .pipe(uglify({outSourceMap:false}))
        .pipe(concat('tqqUi.min.js'))
        .pipe(gulp.dest('./dist'))
})