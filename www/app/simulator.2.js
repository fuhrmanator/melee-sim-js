importScripts('../lib/require.js');

require(["./Game"], function (Game) {

//    console.log("Simulator started...");

    onmessage = function (event) {
        /**
         * Only one type of message to start this thread
         */
        var data = event.data;
        self.console.log("simulator: got a message", data);
        self.postMessage({ "cmd": "update", "progress": 0 });
        // tryAllCombinations(data.heroSet, data.boutCount);
    }

    self.console.log("onmessage set... waiting for a message");
});
