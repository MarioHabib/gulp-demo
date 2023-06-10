const concat = require('gulp-concat');
const htmlmin = require('gulp-html-minifier-terser');
const prefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const optimizeImages =require("gulp-optimize-images");
const { src, dest, series , watch, parallel, task} = require('gulp');
var replace = require('gulp-replace-path');

function cssTask() {
    return src('project/*.css')
    .pipe(prefixer())
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
}
exports.cssTask=cssTask;

function jsTask() {
    return src('project/*.js')
    .pipe(concat('all.js'))
    
    .pipe(terser())
    .pipe(dest('dist/js'))
}
exports.jsTask=jsTask;

const images= ()=> {return src('project/*.jpg')}
console.log("🚀 ~ file: gulpfile.js:29 ~ images:", images)




function htmlTask() {
    return src('project/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(replace('styleGeneral.css', 'css/main.css'))
      .pipe(replace('style.css', ''))
      .pipe(replace('one.js', 'js/all.js'))
      .pipe(replace('two.js', ''))
      .pipe(dest('dist'));
  
}
exports.htmlTask=htmlTask;


function imgTask() {
    
    return src('project/*.jpg')
    .pipe(optimizeImages({compressOptions:{
        jpeg: {
            quality: 50,
            progressive: true,
        }
    }}))
    .pipe(dest('dist/imgs'))
}
exports.imgTask = imgTask
function watchTask(){
    watch('project/*.html',htmlTask)
    watch('project/*.css',cssTask)
    watch('project/*.js',jsTask)
    watch('project/*.jpg',imgTask)
}
exports.default= series( parallel( htmlTask, cssTask ,jsTask, imgTask ),watchTask)