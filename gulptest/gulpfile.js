var gulp = require('gulp');
//引入压缩插件
var uglify = require('gulp-uglify');
//引入合并插件
var concat = require('gulp-concat');
//这个变量可以作为下面的 gulp.src() 的参数
// var paths = {
//     scripts: ['js/index.js', 'js/main.js']
// }
gulp.task('default', function() {
	//这里是找到了 js 目录下的所有的 js 文件
	//这里的参数也可以写成上面定义的 paths 对象
    gulp.src('js/*.js')
    //将上面找到的两个 js 文件作为 输入 进行压缩，压缩完之后直接将这个东西 输出 作为下一步的 输入 
    // I/O/I
        .pipe(uglify())
        //将上一步压缩好的文件 合并至 all.min.js 文件中 输出  作为下一步的 输入
        .pipe(concat('all.min.js'))
        //将上一步 合并好的文件放到 build 文件夹中
        //这个就是基于流式的方式
        .pipe(gulp.dest('build'));
});