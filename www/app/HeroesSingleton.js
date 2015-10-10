define(["./Hero", "./Weapon", "./Armor", "./Shield"], function (Hero, Weapon, Armor, Shield) {
    "use strict";
    // http://stackoverflow.com/a/9753841/1168342
    var listHeight = 0;
    var heroList = {};
    //    console.log("Loading HeroesSingleton");
    return {
        createHeroesList: function () {
            console.log("creating Heroes list...")
            // heroSet.put(new Hero("001:ST8;DX16;DAGGER;NO_ARMOR;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.SMALL_SHIELD), new Integer(0));
            var h1;
            h1 = new Hero("001:ST8;DX16;DAGGER;NO_ARMOR;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.SMALL_SHIELD);
            this.addHero(h1);
            h1 = new Hero("002:ST8;DX16;DAGGER;LEATHER;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.LEATHER, Shield.SMALL_SHIELD);
            this.addHero(h1);
            h1 = new Hero("003:ST8;DX16;DAGGER;CHAIN;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.CHAIN, Shield.SMALL_SHIELD);
            this.addHero(h1);
            h1 = new Hero("004:ST8;DX16;DAGGER;PLATE;SMALL_SHIELD", 8, 16, Weapon.DAGGER, Armor.PLATE, Shield.SMALL_SHIELD); 
            this.addHero(h1);
            h1 = new Hero("005:ST8;DX16;DAGGER;NO_ARMOR;LARGE_SHIELD", 8, 16, Weapon.DAGGER, Armor.NO_ARMOR, Shield.LARGE_SHIELD); 
            this.addHero(h1);
            h1 = new Hero("006:ST8;DX16;DAGGER;LEATHER;LARGE_SHIELD", 8, 16, Weapon.DAGGER, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("007:ST8;DX16;DAGGER;CHAIN;LARGE_SHIELD", 8, 16, Weapon.DAGGER, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("008:ST8;DX16;DAGGER;PLATE;LARGE_SHIELD", 8, 16, Weapon.DAGGER, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("009:ST9;DX15;RAPIER;NO_ARMOR;SMALL_SHIELD", 9, 15, Weapon.RAPIER, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("010:ST9;DX15;RAPIER;LEATHER;SMALL_SHIELD", 9, 15, Weapon.RAPIER, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("011:ST9;DX15;RAPIER;CHAIN;SMALL_SHIELD", 9, 15, Weapon.RAPIER, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("012:ST9;DX15;RAPIER;PLATE;SMALL_SHIELD", 9, 15, Weapon.RAPIER, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("013:ST9;DX15;RAPIER;NO_ARMOR;LARGE_SHIELD", 9, 15, Weapon.RAPIER, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("014:ST9;DX15;RAPIER;LEATHER;LARGE_SHIELD", 9, 15, Weapon.RAPIER, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("015:ST9;DX15;RAPIER;CHAIN;LARGE_SHIELD", 9, 15, Weapon.RAPIER, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("016:ST9;DX15;RAPIER;PLATE;LARGE_SHIELD", 9, 15, Weapon.RAPIER, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("017:ST9;DX15;CLUB;NO_ARMOR;SMALL_SHIELD", 9, 15, Weapon.CLUB, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("018:ST9;DX15;CLUB;LEATHER;SMALL_SHIELD", 9, 15, Weapon.CLUB, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("019:ST9;DX15;CLUB;CHAIN;SMALL_SHIELD", 9, 15, Weapon.CLUB, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("020:ST9;DX15;CLUB;PLATE;SMALL_SHIELD", 9, 15, Weapon.CLUB, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("021:ST9;DX15;CLUB;NO_ARMOR;LARGE_SHIELD", 9, 15, Weapon.CLUB, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("022:ST9;DX15;CLUB;LEATHER;LARGE_SHIELD", 9, 15, Weapon.CLUB, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("023:ST9;DX15;CLUB;CHAIN;LARGE_SHIELD", 9, 15, Weapon.CLUB, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("024:ST9;DX15;CLUB;PLATE;LARGE_SHIELD", 9, 15, Weapon.CLUB, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("025:ST9;DX15;JAVELIN;NO_ARMOR;SMALL_SHIELD", 9, 15, Weapon.JAVELIN, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("026:ST9;DX15;JAVELIN;LEATHER;SMALL_SHIELD", 9, 15, Weapon.JAVELIN, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("027:ST9;DX15;JAVELIN;CHAIN;SMALL_SHIELD", 9, 15, Weapon.JAVELIN, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("028:ST9;DX15;JAVELIN;PLATE;SMALL_SHIELD", 9, 15, Weapon.JAVELIN, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("029:ST9;DX15;JAVELIN;NO_ARMOR;LARGE_SHIELD", 9, 15, Weapon.JAVELIN, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("030:ST9;DX15;JAVELIN;LEATHER;LARGE_SHIELD", 9, 15, Weapon.JAVELIN, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("031:ST9;DX15;JAVELIN;CHAIN;LARGE_SHIELD", 9, 15, Weapon.JAVELIN, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("032:ST9;DX15;JAVELIN;PLATE;LARGE_SHIELD", 9, 15, Weapon.JAVELIN, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("033:ST10;DX14;HAMMER;NO_ARMOR;SMALL_SHIELD", 10, 14, Weapon.HAMMER, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("034:ST10;DX14;HAMMER;LEATHER;SMALL_SHIELD", 10, 14, Weapon.HAMMER, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("035:ST10;DX14;HAMMER;CHAIN;SMALL_SHIELD", 10, 14, Weapon.HAMMER, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("036:ST10;DX14;HAMMER;PLATE;SMALL_SHIELD", 10, 14, Weapon.HAMMER, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("037:ST10;DX14;HAMMER;NO_ARMOR;LARGE_SHIELD", 10, 14, Weapon.HAMMER, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("038:ST10;DX14;HAMMER;LEATHER;LARGE_SHIELD", 10, 14, Weapon.HAMMER, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("039:ST10;DX14;HAMMER;CHAIN;LARGE_SHIELD", 10, 14, Weapon.HAMMER, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("040:ST10;DX14;HAMMER;PLATE;LARGE_SHIELD", 10, 14, Weapon.HAMMER, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("041:ST10;DX14;CUTLASS;NO_ARMOR;SMALL_SHIELD", 10, 14, Weapon.CUTLASS, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("042:ST10;DX14;CUTLASS;LEATHER;SMALL_SHIELD", 10, 14, Weapon.CUTLASS, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("043:ST10;DX14;CUTLASS;CHAIN;SMALL_SHIELD", 10, 14, Weapon.CUTLASS, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("044:ST10;DX14;CUTLASS;PLATE;SMALL_SHIELD", 10, 14, Weapon.CUTLASS, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("045:ST10;DX14;CUTLASS;NO_ARMOR;LARGE_SHIELD", 10, 14, Weapon.CUTLASS, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("046:ST10;DX14;CUTLASS;LEATHER;LARGE_SHIELD", 10, 14, Weapon.CUTLASS, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("047:ST10;DX14;CUTLASS;CHAIN;LARGE_SHIELD", 10, 14, Weapon.CUTLASS, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("048:ST10;DX14;CUTLASS;PLATE;LARGE_SHIELD", 10, 14, Weapon.CUTLASS, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("049:ST11;DX13;SHORTSWORD;NO_ARMOR;SMALL_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("050:ST11;DX13;SHORTSWORD;LEATHER;SMALL_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("051:ST11;DX13;SHORTSWORD;CHAIN;SMALL_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("052:ST11;DX13;SHORTSWORD;PLATE;SMALL_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("053:ST11;DX13;SHORTSWORD;NO_ARMOR;LARGE_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("054:ST11;DX13;SHORTSWORD;LEATHER;LARGE_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("055:ST11;DX13;SHORTSWORD;CHAIN;LARGE_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("056:ST11;DX13;SHORTSWORD;PLATE;LARGE_SHIELD", 11, 13, Weapon.SHORTSWORD, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("057:ST11;DX13;MACE;NO_ARMOR;SMALL_SHIELD", 11, 13, Weapon.MACE, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("058:ST11;DX13;MACE;LEATHER;SMALL_SHIELD", 11, 13, Weapon.MACE, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("059:ST11;DX13;MACE;CHAIN;SMALL_SHIELD", 11, 13, Weapon.MACE, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("060:ST11;DX13;MACE;PLATE;SMALL_SHIELD", 11, 13, Weapon.MACE, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("061:ST11;DX13;MACE;NO_ARMOR;LARGE_SHIELD", 11, 13, Weapon.MACE, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("062:ST11;DX13;MACE;LEATHER;LARGE_SHIELD", 11, 13, Weapon.MACE, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("063:ST11;DX13;MACE;CHAIN;LARGE_SHIELD", 11, 13, Weapon.MACE, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("064:ST11;DX13;MACE;PLATE;LARGE_SHIELD", 11, 13, Weapon.MACE, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("065:ST11;DX13;SPEAR;NO_ARMOR;NO_SHIELD", 11, 13, Weapon.SPEAR, Armor.NO_ARMOR, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("066:ST11;DX13;SPEAR;LEATHER;NO_SHIELD", 11, 13, Weapon.SPEAR, Armor.LEATHER, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("067:ST11;DX13;SPEAR;CHAIN;NO_SHIELD", 11, 13, Weapon.SPEAR, Armor.CHAIN, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("068:ST11;DX13;SPEAR;PLATE;NO_SHIELD", 11, 13, Weapon.SPEAR, Armor.PLATE, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("069:ST12;DX12;BROADSWORD;NO_ARMOR;SMALL_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("070:ST12;DX12;BROADSWORD;LEATHER;SMALL_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("071:ST12;DX12;BROADSWORD;CHAIN;SMALL_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("072:ST12;DX12;BROADSWORD;PLATE;SMALL_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("073:ST12;DX12;BROADSWORD;NO_ARMOR;LARGE_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("074:ST12;DX12;BROADSWORD;LEATHER;LARGE_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("075:ST12;DX12;BROADSWORD;CHAIN;LARGE_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("076:ST12;DX12;BROADSWORD;PLATE;LARGE_SHIELD", 12, 12, Weapon.BROADSWORD, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("077:ST13;DX11;MORNINGSTAR;NO_ARMOR;SMALL_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.NO_ARMOR, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("078:ST13;DX11;MORNINGSTAR;LEATHER;SMALL_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.LEATHER, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("079:ST13;DX11;MORNINGSTAR;CHAIN;SMALL_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.CHAIN, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("080:ST13;DX11;MORNINGSTAR;PLATE;SMALL_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.PLATE, Shield.SMALL_SHIELD); this.addHero(h1);

            h1 = new Hero("081:ST13;DX11;MORNINGSTAR;NO_ARMOR;LARGE_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.NO_ARMOR, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("082:ST13;DX11;MORNINGSTAR;LEATHER;LARGE_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.LEATHER, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("083:ST13;DX11;MORNINGSTAR;CHAIN;LARGE_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.CHAIN, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("084:ST13;DX11;MORNINGSTAR;PLATE;LARGE_SHIELD", 13, 11, Weapon.MORNINGSTAR, Armor.PLATE, Shield.LARGE_SHIELD); this.addHero(h1);

            h1 = new Hero("085:ST13;DX11;HALBERD;NO_ARMOR;NO_SHIELD", 13, 11, Weapon.HALBERD, Armor.NO_ARMOR, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("086:ST13;DX11;HALBERD;LEATHER;NO_SHIELD", 13, 11, Weapon.HALBERD, Armor.LEATHER, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("087:ST13;DX11;HALBERD;CHAIN;NO_SHIELD", 13, 11, Weapon.HALBERD, Armor.CHAIN, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("088:ST13;DX11;HALBERD;PLATE;NO_SHIELD", 13, 11, Weapon.HALBERD, Armor.PLATE, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("089:ST14;DX10;TWO_HANDED_SWORD;NO_ARMOR;NO_SHIELD", 14, 10, Weapon.TWO_HANDED_SWORD, Armor.NO_ARMOR, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("090:ST14;DX10;TWO_HANDED_SWORD;LEATHER;NO_SHIELD", 14, 10, Weapon.TWO_HANDED_SWORD, Armor.LEATHER, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("091:ST14;DX10;TWO_HANDED_SWORD;CHAIN;NO_SHIELD", 14, 10, Weapon.TWO_HANDED_SWORD, Armor.CHAIN, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("092:ST14;DX10;TWO_HANDED_SWORD;PLATE;NO_SHIELD", 14, 10, Weapon.TWO_HANDED_SWORD, Armor.PLATE, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("093:ST15;DX9;BATTLEAXE;NO_ARMOR;NO_SHIELD", 15, 9, Weapon.BATTLEAXE, Armor.NO_ARMOR, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("094:ST15;DX9;BATTLEAXE;LEATHER;NO_SHIELD", 15, 9, Weapon.BATTLEAXE, Armor.LEATHER, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("095:ST15;DX9;BATTLEAXE;CHAIN;NO_SHIELD", 15, 9, Weapon.BATTLEAXE, Armor.CHAIN, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("096:ST15;DX9;BATTLEAXE;PLATE;NO_SHIELD", 15, 9, Weapon.BATTLEAXE, Armor.PLATE, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("097:ST15;DX9;PIKE_AXE;NO_ARMOR;NO_SHIELD", 15, 9, Weapon.PIKE_AXE, Armor.NO_ARMOR, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("098:ST15;DX9;PIKE_AXE;LEATHER;NO_SHIELD", 15, 9, Weapon.PIKE_AXE, Armor.LEATHER, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("099:ST15;DX9;PIKE_AXE;CHAIN;NO_SHIELD", 15, 9, Weapon.PIKE_AXE, Armor.CHAIN, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("100:ST15;DX9;PIKE_AXE;PLATE;NO_SHIELD", 15, 9, Weapon.PIKE_AXE, Armor.PLATE, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("101:ST16;DX8;BATTLEAXE;NO_ARMOR;NO_SHIELD", 16, 8, Weapon.BATTLEAXE, Armor.NO_ARMOR, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("102:ST16;DX8;BATTLEAXE;LEATHER;NO_SHIELD", 16, 8, Weapon.BATTLEAXE, Armor.LEATHER, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("103:ST16;DX8;BATTLEAXE;CHAIN;NO_SHIELD", 16, 8, Weapon.BATTLEAXE, Armor.CHAIN, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("104:ST16;DX8;BATTLEAXE;PLATE;NO_SHIELD", 16, 8, Weapon.BATTLEAXE, Armor.PLATE, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("105:ST16;DX8;PIKE_AXE;NO_ARMOR;NO_SHIELD", 16, 8, Weapon.PIKE_AXE, Armor.NO_ARMOR, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("106:ST16;DX8;PIKE_AXE;LEATHER;NO_SHIELD", 16, 8, Weapon.PIKE_AXE, Armor.LEATHER, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("107:ST16;DX8;PIKE_AXE;CHAIN;NO_SHIELD", 16, 8, Weapon.PIKE_AXE, Armor.CHAIN, Shield.NO_SHIELD); this.addHero(h1);

            h1 = new Hero("108:ST16;DX8;PIKE_AXE;PLATE;NO_SHIELD", 16, 8, Weapon.PIKE_AXE, Armor.PLATE, Shield.NO_SHIELD); this.addHero(h1);

            listHeight = 15;
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
            //            console.log("Hero name (index to map): '" + heroName + "'" + " len = " + heroName.length);
            heroList[heroName] = hero;
            // http://stackoverflow.com/a/7196296/1168342
            // this.heroList.push({key:heroName, value:hero});
            //console.log("Hero list = " + Object.keys(this.heroList));
        },
        getHeroList: function () {
            return heroList;
        },
        getListHeight: function () {
            return listHeight;
        },
        displayHeroesList: function () {
            console.log(Object.keys(heroList));
        }

    }

});
