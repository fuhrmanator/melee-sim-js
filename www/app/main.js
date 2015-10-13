// TODO take all game rules out of Hero, Armor, Weapon, etc. and move to Game class - this will decouple dependencies on Logger
// TODO make JSON string for Heroes

define(function (require) {
    "use strict";
    // Load any app-specific modules
    // with a relative require call,
    // like:    

    var controller = require('./controller');

    // Load library/vendor modules using
    // full IDs, like:
    //var print = require('print');

    //print(messages.getHello());


    var HeroesSingleton = require('./HeroesSingleton');

    var select = document.getElementById("heroesSelected");
    var opt = null;
    var heroesListJSON = HeroesSingleton.getHeroesListJSON();
    for (var i = 0; i < heroesListJSON.length; i++) {
        var heroJSON = heroesListJSON[i];
        opt = document.createElement('option');
        opt.value = heroJSON.name;
        opt.innerHTML = heroJSON.name;
        select.appendChild(opt);        
    }
    
    //HeroesSingleton.displayHeroesList();

    var selectElement = document.getElementById("heroesSelected");
    selectElement.size = HeroesSingleton.getListHeight();
    document.getElementById('startSimulation').onclick = controller.start;
});