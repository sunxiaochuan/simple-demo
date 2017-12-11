import indexModel from '../models/indexModel';
const indexController ={
	index(){
		return async(ctx,next)=>{
			ctx.body = await ctx.render('index.html',function(){
				title:'大拇指点赞'
			})
		}  
	},
	update(){
		return async(ctx,next)=>{
			const indexM = new indexModel(ctx);
			ctx.body = await indexM.updateNum();
		} 
	}
}
// 导出该方法给 initController.js 文件使用
export default indexController;