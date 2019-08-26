define(['bunit', 'Armor', 'assert'], function(bunit, Armor, assert) {
    bunit('Armor initializers', {
        noArmor: function() {
            assert(Armor.NO_ARMOR.getName()).equals('No armor');
            assert(Armor.NO_ARMOR.hitsStopped()).equals(0);
            assert(Armor.NO_ARMOR.getMAAdjustment()).equals(0);
            assert(Armor.NO_ARMOR.getDexAdjustment()).equals(0);
        },
        leather: function() {
            assert(Armor.LEATHER.getName()).equals('Leather');
            assert(Armor.LEATHER.hitsStopped()).equals(2);
            assert(Armor.LEATHER.getMAAdjustment()).equals(2);
            assert(Armor.LEATHER.getDexAdjustment()).equals(2);
        },
        chain: function() {
            assert(Armor.CHAIN.getName()).equals('Chain');
            assert(Armor.CHAIN.hitsStopped()).equals(3);
            assert(Armor.CHAIN.getMAAdjustment()).equals(4);
            assert(Armor.CHAIN.getDexAdjustment()).equals(4);
        },
        plate: function() {
            assert(Armor.PLATE.getName()).equals('Plate');
            assert(Armor.PLATE.hitsStopped()).equals(5);
            assert(Armor.PLATE.getMAAdjustment()).equals(6);
            assert(Armor.PLATE.getDexAdjustment()).equals(6);
        },
        funky: function() {
            var newArmor = new Armor("funky", 1, 2, 3);
            assert(newArmor.getName()).equals('funky');
            assert(newArmor.hitsStopped()).equals(1);
            assert(newArmor.getMAAdjustment()).equals(2);
            assert(newArmor.getDexAdjustment()).equals(3);
        },
    });

});