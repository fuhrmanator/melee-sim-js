importScripts('../lib/require.js');

require(['./Game'], function(Game) {
	postMessage('module loaded');
	onmessage = function(msg) {
		// do cool stuff
		console.log("worker: got message from worker: ", msg.data);
		postMessage('done');
	}
});
