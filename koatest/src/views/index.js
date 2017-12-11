module.exports = function(templateParams) {
    //vendor 是 css 的文件名称
    var _cssList = ['vendor'];
    var webAssestsHelp = require('./webAssetsHelp.js')(templateParams, _cssList);
    //拼写 index.html 代码
    var _html = "{% extends './layout.html' %}" +
        "{% block title %}My Page{% endblock %}" +
        "{% block styles %}" +
        webAssestsHelp.styles+
        "{% endblock %}" +
        "{% block content %}{%  include '../widget/index.html' %}{% endblock %}"+
        "{% block script %}" +
        webAssestsHelp.scripts+
        "{% endblock %}";
        return _html;
}