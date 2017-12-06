const {Builder, By, Key, until} = require('selenium-webdriver');

let driver = new Builder()
    .forBrowser('firefox')
    .build();
//这里我的打开网站以百度为例
driver.get('http://www.baidu.com');
//name -> wd 是百度页面中 input 输入域的 name 属性的值
//xiaochuan  ->  指的是输入域填写的值
driver.findElement(By.name('wd')).sendKeys('小川', Key.RETURN);
//这个 title 是在百度中输入值搜素之后的页面的 title 的值
driver.wait(until.titleIs('小川_百度搜索'), 3000);
//退出
driver.quit();