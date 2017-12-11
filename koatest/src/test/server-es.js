'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app_o = require('../app_o.js');

var _app_o2 = _interopRequireDefault(_app_o);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//先定义一个拿到端口的方法
function request() {
  return (0, _supertest2.default)(_app_o2.default.listen());
}
//这里引用的是 app_0.js 文件拿到 app，所以需要在app_o.js 文件中将其导出

describe('测试路由', function () {
  it('点赞', function (done) {
    request().get('/index/update').expect(200).end(function (err, res) {
      if (res.data == 1) return done(err);
      done();
    });
  });
});
