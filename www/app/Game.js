define(["./Hero", "./Weapon", "./Armor", "./Shield", "./Die", "./controller", "require"], function (Hero, Weapon, Armor, Shield, Die, controller, require) {
    "use strict";
    // Pattern from http://stackoverflow.com/a/10280735/1168342
    // Start with the constructor
    function Game(hero1, hero2) {
        if (!(this instanceof Game)) {
            throw new TypeError("Game constructor cannot be called as a function.");
        }
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.round = 0;
        this.winHero1 = false;
        this.winHero2 = false;
        this.criticalMisses = 0;
        this.criticalHits = 0;
        this.poleCharge = false;
        this.defendOnPoleCharge = false;
    };

    // Now add public methods
    Game.prototype = {
        constructor: Game,
        fightToTheDeath: function () {
            var winner = null;
            while (this.hero1.isConscious() && this.hero2.isConscious() &&
                ((this.hero1.getDroppedWeapon() !== Weapon.NONE
                    || this.hero1.getReadiedWeapon() !== Weapon.NONE)
                    || (this.hero2.getDroppedWeapon() !== Weapon.NONE
                        || this.hero2.getReadiedWeapon() !== Weapon.NONE))
                ) {
                this.round++;
                this.hero1.newRound();
                this.hero2.newRound();

                if (require("./controller").isVerbose()) {
                    console.log("---> Round " + this.round + "\n");
                    console.log("Hero 1: " + this.hero1.getName() + ", ST: " + this.hero1.getST() + "(" + this.hero1.adjST() + ")\n");
                    console.log("Hero 2: " + this.hero2.getName() + ", ST: " + this.hero2.getST() + "(" + this.hero2.adjST() + ")\n");
                }

                /* Charge attack */
                if (Game.poleCharge && this.round == 1) {
                    this.hero1.setCharging(true);
                    this.hero2.setCharging(true);
                }


                /*
                 * Decide if defending
                 */
                tryDefending(this.hero1, this.hero2);
                tryDefending(this.hero2, this.hero1);

                var firstAttacker = this.hero1, secondAttacker = this.hero2;
            
                /* highest adjDx attacks first */
                if (this.hero1.adjustedDx() < this.hero2.adjustedDx()) {
                    firstAttacker = this.hero2;
                    secondAttacker = this.hero1;
                }
                /* roll to see who attacks first */
                else if (this.hero1.adjustedDx() == this.hero2.adjustedDx()) {
                    if (require("./controller").isVerbose())
                        console.log("Adjusted dexterities are equal, rolling to decide attack order\n");
                    if (Math.random() < 0.5) {
                        firstAttacker = this.hero2;
                        secondAttacker = this.hero1;
                    }
                }
                if (require("./controller").isVerbose())
                    console.log(firstAttacker.getName() +
                        " (adjDx = " + firstAttacker.adjustedDx() +
                        ") attacks before " + secondAttacker.getName() +
                        " (adjDx = " + secondAttacker.adjustedDx() + ")\n");

                tryStandUp(firstAttacker);
                tryStandUp(secondAttacker);
                tryPickUp(firstAttacker);
                tryPickUp(secondAttacker);
                tryAttack(this, firstAttacker, secondAttacker);
                tryAttack(this, secondAttacker, firstAttacker);
            }
            
            /* both broke/dropped weapons, draw */
            if (this.hero1.isConscious() && this.hero2.isConscious()) {
                winner = null;
            }
            else {
                winner = (this.hero1.isConscious() ? this.hero1 : this.hero2);
            }

            if (winner != null) {
                if (require("./controller").isVerbose())
                    console.log("-------> The winner of this bout is " + winner.getName() + "\n");
            }
            else {
                if (require("./controller").isVerbose())
                    console.log("-------> This bout was a TIE!\n");
            }
            return winner;
        },

    };

    /**
     * Private (static) functions, must be passed a "this" if you need access to Game
     */
    function tryDefending(defender, attacker) {
        if (!defender.isKnockedDown()
            && defender.getReadiedWeapon() !== Weapon.NONE
            && defender.sufferingDexPenalty()
            && defender.adjustedDx() < 8) {
            defender.setDefending();
            if (require("./controller").isVerbose())
                console.log(defender.getName() + " is defending this turn because adjDX < 8 and temporarily penalized.\n");
        }
        else if (Game.defendOnPoleCharge
            && !defender.isKnockedDown()
            && defender.getReadiedWeapon() !== Weapon.NONE
            && attacker.getReadiedWeapon() !== Weapon.NONE
            && attacker.getReadiedWeapon().isPole()
            && attacker.isCharging()) {
            defender.setDefending();
            if (require("./controller").isVerbose())
                console.log(defender.getName() + " is defending this turn because attacker is charging with pole weapon.\n");
        }
    }

    function tryStandUp(hero) {
        if (hero.isKnockedDown()) {
            hero.standUp();
            if (require("./controller").isVerbose())
                console.log(hero.getName() + " is standing up this turn.\n");
        }
    }

    function tryPickUp(hero) {
        if (hero.getDroppedWeapon() !== Weapon.NONE) {
            hero.pickUpWeapon();
            if (require("./controller").isVerbose())
                console.log(hero.getName() + " is picking up his weapon this turn (facing rear in all six directions).\n");
        }
    }

    function resolveAttack(game, attacker, attackee, roll, numDice) {
        var facingBonus = attacker.isProne();
        if (require("./controller").isVerbose()) {
            console.log(attacker.getName() + " rolling to hit. Rolled " + roll + " and adjDex is "
                + (attackee.isProne() ? (attacker.adjustedDx() + facingBonus + " (" + attacker.adjustedDx() + " + " + facingBonus + ", target is picking up a weapon)")
                    : attacker.adjustedDx())
                + "\n");
        }
        /**
         * A hit is a roll that is 
         * NOT an automatic miss AND
         * (below or equal to the attacker's adjDex OR and automatic hit)
         */
        if (!isAutomaticMiss(roll, numDice) && (roll <= attacker.adjustedDx() + facingBonus || isAutomaticHit(roll, numDice))) {
            if (require("./controller").isVerbose()) console.log("Hit! \n");
            //console.log(attacker.getReadiedWeapon());
            var hits = attacker.getReadiedWeapon().doDamage();
            if (attacker.isCharging() && attacker.getReadiedWeapon().isPole()) {
                if (require("./controller").isVerbose()) console.log("Pole weapon charge does double damage!\n");
                game.criticalHits++;
                hits *= 2;
            }
            if (isDoubleDamage(roll, numDice)) {
                if (require("./controller").isVerbose()) console.log("Double damage! (roll of " + roll + " on " + numDice + " dice.\n");
                game.criticalHits++;
                hits *= 2;
            }
            else if (isTripleDamage(roll, numDice)) {
                if (require("./controller").isVerbose()) console.log("Triple damage! (roll of " + roll + " on " + numDice + " dice.\n");
                game.criticalHits++;
                hits *= 3;
            }
            if (require("./controller").isVerbose()) console.log("Total damage done by " + attacker.getReadiedWeapon().getName() + ": " + hits + " hits\n");
            attackee.takeHits(hits);
            
        } else {
            /**
             * It's a miss
             */
            if (require("./controller").isVerbose()) console.log("Missed. \n");
            if (isDroppedWeapon(roll, numDice)) {
                if (require("./controller").isVerbose()) console.log("Dropped weapon! \n");
                game.criticalMisses++;
                attacker.dropWeapon();
            }
            else if (isBrokenWeapon(roll, numDice)) {
                if (require("./controller").isVerbose()) console.log("Broke weapon! \n");
                game.criticalMisses++;
                attacker.breakWeapon();
            }

        }

    };

    function tryAttack(game, attacker, attackee) {
        if (!attacker.isDefending()) {
            if (attacker.isConscious()) {
                if (!attacker.isKnockedDown()) {
                    if (attacker.getReadiedWeapon() !== Weapon.NONE) {
                        var numDice = attackee.isDefending() ? 4 : 3;
                        resolveAttack(game, attacker, attackee,
                            Die.rollDice(numDice), numDice);
                    } else {
                        if (require("./controller").isVerbose())
                            console.log(attacker.getName()
                                + " is not able to attack because he has has no readied weapon.\n");
                    }
                } else {
                    if (require("./controller").isVerbose())
                        console.log(attacker.getName()
                            + " is not able to attack because he was knocked down.\n");
                }
            } else {
                if (require("./controller").isVerbose())
                    console.log(attacker.getName()
                        + " is not able to attack because he is unconscious.\n");
            }
        } else {
            if (require("./controller").isVerbose())
                console.log(attacker.getName() + " is defending.\n");
        }

    };

    function isAutomaticMiss(roll, numDice) {
        var result = false;
        switch (numDice) {
            case 3:
                result = (roll >= 16);
                break;

            case 4:
                result = (roll >= 20);
                break;

            default:
                throw new RangeError("unsupported value for roll: " + roll);
                break;
        }
        return result;
    }

    function isAutomaticHit(roll, numDice) {
        var result = false;
        switch (numDice) {
            case 3:
                result = (roll <= 5);
                break;

            case 4:
                // 4 dice is assumed to be defending - no autmatic hits according to Melee rules
                result = false;
                break;

            default:
                throw new RangeError("unsupported value for roll: " + roll);
                break;
        }
        return result;
    }

    function isDoubleDamage(roll, numDice) {
        var result = false;
        switch (numDice) {
            case 3:
                result = (roll == 4);
                break;

            case 4:
                // 4 dice is assumed to be defending - no double damage according to Melee rules
                result = false;
                break;

            default:
                throw new RangeError("unsupported value for roll: " + roll);
                break;
        }
        return result;
    }

    function isTripleDamage(roll, numDice) {
        var result = false;
        switch (numDice) {
            case 3:
                result = (roll == 3);
                break;

            case 4:
                // 4 dice is assumed to be defending - no double damage according to Melee rules
                result = false;
                break;

            default:
                throw new RangeError("unsupported value for roll: " + roll);
                break;
        }
        return result;
    }

    function isDroppedWeapon(roll, numDice) {
        var result = false;
        switch (numDice) {
            case 3:
                result = (roll == 17);
                break;

            case 4:
                result = ((roll == 21) || (roll == 22));
                break;

            default:
                throw new RangeError("unsupported value for roll: " + roll);
                break;
        }
        return result;
    }

    function isBrokenWeapon(roll, numDice) {
        var result = false;
        switch (numDice) {
            case 3:
                result = (roll == 18);
                break;

            case 4:
                result = ((roll == 23) || (roll == 24));
                break;

            default:
                throw new RangeError("unsupported value for roll: " + roll);
                break;
        }
        return result;
    }

    return Game;
});

