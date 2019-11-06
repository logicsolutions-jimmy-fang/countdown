var $ = require('gulp-load-plugins')();
var minifyCSS = require('gulp-minify-css');
let uglify = require('gulp-uglify-es').default;
var browserSync = require('browser-sync').create();
var mainBowerFiles=require('main-bower-files')
const { task, src, dest, series } = require('gulp')

// gulp.task('jade',function(){
//     gulp.src('./source/*.jade')
//         .pipe($.data(function () {
//             var resume = require('./source/resume/resume.json');
//             var source={
//                 'resume':resume,
//             };
//             return source;
//         }))
//         .pipe($.jade())
//         .pipe(gulp.dest('./public/'))
//         .pipe(browserSync.stream())
// })


task('scss', function () {
    return src('./source/scss/**/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(dest('./.tmp'))
        .pipe(browserSync.stream())
});

//先講檔案載入暫時的資料夾
task('bower', function() {
    return src(mainBowerFiles())
        .pipe(dest('./.tmp/vendors'))
});

task('vendorCSS',function(){    
    return src(['./.tmp/vendors/**/*.css','./.tmp/**/*.css'])
    .pipe($.concat('all.css'))
    .pipe(minifyCSS())                            
    .pipe(dest('./src/assets/css'))
    .pipe(browserSync.stream())    
});

task('clean',function(){
    return src(['./.tmp'],{read:false})
        .pipe($.clean())
});

task('vendorJs',function(){
    return src(['./.tmp/vendors/**/*.js','./source/js/**/*.js'])
    .pipe($.order([
        'jquery.js',
        'bootstrap.js',
    ]))
    .pipe($.concat('all.js'))
    .pipe(uglify({
        compress:{
            drop_console:true //把console.log 削掉
        }
    }))                               
    .pipe(dest('./src/assets/js'))
    .pipe(browserSync.stream())
});

task('vendorFONT',function(){
    return      src('./.tmp/vendors/*.{eot,svg,ttf,woff,woff2}')
                .pipe(dest('./src/assets/fonts'))
});

//gulp.task('dev', ['jade','scss','vendorJs','vendorCSS','vendorFONT','cleantmp','watch','browser-sync']);

//gulp.task('default', ['jade','scss','vendorJs','vendorCSS','vendorFONT','cleantmp']);
exports.default = series('bower','scss','vendorCSS','vendorJs','vendorFONT','clean');