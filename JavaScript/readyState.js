//readyState 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState
//扩展的 readystatechange 的参考链接

//readyState
// 概述：
// 一个document 的 Document.readyState 属性描述了文档的加载状态。 document 的属性

// 值：
// 一个文档的 readyState 可以是以下之一：

// loading / 加载
// document 仍在加载。

// interactive / 互动
// 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。

// complete / 完成
// T文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

// 当这个属性的值变化时，document 对象上的 readystatechange 事件将被触发。document 的事件

//不同的准备状态
switch (document.readyState) {
    case "loading":
        // The document is still loading.
        break;
    case "interactive":
        // The document has finished loading.
        // We can now access the DOM elements.
        var span = document.createElement("span");
        span.textContent = "A <span> element.";
        document.body.appendChild(span);
        break;
    case "complete":
        // The page is fully loaded.
        let CSS_rule = document.styleSheets[0].cssRules[0].cssText;
        console.log(`The first CSS rule is: ${CSS_rule}`);
        break;
}

// 模拟 DOMContentLoaded/ jquery ready
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
}

// 模拟 load/onload 事件
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        initApplication();
    }
}


//readystatechange 拓展
// 概述：
// 当一个文档的 readyState 属性发生更改时，readystatechange 事件会被触发。
// 语法：
// document.onreadystatechange = funcRef;
// funcRef 是个函数引用,会在readystatechange事件触发时调用.

//例子
/*
interactive / 互动
文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState
​​​​​​​*/
// 模拟DOMContentLoaded事件
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
}