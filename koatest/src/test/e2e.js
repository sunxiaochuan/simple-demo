const {Builder, By, Key, until} = require('selenium-webdriver');

let driver = new Builder()
    .forBrowser('firefox')
    .build();
//设置地址
driver.get('http://localhost:3000/index/index');
//添加事件
driver.findElement(By.id('thumb')).click();
const _animation = driver.findElement(By.id('animation'))
//判断事件执行时 animation 元素是否执行了相应的动画就是显示隐藏
driver.wait(_animation.isDisplayed(), 1000);
// driver.quit(); //为了看到效果将关闭浏览器的行为暂时注释掉