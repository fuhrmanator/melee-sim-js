define(['bunit', 'Weapon', 'assert'], function (bunit, Weapon, assert) {
    bunit('Weapon initializers', {
        none: function () {
            var w = Weapon.NONE;
            assert(w.getName()).equals('None');
            assert(w.getST()).equals(0);
            assert(w.getDice()).equals(0);
            assert(w.getModifier()).equals(0);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isThrown()).equals(false);
            assert(w.isPole()).equals(false);
        },
        dagger: function () {
            var w = Weapon.DAGGER;
            assert(w.getName()).equals('Dagger');
            assert(w.getST()).equals(0);
            assert(w.getDice()).equals(1);
            assert(w.getModifier()).equals(-1);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        rapier: function () {
            var w = Weapon.RAPIER;
            assert(w.getName()).equals('Rapier');
            assert(w.getST()).equals(9);
            assert(w.getDice()).equals(1);
            assert(w.getModifier()).equals(0);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        club: function () {
            var w = Weapon.CLUB;
            assert(w.getName()).equals('Club');
            assert(w.getST()).equals(9);
            assert(w.getDice()).equals(1);
            assert(w.getModifier()).equals(0);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        hammer: function () {
            var w = Weapon.HAMMER;
            assert(w.getName()).equals('Hammer');
            assert(w.getST()).equals(10);
            assert(w.getDice()).equals(1);
            assert(w.getModifier()).equals(1);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        cutlass: function () {
            var w = Weapon.CUTLASS;
            assert(w.getName()).equals('Cutlass');
            assert(w.getST()).equals(10);
            assert(w.getDice()).equals(2);
            assert(w.getModifier()).equals(-2);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        shortsword: function () {
            var w = Weapon.SHORTSWORD;
            assert(w.getName()).equals('Shortsword');
            assert(w.getST()).equals(11);
            assert(w.getDice()).equals(2);
            assert(w.getModifier()).equals(-1);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        mace: function () {
            var w = Weapon.MACE;
            assert(w.getName()).equals('Mace');
            assert(w.getST()).equals(11);
            assert(w.getDice()).equals(2);
            assert(w.getModifier()).equals(-1);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        small_ax: function () {
            var w = Weapon.SMALL_AX;
            assert(w.getName()).equals('Small ax');
            assert(w.getST()).equals(11);
            assert(w.getDice()).equals(1);
            assert(w.getModifier()).equals(2);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        broadsword: function () {
            var w = Weapon.BROADSWORD;
            assert(w.getName()).equals('Broadsword');
            assert(w.getST()).equals(12);
            assert(w.getDice()).equals(2);
            assert(w.getModifier()).equals(0);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        morningstar: function () {
            var w = Weapon.MORNINGSTAR;
            assert(w.getName()).equals('Morningstar');
            assert(w.getST()).equals(13);
            assert(w.getDice()).equals(2);
            assert(w.getModifier()).equals(1);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(false);
        },
        two_handed_sword: function () {
            var w = Weapon.TWO_HANDED_SWORD;
            assert(w.getName()).equals('Two-handed sword');
            assert(w.getST()).equals(14);
            assert(w.getDice()).equals(3);
            assert(w.getModifier()).equals(-1);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(true);
            assert(w.isPole()).equals(false);
        },
        battleaxe: function () {
            var w = Weapon.BATTLEAXE;
            assert(w.getName()).equals('Battleaxe');
            assert(w.getST()).equals(15);
            assert(w.getDice()).equals(3);
            assert(w.getModifier()).equals(0);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(true);
            assert(w.isPole()).equals(false);
        },
        javelin: function () {
            var w = Weapon.JAVELIN;
            assert(w.getName()).equals('Javelin');
            assert(w.getST()).equals(9);
            assert(w.getDice()).equals(1);
            assert(w.getModifier()).equals(-1);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(true);
        },
        spear: function () {
            var w = Weapon.SPEAR;
            assert(w.getName()).equals('Spear');
            assert(w.getST()).equals(11);
            assert(w.getDice()).equals(1);
            assert(w.getModifier()).equals(1);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(true);
            assert(w.isPole()).equals(true);
        },
        halberd: function () {
            var w = Weapon.HALBERD;
            assert(w.getName()).equals('Halberd');
            assert(w.getST()).equals(13);
            assert(w.getDice()).equals(2);
            assert(w.getModifier()).equals(-1);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(true);
            assert(w.isPole()).equals(true);
        },
        pike_axe: function () {
            var w = Weapon.PIKE_AXE;
            assert(w.getName()).equals('Pike axe');
            assert(w.getST()).equals(15);
            assert(w.getDice()).equals(2);
            assert(w.getModifier()).equals(2);
            assert(w.isThrown()).equals(false);
            assert(w.isTwoHanded()).equals(true);
            assert(w.isPole()).equals(true);
        },
        funky: function () {
            var w = new Weapon("funky", 4, 5, 6, true, false, true);
            assert(w.getName()).equals('funky');
            assert(w.getST()).equals(4);
            assert(w.getDice()).equals(5);
            assert(w.getModifier()).equals(6);
            assert(w.isThrown()).equals(true);
            assert(w.isTwoHanded()).equals(false);
            assert(w.isPole()).equals(true);
        },
    });
    bunit('Weapon damage', {
        daggerDamage: function () {
            var w = Weapon.DAGGER;
            var results = this._calculateWeaponResults(w);
            var expectedResults = this._calculateExpectedResults(w);
            var difference = this._difference(results, expectedResults);
            assert(difference.size).equals(0);
        },
        halberdDamage: function () {
            var w = Weapon.HALBERD;
            var results = this._calculateWeaponResults(w);
            var expectedResults = this._calculateExpectedResults(w);
            var difference = this._difference(results, expectedResults);
            assert(difference.size).equals(0);
        },
        pikeaxeDamage: function () {
            var w = Weapon.PIKE_AXE;
            var results = this._calculateWeaponResults(w);
            var expectedResults = this._calculateExpectedResults(w);
            var difference = this._difference(results, expectedResults);
            assert(difference.size).equals(0);
        },
        twoHandedSwordDamage: function () {
            var w = Weapon.TWO_HANDED_SWORD;
            var results = this._calculateWeaponResults(w);
            var expectedResults = this._calculateExpectedResults(w);
            var difference = this._difference(results, expectedResults);
            assert(difference.size).equals(0);
        },
        battleaxeDamage: function () {
            var w = Weapon.BATTLEAXE;
            var results = this._calculateWeaponResults(w);
            var expectedResults = this._calculateExpectedResults(w);
            var difference = this._difference(results, expectedResults);
            assert(difference.size).equals(0);
        },
        _calculateWeaponResults: function (weapon) {
            var results = new Set();
            for (let i = 0; i < 1000; i++) {
                results.add(weapon.doDamage());
            };
            return results;
        },
        _calculateExpectedResults: function (weapon) {
            var expectedResults = new Set();
            let lower = weapon.getDice() + weapon.getModifier();
            let upper = weapon.getDice()*6 + weapon.getModifier();
            for (let j = lower; j <= upper; j++) {
                expectedResults.add(j);
            };
            return expectedResults;
        },
        _difference: function (set1, set2) {
            return new Set([...set1].filter(x => !set2.has(x)));
        },

    });

});