'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var indexModel = function () {
    function indexModel(ctx) {
        _classCallCheck(this, indexModel);

        this.ctx = ctx;
    }
    //为了实现数据库更新建立方法  传数据的接口


    _createClass(indexModel, [{
        key: 'updateNum',
        value: function updateNum() {
            //在这里 return 一个 promise 模块传入 initController.js 再在indexController.js 中调用需要用到一个模块 request-promise  参考网址：https://www.npmjs.com/package/request-promise
            // 获取文件
            var options = {
                uri: 'http://localhost/praise.php',
                method: 'GET'
            };
            return new Promise(function (resolve, reject) {
                (0, _requestPromise2.default)(options).then(function (result) {
                    var info = JSON.parse(result);
                    if (info) {
                        resolve({ data: info.result });
                    } else {
                        reject({});
                    }
                });
            });
        }
    }]);

    return indexModel;
}();

exports.default = indexModel;
