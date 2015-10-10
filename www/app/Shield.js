define(function () {
    "use strict";
    // Start with the constructor
    function Shield(name, hitsStopped, dxAdj) {
        this.name = name;
        this.hitsStopped = hitsStopped;
        this.hitsStopped = dxAdj;
    }

    // Now add methods
    Shield.prototype.getName = function () {
        return this.name;
    };

    Shield.prototype.hitsStopped = function () {
        return this.hitsStopped;
    };

    Shield.prototype.getDexAdjustment = function () {
        return this.dxAdj;
    };

    Shield.prototype.toString = function () {
        return this.name + " (" + this.hitsStopped + ")";
    }

    Shield.NO_SHIELD = new Shield("No shield", 0, 0);
    Shield.SMALL_SHIELD = new Shield("Small shield", 1, 0);
    Shield.LARGE_SHIELD = new Shield("Large shield", 2, 1);

    // And now return the constructor function
    return Shield;
});

