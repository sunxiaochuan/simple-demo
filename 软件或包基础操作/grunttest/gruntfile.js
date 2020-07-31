//不需要 require 直接以模块的形式便可以把 grunt 引入进来
module.exports = function(grunt) {
    //grunt 初始化
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //压缩
        uglify: {
            options: {
                //后面的命令是 grunt 模块自带的命令，他创建了一个时间
                banner: '/*! create by <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //这个是帮我们找到静态资源所对应的目录 它可以把我们的静态资源指定 从哪来 到哪去
            static_mappings: {
                //files 可以支持数组进行批量的操作
                files: [{
                    //从哪来
                    src: 'js/index.js',
                    //到哪去
                    dest: 'build/index.min.js'
                }, {
                    src: 'js/main.js',
                    dest: 'build/main.min.js'
                }]
            }
        },
        //合并
        concat: {
            bar: {
                src: ['build/*.js'],
                dest: 'dest/all.min.js'
            }
        },
        //观察本地文件的变化，让他去可以工作
        watch: {
        	//这里以数组的方式设置需要观察的文件
        	files:['js/index.js','js/main.js'],
        	//这里是以数组的方式定义需要执行的任务列表
        	tasks:['uglify','concat']
        }
    });
    //加载上面初始化时配置的插件 这些需要的包都需要在命令行中进行安装 --save-dev
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //默认被执行的任务列表
    grunt.registerTask('default', ['uglify','concat','watch'])
}