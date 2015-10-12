    self.console.log("Simulator started...");
    
    self.addEventListener('message', function (event) {
        /**
         * Only one type of message to start this thread
         */
        var data = event.data;
        self.console.log("simulator: got a message", data);
        self.postMessage({"cmd": "update", "progress" : 0});

    }, false);

    function updateProgress() {
        var progressBar = document.getElementById("progress");
        if (progressBar.value < progressBar.max) {
            setTimeout(updateProgress, 80);
        } else {
            return;
        }
    }