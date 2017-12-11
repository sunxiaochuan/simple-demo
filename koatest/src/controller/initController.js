'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexController = require('./indexController');

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入 indexController 文件导出的方法
var controllerInit = {
    //配置初始化函数
    init: function init(app, router) {
        app.use(router(function (_) {
            _.get('/index/index', _indexController2.default.index());
            _.get('/index/update', _indexController2.default.update());
        }));
    }
};
//导出初始化方法，使其全局可用
exports.default = controllerInit;
