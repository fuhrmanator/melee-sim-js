define(function (require) {
    "use strict";

    var controller = require('./controller');
    var HeroesSingleton = require('./HeroesSingleton');

    /**
     * Initialize list of heroes to be selected
     */
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
    
    var selectElement = document.getElementById("heroesSelected");
    selectElement.size = HeroesSingleton.getListHeight();

    /**
     * Set up controller options
     */
    document.getElementById('startSimulation').onclick = controller.start;
    document.getElementById('stopSimulation').onclick = controller.stop;

});