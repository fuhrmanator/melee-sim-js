define(["./Hero", "./Weapon", "./Armor", "./Shield"], function (Hero, Weapon, Armor, Shield) {
    "use strict";
    // http://stackoverflow.com/a/9753841/1168342
    var listHeight = 2;
    var heroList = {};
    console.log("Loading HeroesSingleton");
    return {
        createHeroesList: function () {
            console.log("creating Heroes list...")
            // heroSet.put(new Hero("001:ST8;DX16;DAGGER;NO_ARMOR;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.SMALL_SHIELD), new Integer(0));
            var h1;
            h1 = new Hero("001:ST8;DX16;DAGGER;NO_ARMOR;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.SMALL_SHIELD);
            this.addHero(h1);
            h1 = new Hero("002:ST8;DX16;DAGGER;LEATHER;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.LEATHER, Shield.SMALL_SHIELD);
            this.addHero(h1);

            listHeight = 2;
        },
        addHero: function (hero) {
            // add to GUI
            var heroName = hero.getName();
            var select = document.getElementById("heroesSelected");
            var opt = document.createElement('option');
            opt.value = heroName;
            opt.innerHTML = heroName;
            select.appendChild(opt);
            // add to hashmap
            console.log("Hero name (index to map): '" + heroName + "'" + " len = " + heroName.length);
            heroList[heroName] = hero;
            // http://stackoverflow.com/a/7196296/1168342
            // this.heroList.push({key:heroName, value:hero});
            //console.log("Hero list = " + Object.keys(this.heroList));
        },
        getHeroList : function () {
            return heroList;
        },
        displayHeroesList: function () {
            console.log(Object.keys(heroList));
        }
        
    }
    
});
