define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var simulator = require('./simulator.js');
    if (typeof simulator != 'undefined') {
        
    } else {
        alert("Failure");
    }

    // Load library/vendor modules using
    // full IDs, like:
    //var print = require('print');

    //print(messages.getHello());
    var heroes = require('./heroes.js');

    heroes.createHeroesList();

    var selectElement = document.getElementById("heroesSelected");
    console.log(selectElement);
    //selectElement.applyElement('size=' + heroes.listHeight);
    document.getElementById('startSimulation').onclick = simulator.start;
});


//require(["simulator"], function (simulator) {
//    //heroes.createHeroesList();
//    //var select = document.getElementById("heroesSelected");
//    //select.applyElement('size=' + heroes.listHeight);
//    document.getElementById('startSimulation').onclick = simulator.start;
//});