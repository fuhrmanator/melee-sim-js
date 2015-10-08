define(["./Hero","./Weapon"], function (Hero, Weapon) {
    return {
        start: function () {
            console.log('Starting simulation');
            var h1 = new Hero("Joe", 12, Weapon.DAGGER);
            var h2 = new Hero("Ellen", 14, Weapon.TWO_HANDED_SWORD);

            console.log(h1.getName() + " " + h1.getST() + " " + h1.getWeapon());
            console.log(h2.getName() + " " + h2.getST() + " " + h2.getWeapon());

        }
    };
});