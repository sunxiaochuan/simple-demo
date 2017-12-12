// ES5 实现继承
function Car(color, price) {
    this.color = color;
    this.price = price;

}
Car.prototype.Sale = function() {
    console.log(this.color + '的Cruze卖给了小王价格是' + this.price);
}

function Cruze(color, price) {
    Car.call(this, color, price);
}
var _proto = Object.create(Car.prototype);
_proto.constructor = 'Cruze';
Cruze.prototype = _proto;
var NEW = new Cruze('红色', 140000);
NEW.Sale();

// ES6 实现继承
class Car {
    constructor(color, price) {
        this.color = color;
        this.price = price;
    }
}
Car.prototype.Sale = function() {
    console.log(this.color + '的Cruze卖给了小王价格是' + this.price);
}
class Cruze extends Car {
    constructor(color, price) {
        super(color, price);
    }
}
var _proto = Object.create(Car.prototype);
_proto.constructor = 'Cruze';
Cruze.prototype = _proto;
var NEW = new Cruze('红色', 140000);
NEW.Sale();