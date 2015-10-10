define(["./HeroesSingleton", "./Hero", "./Weapon"], function (HeroesSingleton, Hero, Weapon) {
    "use strict";
    return {
        start: function () {

            function tryAllCombinations(heroSet) {
                var heroWins = {};  // map of hero and integer
                heroSet.forEach(function (hero1) {
                    heroSet.forEach(function (hero2) {
                        heroWins[hero1.getName() + hero2.getName()] = 0;
                    }, this);
                }, this);
                //console.log(heroWins);
                
                for (var h1 = 0; h1 < heroSet.length; h1++) {
                    var hero1 = heroSet[h1];
                    var h2 = 0;
                    var hero2 = heroSet[h2];
                    while (h1 != h2 && h2 < heroSet.length) {
                        hero2 = heroSet[h2];
                        h2++;
                    }
                    for ( ; h2 < heroSet.length; h2++) {
                        hero2 = heroSet[h2];
                        console.log('Bout: ' + hero1.getName() + ' vs. ' + hero2.getName());
                    }
                    
                }
                
            }

            // http://stackoverflow.com/a/5867262/1168342
            function getSelectedValues(selectElement) {
                var result = [];
                var options = selectElement && selectElement.options;
                var opt;

                for (var i = 0, iLen = options.length; i < iLen; i++) {
                    opt = options[i];

                    if (opt.selected) {
                        result.push(opt.value || opt.text);
                    }
                }
                return result;
            }
            
            // Start starts here ;-)
            console.log('Starting simulation');
            var selectElement = document.getElementById("heroesSelected");
            var selectedHeroes = getSelectedValues(selectElement);
            var heroSet = [];  // list of heroes to fight
            
            selectedHeroes.forEach(function (heroName) {
                var hero = HeroesSingleton.getHeroList()[heroName];
                heroSet.push(hero);
            }, this);
            console.log(heroSet);

            tryAllCombinations(heroSet);
        }
    };
});