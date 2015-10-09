define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:    

    var simulator = require('./simulator');

    // Load library/vendor modules using
    // full IDs, like:
    //var print = require('print');

    //print(messages.getHello());


    var HeroesSingleton = require('./HeroesSingleton');
    HeroesSingleton.createHeroesList();
    HeroesSingleton.displayHeroesList();
    
    var selectElement = document.getElementById("heroesSelected");
    selectElement.size = HeroesSingleton.listHeight;
    document.getElementById('startSimulation').onclick = simulator.start;
});