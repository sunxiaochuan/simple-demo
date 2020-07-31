//全局公用的对脱敏数据点击显示与隐藏方法  参数可以是单个也可以是多个，但是必须字符串类型的 Dom 元素 例：.name
function publicClickToogle() {
    //先将内置的 arguments 转换为真正的数组
    var dataArr = Array.prototype.slice.apply(arguments);
    var nowDataArr = [];//存放脱敏数据的数组
    var realDataArr = [];//存放真实数据的数组
    for (var i = 0; i < dataArr.length; i++) {
        var Dom = dataArr[i];
        nowDataArr.push($(Dom).text());
        realDataArr.push($(Dom).attr("data-str"));
        (function(nowDataArr,realDataArr,i) {
            $(Dom).on('click', function() {
                var nowData = nowDataArr[i]; //获取已脱敏处理的数据
                console.log(nowData);
                var realData = realDataArr[i]; //获取后台传递的真实完成数据
                if ($(this).text() == nowData) {
                    $(this).text(realData);
                } else if ($(this).text() == realData) {
                    $(this).text(nowData);
                }
            })
        })(nowDataArr,realDataArr,i);
    }
}
//测试输出示例
publicClickToogle('#testData1', '#testData2');