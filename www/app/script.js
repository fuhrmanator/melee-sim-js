// script.js
var worker = new Worker('app/worker.js');

// following message will not be heard
worker.postMessage('listening');
worker.onmessage = function(e) {
	console.log("script: got message from script: ", e.data);
	switch(e.data) {
		case 'module loaded':
			worker.postMessage('data');
			break;
		case 'done':
			// update GUI
			break;
	}
}
