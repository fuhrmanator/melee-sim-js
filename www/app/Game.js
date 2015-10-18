define(["./HeroesSingleton", "./Hero", "./Weapon", "./Armor", "./Shield", "./Die", "./Logger"], function (HeroesSingleton, Hero, Weapon, Armor, Shield, Die, Logger) {
    "use strict";
    // Pattern from http://stackoverflow.com/a/10280735/1168342'
    
    var heroMap = {}; // singleton 
    
    // Start with the constructor
    function Game(hero1, hero2, poleCharge, defendOnPoleCharge) {
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
        this.poleCharge = poleCharge;
        this.defendOnPoleCharge = defendOnPoleCharge;
        this.heroMap = {};
        Logger.log("New Game with pole charge set to " + this.poleCharge + " and defend on pole charge set to " + this.defendOnPoleCharge);
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


                Logger.log("---> Round " + this.round);
                Logger.log("Hero 1: " + this.hero1.getName() + ", ST: " + this.hero1.getST() + "(" + this.hero1.adjST() + ")");
                Logger.log("Hero 2: " + this.hero2.getName() + ", ST: " + this.hero2.getST() + "(" + this.hero2.adjST() + ")");

                /* Charge attack */
                // if (Game.poleCharge && this.round == 1) {
                //     this.hero1.setCharging(true);
                //     this.hero2.setCharging(true);
                // } else {
                //     this.hero1.setCharging(false);
                //     this.hero2.setCharging(true);
                // }

                this.hero1.setCharging((this.poleCharge) && (this.round == 1));
                this.hero2.setCharging((this.poleCharge) && (this.round == 1));

                /*
                 * Decide if defending
                 */
                tryDefending(this.hero1, this.hero2, this.defendOnPoleCharge);
                tryDefending(this.hero2, this.hero1, this.defendOnPoleCharge);

                var firstAttacker = this.hero1, secondAttacker = this.hero2;
            
                /* highest adjDx attacks first */
                if (this.hero1.adjustedDx() < this.hero2.adjustedDx()) {
                    firstAttacker = this.hero2;
                    secondAttacker = this.hero1;
                }
                /* roll to see who attacks first */
                else if (this.hero1.adjustedDx() == this.hero2.adjustedDx()) {

                    Logger.log("Adjusted dexterities are equal, rolling to decide attack order");
                    if (Math.random() < 0.5) {
                        firstAttacker = this.hero2;
                        secondAttacker = this.hero1;
                    }
                }

                Logger.log(firstAttacker.getName() +
                    " (adjDx = " + firstAttacker.adjustedDx() +
                    ") attacks before " + secondAttacker.getName() +
                    " (adjDx = " + secondAttacker.adjustedDx() + ")");

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

                Logger.log("-------> The winner of this bout is " + winner.getName());
            }
            else {

                Logger.log("-------> This bout was a TIE!");
            }
            return winner;
        },

    };

    /**
     * Private (static) functions, must be passed a "this" if you need access to Game
     */
    function tryDefending(defender, attacker, defendOnPoleCharge) {
        if (!defender.isKnockedDown()
            && defender.getReadiedWeapon() !== Weapon.NONE
            && defender.sufferingDexPenalty()
            && defender.adjustedDx() < 8) {
            defender.setDefending();

            Logger.log(defender.getName() + " is defending this turn because adjDX < 8 and temporarily penalized.");
        }
        else if (defendOnPoleCharge
            && !defender.isKnockedDown()
            && defender.getReadiedWeapon() !== Weapon.NONE
            && attacker.getReadiedWeapon() !== Weapon.NONE
            && attacker.getReadiedWeapon().isPole()
            && attacker.isCharging()) {
            defender.setDefending();

            Logger.log(defender.getName() + " is defending this turn because attacker is charging with pole weapon.");
        }
    }

    function tryStandUp(hero) {
        if (hero.isKnockedDown()) {
            hero.standUp();

            Logger.log(hero.getName() + " is standing up this turn.");
        }
    }

    function tryPickUp(hero) {
        if (hero.getDroppedWeapon() !== Weapon.NONE) {
            hero.pickUpWeapon();
            Logger.log(hero.getName() + " is picking up his weapon this turn (facing rear in all six directions).");
        }
    }

    function resolveAttack(game, attacker, attackee, roll, numDice) {
        var facingBonus = 4;
        
        if (attacker.isCharging()) Logger.log("Charging with pole weapon.");
        
        Logger.log(attacker.getName() + " rolling to hit. Rolled " + roll + " and adjDex is "
            + (attackee.isProne() ? (attacker.adjustedDx() + facingBonus + " (" + attacker.adjustedDx() + " + " + facingBonus + ", target is prone, i.e., knocked down or picking up a weapon)")
                : attacker.adjustedDx()));

        /**
         * A hit is a roll that is 
         * NOT an automatic miss AND
         * (below or equal to the attacker's adjDex OR and automatic hit)
         */
        if (!isAutomaticMiss(roll, numDice) && (roll <= attacker.adjustedDx() + facingBonus || isAutomaticHit(roll, numDice))) {
            Logger.log("Hit! ");

            var hits = attacker.getReadiedWeapon().doDamage();
            if (attacker.isCharging() && attacker.getReadiedWeapon().isPole()) {
                Logger.log("Pole weapon charge does double damage!");
                game.criticalHits++;
                hits *= 2;
            }
            if (isDoubleDamage(roll, numDice)) {
                Logger.log("Double damage! (roll of " + roll + " on " + numDice + " dice.)");
                game.criticalHits++;
                hits *= 2;
            }
            else if (isTripleDamage(roll, numDice)) {
                Logger.log("Triple damage! (roll of " + roll + " on " + numDice + " dice.)");
                game.criticalHits++;
                hits *= 3;
            }
            Logger.log("Total damage done by " + attacker.getReadiedWeapon().getName() + ": " + hits + " hits");
            attackee.takeHits(hits);

        } else {
            /**
             * It's a miss
             */
            Logger.log("Missed. ");
            if (isDroppedWeapon(roll, numDice)) {
                Logger.log("Dropped weapon! ");
                game.criticalMisses++;
                attacker.dropWeapon();
            }
            else if (isBrokenWeapon(roll, numDice)) {
                Logger.log("Broke weapon! ");
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

                        Logger.log(attacker.getName()
                            + " is not able to attack because he has has no readied weapon.");
                    }
                } else {

                    Logger.log(attacker.getName()
                        + " is not able to attack because he was knocked down.");
                }
            } else {

                Logger.log(attacker.getName()
                    + " is not able to attack because he is " + (attacker.isDead() ? "dead." : "unconscious."));
            }
        } else {

            Logger.log(attacker.getName() + " is defending.");
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
    };

    Game.createHeroesMap = function () {
        // heroSet.put(new Hero("001:ST8;DX16;DAGGER;NO_ARMOR;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.SMALL_SHIELD), new Integer(0));
        var h1;
        var heroesListJSON = HeroesSingleton.getHeroesListJSON();
        var heroJSON = null;
        for (var i = 0; i < heroesListJSON.length; i++) {
            heroJSON = heroesListJSON[i];
            h1 = new Hero(heroJSON.name, heroJSON.st, heroJSON.dx, Weapon[heroJSON.weapon], Armor[heroJSON.armor], Shield[heroJSON.shield]);
            putHero(h1);
        }
    };

    function putHero(hero) {
        // add to hashmap
        //            console.log("Hero name (index to map): '" + heroName + "'" + " len = " + heroName.length);
        heroMap[hero.getName()] = hero;
        //console.log(hero.toString());
        // http://stackoverflow.com/a/7196296/1168342
        // this.heroList.push({key:heroName, value:hero});
        //console.log("Hero list = " + Object.keys(this.heroList));
    };
    function displayHeroesMap() {
        console.log(Object.keys(heroMap));
    };

    Game.getHeroMap = function () {
        return heroMap;
    };


    return Game;
});

