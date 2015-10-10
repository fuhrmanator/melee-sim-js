define(["./HeroesSingleton", "./Hero", "./Weapon"], function (HeroesSingleton, Hero, Weapon) {
    "use strict";
    return {
        start: function () {
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
            console.log('Starting simulation');
            var selectElement = document.getElementById("heroesSelected");
            var selectedHeroes = getSelectedValues(selectElement);
            HeroesSingleton.displayHeroesList();
            selectedHeroes.forEach(function (heroName) {
                console.log("Selected hero: '" + heroName + "'" + " len = " + heroName.length);
                var hero = HeroesSingleton.getHeroList()[heroName];
                console.log(hero.getName() + ", " + hero.getWeapon());
            }, this);
        }
    };
});