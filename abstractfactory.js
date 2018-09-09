function Employee(name) {
    this.name = name;

    this.say = function () {
        log.add("I am employee " + name);
    };
}

function EmployeeFactory() {

    this.create = function (name) {
        return new Employee(name);
    };
}

function Vendor(name) {
    this.name = name;

    this.say = function () {
        log.add("I am vendor " + name);
    };
}

function VendorFactory() {

    this.create = function (name) {
        return new Vendor(name);
    };
}

// log helper
var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

function run() {
    var persons = [];
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create("Joan DiSilva"));
    persons.push(employeeFactory.create("Tim O'Neill"));
    persons.push(vendorFactory.create("Gerald Watson"));
    persons.push(vendorFactory.create("Nicole McNight"));

    for (var i = 0, len = persons.length; i < len; i++) {
        persons[i].say();
    }

    log.show();
}

function printHello() {
    return "hello";
}
function Square() {
    this.value = "square";
}
function Rectangle() {
    this.value = "rectangle";
}
function Quad() {
    return "quad";
}
var proto = Rectangle.prototype;
proto.printName = printHello;
function Shape(input) {
    if (input == "square") {
        return new Square();
    }
    else {
        return new Rectangle();
    }
}


function BuddyList() {

}
BuddyList.prototype = {
    addBuddy: function (buddyName) {
        console.log(buddyName);
    }
}
function UserOptions(username) {
    new BuddyList().addBuddy(username);
}