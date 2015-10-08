define(function () {
    // Start with the constructor
    function Hero(name, st, dx, weapon, armor, shield) {
        this.name = name;
        this.st = st;
        this.dx = dx;
        this.weapon = weapon;
        this.armor = armor;
        this.shield = shield;
    }

    // Now add methods
    Hero.prototype.getName = function () {
        return this.name;
    };

    Hero.prototype.getST = function () {
        return this.st;
    };

    Hero.prototype.getDX = function () {
        return this.dx;
    };

    Hero.prototype.getWeapon = function () {
        return this.weapon;
    };

    Hero.prototype.getArmor = function () {
        return this.armor;
    };

    Hero.prototype.getShield = function () {
        return this.shield;
    };

    // And now return the constructor function
    return Hero;
});

