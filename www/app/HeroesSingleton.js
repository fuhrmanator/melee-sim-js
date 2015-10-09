define(["./Hero", "./Weapon", "./Armor", "./Shield"], function (Hero, Weapon, Armor, Shield) {
    // http://stackoverflow.com/a/9753841/1168342
    // define(function (require) {
    //     var singleton = function () {
    //         return {
    //             ...
    //         };
    //     };
    //     return singleton();
    // });

    // define(function(){
    //     var instance = null;

    //     function MySingleton(){
    //         if(instance !== null){
    //             throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()");
    //         } 
        
    //         this.initialize();
    //     }
    //     MySingleton.prototype = {
    //         initialize: function(){
    //             // summary:
    //             //      Initializes the singleton.
            
    //             this.foo = 0;
    //             this.bar = 1;
    //         }
    //     };
    //     MySingleton.getInstance = function(){
    //         // summary:
    //         //      Gets an instance of the singleton. It is better to use 
    //         if(instance === null){
    //             instance = new MySingleton();
    //         }
    //         return instance;
    //     };

    //     return MySingleton.getInstance();
    // });
    var instance = null;
    function HeroesSingleton() {
        console.log("HeroesSingleton constructor");
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one heroesSingleton, use heroesSingleton.getInstance()");
        }
        this.initialize();
    }
    HeroesSingleton.prototype = {
        initialize: function () {
            console.log("HeroesSingleton initializing...");
            this.listHeight = 0;
            this.heroList = [];
        },
        createHeroesList: function () {
            console.log("creating Heroes list...")
            // heroSet.put(new Hero("001:ST8;DX16;DAGGER;NO_ARMOR;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.SMALL_SHIELD), new Integer(0));
            var h1;
            h1 = new Hero("001:ST8;DX16;DAGGER;NO_ARMOR;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.SMALL_SHIELD);
            this.addHero(h1);
            h1 = new Hero("002:ST8;DX16;DAGGER;LEATHER;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.LEATHER, Shield.SMALL_SHIELD);
            this.addHero(h1);

            this.listHeight = 2;
    
            // var testHeroFetch = this.heroList[h1.getName()];
            // console.log(testHeroFetch.getName());
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
            this.heroList[heroName] = hero;
            // http://stackoverflow.com/a/7196296/1168342
            // this.heroList.push({key:heroName, value:hero});
            //console.log("Hero list = " + Object.keys(this.heroList));
        },
        displayHeroesList: function () {
            console.log("Hero list = \n" + Object.keys(this.heroList));
        }
    }
    HeroesSingleton.getInstance = function () {
        // summary:
        //      Gets an instance of the singleton. It is better to use 
        if (instance === null) {
            console.log("getInstance() not null");
            instance = new HeroesSingleton();            
        }
        return instance;
    };

    return HeroesSingleton.getInstance();
});
