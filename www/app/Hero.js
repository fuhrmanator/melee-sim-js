define(function () {
    // Start with the constructor
    function Hero(name, st, weapon) {
        this.name = name;
        this.st = st;
        this.weapon = weapon;
    }

    // Now add methods
    Hero.prototype.getName = function () {
        return this.name;
    };

    Hero.prototype.getST = function () {
        return this.st;
    };

    Hero.prototype.getWeapon = function () {
        return this.weapon;
    };

    // And now return the constructor function
    return Hero;
});

