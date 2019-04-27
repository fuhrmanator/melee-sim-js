define(['bunit', 'Shield', 'assert'], function(bunit, Shield, assert) {
    bunit('Shield initializers', {
        noShield: function() {
            assert(Shield.NO_SHIELD.getName()).equals('No shield');
            assert(Shield.NO_SHIELD.hitsStopped()).equals(0);
            assert(Shield.NO_SHIELD.getDexAdjustment()).equals(0);
        },
        leather: function() {
            assert(Shield.SMALL_SHIELD.getName()).equals('Small shield');
            assert(Shield.SMALL_SHIELD.hitsStopped()).equals(1);
            assert(Shield.SMALL_SHIELD.getDexAdjustment()).equals(0);
        },
        chain: function() {
            assert(Shield.LARGE_SHIELD.getName()).equals('Large shield');
            assert(Shield.LARGE_SHIELD.hitsStopped()).equals(2);
            assert(Shield.LARGE_SHIELD.getDexAdjustment()).equals(1);
        },
        funky: function() {
            var newShield = new Shield("funky", 8, 9);
            assert(newShield.getName()).equals('funky');
            assert(newShield.hitsStopped()).equals(8);
            assert(newShield.getDexAdjustment()).equals(9);
        },
    });

});