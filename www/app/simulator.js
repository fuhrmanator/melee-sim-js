importScripts('../lib/require.js');

require(["./HeroesSingleton", "./Hero", "./Armor", "./Shield", "./Weapon", "./Game", "./controller", "./Logger"], function (HeroesSingleton, Hero, Armor, Shield, Weapon, Game, controller, Logger) {
    "use strict";

    var poleWeaponsChargeFirstRound = null;
    var defendVsPoleCharge = null;
    
    postMessage({ "cmd": "worker started" });

    onmessage = function (event) {
        /**
         * Only one type of message to start this thread
         */
        var data = event.data;
        var heroSet = [];  // list of heroes to fight
            
        Game.createHeroesMap();
        var completeHeroMap = Game.getHeroMap();
        data.selectedHeroes.forEach(function (heroName) {
            var hero = completeHeroMap[heroName];
            heroSet.push(hero);
        }, this);

        /**
         * Configure simulator options
         */
        Logger.setMute(!data.isVerbose);
        poleWeaponsChargeFirstRound = data.isPoleWeaponsChargeFirstRound;
        defendVsPoleCharge = data.isDefendVsPoleCharge;

        tryAllCombinations(heroSet, data.boutCount);
    };

    //self.console.log("onmessage set... waiting for a message");

    function tryAllCombinations(heroSet, boutCount) {
        var matchupWins = {};  // map of hero and integer
        var heroWins = {};
        var game = null;
        var score = [2];
        var progress = 0;
        // how many bouts total is N * N-1 * boutCount
        var totalIterations = heroSet.length * (heroSet.length-1) * boutCount / 2;
        var iterationCount = 0;
        heroSet.forEach(function (hero1) {
            heroWins[hero1.getName()] = 0;
            heroSet.forEach(function (hero2) {
                if (hero1 != hero2) matchupWins[hero1.getName() + "/" + hero2.getName()] = 0;
            }, this);
        }, this);
        //console.log(heroWins);
                
        for (var h1 = 0; h1 < heroSet.length; h1++) {
            var hero1 = heroSet[h1];
            var h2 = 0;
            var hero2 = heroSet[h2];

            for (h2 = h1 + 1; h2 < heroSet.length; h2++) {
                hero2 = heroSet[h2];
                var sumRounds = 0;
                score[0] = 0;
                score[1] = 0;
                Logger.log('Matchup: ' + hero1.getName() + ' vs. ' + hero2.getName());

                for (var bout = 0; bout < boutCount; bout++) {
                    Logger.log("Bout: " + bout+1 + " of " + boutCount);
                    /**
                    * update progress bar on page (assumes max is 100)
                    */
                    progress = Math.ceil((++iterationCount/ totalIterations) * 100);
                    self.postMessage({ "cmd": "progressUpdate", "progress": progress });

                    // clone heroes (resets them) prior to fighting
                    var fightingHero1 = Object.create(hero1);
                    var fightingHero2 = Object.create(hero2);
                    // console.log(fightingHero1);
                    // console.log(fightingHero2);
                    game = new Game(fightingHero1, fightingHero2, poleWeaponsChargeFirstRound, defendVsPoleCharge);
                    var winningFighter = game.fightToTheDeath();

                    if (winningFighter !== null) {
                        var losingFighter = (winningFighter == fightingHero1 ? fightingHero2 : fightingHero1);
                        score[(winningFighter == fightingHero1 ? 0 : 1)]++;
                        matchupWins[winningFighter.getName() + "/" + losingFighter.getName()]++;
                    }
                    sumRounds += game.round;
                }
                /**
                 * Update the total stats for these heroes
                 */
                heroWins[hero1.getName()] += score[0];
                heroWins[hero2.getName()] += score[1];
            }

        }
        /**
         * Put stats back on page
         */
        // var heroWinsTable = createTableFromProperties(heroWins);
        // document.getElementById("heroWins").appendChild(heroWinsTable);
        // var matchupWinsTable = createTableFromProperties(matchupWins);
        // document.getElementById("matchupWins").appendChild(matchupWinsTable);
        self.postMessage({ "cmd": "finished", "heroWins": heroWins, "matchupWins": matchupWins });
    }


    function updateProgress() {
        var progressBar = document.getElementById("progress");
        if (progressBar.value < progressBar.max) {
            setTimeout(updateProgress, 80);
        } else {
            return;
        }
    }

            
    // // Start starts here ;-)
    // // 'this' is the button that was clicked (onclick)
    // this.disabled = true;
    // console.log('Starting simulation');
    // var selectElement = document.getElementById("heroesSelected");
    // var selectedHeroes = getSelectedValues(selectElement);
    // var heroSet = [];  // list of heroes to fight
            
    // selectedHeroes.forEach(function (heroName) {
    //     var hero = HeroesSingleton.getHeroList()[heroName];
    //     heroSet.push(hero);
    // }, this);
    // //console.log(heroSet);
            
    // var boutCount = document.getElementById("boutsPerMatchup").value;

    // updateProgress();
    // tryAllCombinations(heroSet, boutCount);
    // this.disabled = false;
});
