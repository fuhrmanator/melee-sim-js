define(['bunit', 'Die', 'assert'], function(bunit, Die, assert) {
    bunit('Die roll', {
        roll: function() {
            var roll = Die.roll();

            assert(roll).between(1,6);
        }
    });
    bunit('Die rollDice', {
        rollDice: function() {
            for(var i=0; i<1000; i++) {
                assert(Die.rollDice(2)).between(2,12)
            };
        },
        rollThreeDice: function() {
            for(var i=0; i<1000; i++) {
                assert(Die.rollThreeDice()).between(3,18)
            };
        },
        rollfourDice: function() {
            for(var i=0; i<1000; i++) {
                assert(Die.rollFourDice()).between(4,24)
            };
        }
    });

});