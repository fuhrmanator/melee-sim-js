define(['bunit', 'Hero', 'Weapon', 'Armor', 'Shield', 'assert'], function (bunit, Hero, Weapon, Armor, Shield, assert) {
    bunit('Modifiers', {
        setUp: function () {
            return {
                hero: new Hero("Joe", 12, 12, Weapon.NONE, Armor.NO_ARMOR, Shield.NO_SHIELD),
                heroBroadswordLeather: new Hero("Joe BS Leather", 12, 12, Weapon.BROADSWORD, Armor.LEATHER, Shield.NO_SHIELD),
                heroLeather: new Hero("JoeLeather", 12, 12, Weapon.NONE, Armor.LEATHER, Shield.NO_SHIELD),
                heroOdd: new Hero("JoeOdd", 1, 2, Weapon.NONE, Armor.NO_ARMOR, Shield.NO_SHIELD),
            }
        },
        adjustedDx: function (o) {
            assert(o.hero.adjustedDx()).equals(12);
            assert(o.heroLeather.adjustedDx()).equals(10);
        },
        adjustedMA: function (o) {
            assert(o.hero.adjustedMA()).equals(10);
            assert(o.heroLeather.adjustedMA()).equals(8);
        },
        adjustedSt: function (o) {
            assert(o.hero.adjST()).equals(12);
            o.hero.takeHits(7);
            assert(o.hero.adjST()).equals(5);
            o.hero.takeHits(6);
            assert(o.hero.adjST()).equals(0);
        },
        getST: function (o) {
            assert(o.heroOdd.getST()).equals(1);
        },
        getDX: function (o) {
            assert(o.heroOdd.getDX()).equals(2);
        },
        getWeapon: function (o) {
            assert(o.heroOdd.getWeapon()).equals(Weapon.NONE);
        },
        getReadiedWeapon: function (o) {
            assert(o.heroOdd.getReadiedWeapon()).equals(Weapon.NONE);
        },
        getArmor: function (o) {
            assert(o.heroOdd.getArmor()).equals(Armor.NO_ARMOR);
        },
        getShield: function (o) {
            assert(o.heroOdd.getShield()).equals(Shield.NO_SHIELD);
        },
        canDoDamage: function (o) {
            assert(o.heroBroadswordLeather.canDoDamage());
            o.heroBroadswordLeather.dropWeapon();
            // can still do damage, after picking up weapon
            assert(o.heroBroadswordLeather.canDoDamage());
            // make hero unconscious
            o.heroBroadswordLeather.takeHits(11);
            assert(o.heroBroadswordLeather.isConscious()).not();
            assert(o.heroBroadswordLeather.canDoDamage()).not();

            let heroNew = new Hero("Fred", 12, 12, Weapon.BROADSWORD, Armor.NO_ARMOR, Shield.NO_SHIELD);
            assert(heroNew.canDoDamage());
            // make heroNew dead
            heroNew.takeHits(12);
            assert(heroNew.isAlive()).not();
            assert(heroNew.canDoDamage()).not();
        },
    });

});