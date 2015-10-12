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
    HeroesSingleton.createHeroesMap();
    var heroMap = HeroesSingleton.getHeroMap();
    // add to GUI
    for (var key in heroMap) {
        var hero = heroMap[key];
        var heroName = hero.getName();  // key
        var select = document.getElementById("heroesSelected");
        var opt = document.createElement('option');
        opt.value = heroName;
        opt.innerHTML = heroName;
        select.appendChild(opt);
    }
    
    //HeroesSingleton.displayHeroesList();

    var selectElement = document.getElementById("heroesSelected");
    selectElement.size = HeroesSingleton.getListHeight();
    document.getElementById('startSimulation').onclick = controller.start;
});