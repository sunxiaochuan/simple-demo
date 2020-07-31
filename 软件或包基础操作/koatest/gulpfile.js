//引入 gulp  	[Gulp 中文网--入门指南](http://www.gulpjs.com.cn/docs/getting-started/)
const gulp = require('gulp');
//引入 gulp-babel 编译需要的插件		[gulp-babel](https://www.npmjs.com/package/gulp-babel)
const babel = require('gulp-babel');

//[gulp API 文档](http://www.gulpjs.com.cn/docs/api/)
//default 是默认的任务 现在的默认任务执行顺序是 praise -> fn -> default
gulp.task('default', ['praise'], () => {
    //这里监控文件  监控到改变之后还是要执行 praise
    gulp.watch(['src/**/*.es', '!src/public/*/*.es'], ['praise']);
});

//这里把编译任务名称改为 praise 这个事件会先于  default 执行
gulp.task('praise', () => {
    //src 第一个参数就是需要编译的文件 src 目录下的所有目录中的以 .es 为后缀的文件  
    //后面又加了一个 非的条件 除了 public 目录下的 .es 文件 因为这个是要用 webpack 来编译的，实现的是用  gulp 编译后端的代码 webpack 编译前端的 上面需要监视的文件与这个一样
    gulp.src(['src/**/*.es', '!src/public/*/*.es'])
        //这个是编译的时候要用到的规则
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        //这个是编译之后文件放置的目录
        .pipe(gulp.dest('./build'))
});