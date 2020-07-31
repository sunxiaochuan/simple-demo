var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
//npmjs 地址 https://www.npmjs.com/package/css-mqpacker
var mqpacker = require('css-mqpacker');
//npmjs 地址 https://www.npmjs.com/package/csswring
var csswring = require('csswring');
var less = require('gulp-less');
gulp.task('default', function() {
	var processors = [
		autoprefixer({
			browsers:['last 4 version']
		}),
		mqpacker,
		csswring
	];
    return gulp.src('./src/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});