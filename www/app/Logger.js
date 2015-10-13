define(function () {
    "use strict";
    // Pattern from http://stackoverflow.com/a/10280735/1168342
    // Start with the constructor
    function Logger() {
        if (!(this instanceof Logger)) {
            throw new TypeError("Logger constructor cannot be called as a function.");
        }
    }

    var isMute = false;
    console.log(">>> Logger initing.");

    Logger.log = function (message) {
        if (!isMute) console.log(message);
    }

    Logger.setMute = function (changeIsMute) {
        isMute = changeIsMute;
        console.log("Logger.isMute set to " + isMute);
    }

    return Logger;
});
