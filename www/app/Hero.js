define('Hero', function () {
    // Start with the constructor
    function Hero(name, st) {
        this.name = name;
        this.st = st;
    }

    // Now add methods
    Hero.prototype.getName = function () {
        return this.name;
    };

    Hero.prototype.getST = function () {
        return this.st;
    };

    // And now return the constructor function
    return Hero;
});

