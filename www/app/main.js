define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    // var Hero = require('./Hero.js');
    // var h1 = new Hero("Joe", 12);
    // var h2 = new Hero("Mary", 12);
    // console.log(h1.getName(), h2.getName());
    
    var simulator = require('./simulator.js');

    // Load library/vendor modules using
    // full IDs, like:
    //var print = require('print');

    //print(messages.getHello());
    var heroes = require('./heroes.js');

    heroes.createHeroesList();

    var selectElement = document.getElementById("heroesSelected");
    selectElement.size = heroes.listHeight;
    document.getElementById('startSimulation').onclick = simulator.start;
});


//require(["simulator"], function (simulator) {
//    //heroes.createHeroesList();
//    //var select = document.getElementById("heroesSelected");
//    //select.applyElement('size=' + heroes.listHeight);
//    document.getElementById('startSimulation').onclick = simulator.start;
//});