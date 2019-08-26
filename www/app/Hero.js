define(["./Weapon", "./Logger"], function (Weapon, Logger) {
    "use strict";
    // Start with the constructor
    function Hero(name, st, dx, weapon, armor, shield) {
        this.name = name;
        this.st = st;
        this.dx = dx;
        this.ma = 10; // hard-coded for humans
        this.readiedWeapon = weapon;
        this.armor = armor;
        this.shield = shield;
        this.knockedDown = false;
        this.standingUp = false;
        this.pickingUpWeapon = false;
        this.weapon = weapon;
        this.droppedWeapon = Weapon.NONE;

        this.damageTaken = 0;
        this._damageTakenThisRound = 0;
        this.injuryDexPenalty = false;
        this.recovering = false;
        this.defending = false;
        this.charging = false;
    }

    // Now add methods
    Hero.prototype.getName = function () {
        return this.name;
    };

    Hero.prototype.getST = function () {
        return this.st;
    };

    Hero.prototype.adjST = function () {
        return Math.max(this.st - this.damageTaken, 0);
    };

    Hero.prototype.getMA = function () {
        return this.ma;
    };

    Hero.prototype.adjustedMA = function () {
        return this.ma - this.armor.getMAAdjustment();
    };

    Hero.prototype.getDX = function () {
        return this.dx;
    };

    Hero.prototype.adjustedDx = function () {
        return this.dx - this.armor.getDexAdjustment() - this.shield.getDexAdjustment() - (this.injuryDexPenalty ? 2 : 0) - (this.isStrengthLowPenalty() ? 3 : 0);
    };

    Hero.prototype.damageTakenThisRound = function () {
        return this._damageTakenThisRound;
    };

    Hero.prototype.isAlive = function () {
        return (this.st - this.damageTaken > 0);
    };

    Hero.prototype.isConscious = function () {
        return (this.st - this.damageTaken > 1);
    };

    Hero.prototype.isKnockedDown = function () {
        return this.knockedDown;
    };

    Hero.prototype.standUp = function () {
        this.standingUp = true;
    };

    /**
     * These rules maybe should go into Game (better cohesion)
     */
    Hero.prototype.newRound = function () {
        this.charging = false;
        this.defending = false;
        this._damageTakenThisRound = 0;
        if (this.standingUp) {
            this.knockedDown = false;
            this.standingUp = false;
        }
        else if (this.pickingUpWeapon)  // technically "was" picking up weapon last round
        {
            this.readiedWeapon = this.droppedWeapon;
            this.droppedWeapon = Weapon.NONE;
            this.pickingUpWeapon = false;
        }

        /*
         * Dex penalty due to injury lasts one complete round
         */
        if (this.injuryDexPenalty && this.recovering) {
            this.injuryDexPenalty = false;
            this.recovering = false;
        }
        else if (this.injuryDexPenalty) {
            this.recovering = true;
        }
    };

    Hero.prototype.takeHits = function (hits) {
        var armorPoints = this.armor.hitsStopped() + this.shield.hitsStopped();
        var damageDone = hits - armorPoints;
        if (damageDone < 0) damageDone = 0;


        Logger.log(this.name + " taking " + hits + " hits.");
        Logger.log(this.armor.getName() + " stops " + this.armor.hitsStopped() );
        Logger.log(this.shield.getName() + " stops " + this.shield.hitsStopped());
        Logger.log(this.name + " taking " + damageDone + " damage.");

        this.takeDamage(damageDone);
        return damageDone;
    };

    /**
     * After it's got past armor, etc.
     */
    Hero.prototype.takeDamage = function (damageDone) {
        this.damageTaken += damageDone;
        this._damageTakenThisRound += damageDone;
        this.injuryDexPenalty = this.sufferingDexPenalty();

        if (this.injuryDexPenalty) Logger.log(this.name + " has an adjDx penalty of -2 for remainder of this round and the NEXT round.");
        Logger.log(this.name + " has now taken " + this.damageTaken + " points of damage, ST = " + this.st + (this.damageTaken >= this.st ? " and is DEAD." : (this.st - this.damageTaken === 1 ? " and is UNCONSCIOUS." : ".")));

        if (this._damageTakenThisRound >= 8) {
            this.knockedDown = true;
            Logger.log(this.name + " has been knocked down by damage.");
        }
        if (this.isStrengthLowPenalty()) Logger.log(this.name + " has an additional DX adjustment of -3 due to ST <= 3.");

    };

    Hero.prototype.sufferingDexPenalty = function () {
        return (this._damageTakenThisRound >= 5 || this.recovering);
    };

    Hero.prototype.isStrengthLowPenalty = function () {
        return (this.st - this.damageTaken <= 3);
    };

    Hero.prototype.setDefending = function () {
        this.defending = true;
    };

    Hero.prototype.isDefending = function () {
        return this.defending;
    };

    Hero.prototype.setCharging = function (isCharging) {
//        Logger.log("Hero: setCharge to " + isCharging);
        this.charging = isCharging;
    };

    Hero.prototype.isCharging = function () {
        return this.charging;
    };

    Hero.prototype.isProne = function () {
        return this.pickingUpWeapon;
    };

    Hero.prototype.isPickingUpWeapon = function () {
        return this.pickingUpWeapon;
    };

    Hero.prototype.getWeapon = function () {
        return this.weapon;
    };

    Hero.prototype.getReadiedWeapon = function () {
        return this.readiedWeapon;
    };

    Hero.prototype.dropWeapon = function () {
        this.droppedWeapon = this.readiedWeapon;
        this.readiedWeapon = Weapon.NONE;
    };

    Hero.prototype.breakWeapon = function () {
        this.readiedWeapon = Weapon.NONE;
        this.droppedWeapon = Weapon.NONE; // shouldn't need this, but just in case
    };

    Hero.prototype.getDroppedWeapon = function () {
        return this.droppedWeapon;
    };

    Hero.prototype.pickUpWeapon = function () {
        this.pickingUpWeapon = true;
    };

    Hero.prototype.getArmor = function () {
        return this.armor;
    };

    Hero.prototype.setArmor = function (armor) {
        return this.armor = armor;
    };

    Hero.prototype.armorPoints = function () {
        this.armor.hitsStopped() + this.shield.hitsStopped();
    };

    Hero.prototype.getShield = function () {
        return this.shield;
    };

    Hero.prototype.toString = function () {
        return this.name + "\n" + this.armor.toString() + "\n" + this.readiedWeapon.toString();
    };
    
    Hero.prototype.canDoDamage = function () {
        return this.isConscious() && (this.readiedWeapon !== Weapon.NONE || this.droppedWeapon !== Weapon.NONE);
    };

    // And now return the constructor function
    return Hero;
});

