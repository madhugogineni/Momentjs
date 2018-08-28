function Shop() {
    this.construct = function(hello) {
        hello.step1();
    }
}
function Car() {
    this.step1 = function() {
        console.log("car funnction");
    }
}
function run() {
    var shop = new Shop();
    var car = new Car();
    shop.construct(car);
}