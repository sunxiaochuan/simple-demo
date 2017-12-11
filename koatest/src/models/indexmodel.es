import rpA from 'request-promise';
class indexModel {
    constructor(ctx) {
        this.ctx = ctx;
    }
    //为了实现数据库更新建立方法  传数据的接口
    updateNum() {
        //在这里 return 一个 promise 模块传入 initController.js 再在indexController.js 中调用需要用到一个模块 request-promise  参考网址：https://www.npmjs.com/package/request-promise
        // 获取文件
        const options = {
            uri: 'http://localhost/praise.php',
            method:'GET'
        };
        return new Promise((resolve,reject)=>{
        	rpA(options).then(function(result){
        		const info = JSON.parse(result);
        		if(info){
        			resolve({data:info.result});
        		}else{
        			reject({});
        		}
        	})
        })
    }
}
export default indexModel; 