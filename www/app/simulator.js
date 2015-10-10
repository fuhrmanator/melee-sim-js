define(["./HeroesSingleton", "./Hero", "./Weapon", "./Game"], function (HeroesSingleton, Hero, Weapon, Game) {
    "use strict";
    return {
        isVerboseChecked : true,
        isVerbose : function () {
            return this.isVerboseChecked;
        },
        start: function () {
            this.isVerboseChecked = document.getElementById("verboseOutput").checked;

            function tryAllCombinations(heroSet, boutCount) {
                var heroWins = {};  // map of hero and integer
                var game = null;
                var score = [2];
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
                        var sumRounds = 0;
                        score[0] = score[1] = 0;
                        console.log('Bout: ' + hero1.getName() + ' vs. ' + hero2.getName());
                        
                        for (var bout = 0; bout < boutCount; bout++) {
                            // clone heroes (resets them) prior to fighting
                            var fightingHero1 = Object.create(hero1);
                            var fightingHero2 = Object.create(hero2);
                            console.log(fightingHero1);
                            console.log(fightingHero2);
                            game = new Game(fightingHero1, fightingHero2);
                            var winningFighter = game.fightToTheDeath();
                            
                            if (winningFighter !== null) {
                                var losingFighter = (winningFighter == fightingHero1 ? fightingHero2 : fightingHero1);
                                score[(winningFighter == fightingHero1 ? 0 : 1)] ++;
                                heroWins[winningFighter.getName() + losingFighter.getName()] ++;
                            }
                            sumRounds += game.round;
                        }
                        /**
                         * Update the total stats for these heroes
                         */
                        
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
            //console.log(heroSet);
            
            var boutCount = document.getElementById("boutsPerMatchup").value;

            tryAllCombinations(heroSet, boutCount);
        }
    };
});