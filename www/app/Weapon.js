define(["./Die","./Logger"],function (Die, Logger) {
    "use strict";
    // Pattern from http://stackoverflow.com/a/10280735/1168342
    // Start with the constructor
    function Weapon(name, st, dice, modifier, isTwoHanded, isThrown, isPole) {
        if (!(this instanceof Weapon)) {
            throw new TypeError("Weapon constructor cannot be called as a function.");
        }
        this.name = name;
        this.st = st;
        this.dice = dice;
        this.modifier = modifier;
        this.isTwoHanded = isTwoHanded;
        this.isThrown = isThrown;
        this._isPole = isPole;
    }

    // Now add methods
    Weapon.prototype.getName = function () {
        return this.name;
    };
    
    Weapon.prototype.isTwoHanded = function () {
        return this.isTwoHanded;
    };

    Weapon.prototype.isThrown = function () {
        return this.isThrown;
    };

    Weapon.prototype.isPole = function () {
        return this._isPole;
    };
    
    Weapon.prototype.doDamage = function () {
        Logger.log(
                "Rolling for weapon doing "
                        + this.dice
                        + "d"
                        + ((this.modifier > 0) ? "+" : "")
                        + ((this.modifier !== 0) ? this.modifier : "")
                        + " damage.");
        var damage = 0;
        for (var i = 0; i < this.dice; i++) {
            damage += Die.roll();
        }
        damage += this.modifier;
        if (this.modifier !== 0) Logger.log(((this.modifier > 0) ? "+" : "") + this.modifier);
        if (damage < 0) damage = 0;
        Logger.log("Total weapon damage: " + damage);
        return damage;
    };

    Weapon.prototype.toString = function () {
        return this.name + " (" + this.dice + "D" + ((this.modifier > 0) ? "+" : "") + ((this.modifier !== 0) ? this.modifier : "") + ")";
    };

    Weapon.NONE = new Weapon("None", 0, 0, 0, false, false, false);
    Weapon.DAGGER = new Weapon("Dagger", 0, 1, -1, true, false, false); 
    Weapon.RAPIER = new Weapon("Rapier", 9, 1, 0, false, false, false);
    Weapon.CLUB = new Weapon("Club", 9, 1, 0, true, false, false);
    Weapon.HAMMER = new Weapon("Hammer", 10, 1, 1, true, false, false);
    Weapon.CUTLASS = new Weapon("Cutlass", 10, 2, -2, false, false, false);
    Weapon.SHORTSWORD = new Weapon("Shortsword", 11, 2, -1, false, false, false);
    Weapon.MACE = new Weapon("Mace", 11, 2, -1, true, false, false);
    Weapon.SMALL_AX = new Weapon("Small ax", 11, 1, 2, false, false, false);
    Weapon.BROADSWORD = new Weapon("Broadsword", 12, 2, 0, false, false, false);
    Weapon.MORNINGSTAR = new Weapon("Morningstar", 13, 2, 1, false, false, false);
    Weapon.TWO_HANDED_SWORD = new Weapon("Two-handed sword", 14, 3, -1, false, true, false);
    Weapon.BATTLEAXE = new Weapon("Battleaxe", 15, 3, 0, false, true, false);

    // pole weapons
    Weapon.JAVELIN = new Weapon("Javelin", 9, 1, -1, true, false, true);
    Weapon.SPEAR = new Weapon("Spear", 11, 1, 1, true, true, true);
    Weapon.HALBERD = new Weapon("Halberd", 13, 2, -1, false, true, true);
    Weapon.PIKE_AXE = new Weapon("Pike axe", 15, 2, 2, false, true, true);    // And now return the constructor function
    
    return Weapon;
});

