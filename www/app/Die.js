﻿define(["./simulator", "require"], function (simulator, require) {
    "use strict";
    // Pattern from http://stackoverflow.com/a/10280735/1168342
    // Start with the constructor
    function Die() {
        if (!(this instanceof Die)) {
            throw new TypeError("Die constructor cannot be called as a function.");
        }
    }

    Die.roll= function () {
        var roll = Math.floor(Math.random() * 6 + 1);
		if (require("./simulator").isVerbose())
			console.log(
				"Die roll: " + roll + "\n");
		return roll;
    }

    Die.rollDice= function (numDice) {
		if (require("./simulator").isVerbose())
			console.log(
				"Rolling " + numDice + " dice...\n");
        var result = 0;
        for (var i = 0; i < numDice; i++) {
            result += Die.roll();
        }
        return result;
    }

    Die.rollThreeDice= function (numDice) {
        return Die.rollDice(3);
    }

    Die.rollFourDice= function (numDice) {
        return Die.rollDice(4);
    }

    return Die;
});

