//语法详情参照 https://jasmine.github.io/
describe("简单的测试加法", function() {
  it("简单的测试加法", function() {
    expect(window.add(1)).toBe(2);
  });
});