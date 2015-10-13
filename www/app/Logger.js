define(function () {
    "use strict";
    // Pattern from http://stackoverflow.com/a/10280735/1168342
    // Start with the constructor
    function Logger() {
        if (!(this instanceof Logger)) {
            throw new TypeError("Logger constructor cannot be called as a function.");
        }
    }

    var isMute = true; 
    console.log(">>> Logger initing.");

    Logger.log = function (message) {
        console.log(isMute);
        if (!isMute) console.log(message);
    }

    return Logger;
});
