define("simulator", ["Hero"], function (Hero) {
    return {
        start: function () {
            console.log('Starting simulation');
            var h1 = new Hero("Joe", 12);
            var h2 = new Hero("Ellen", 14);

            console.log(h1.getName() + " " + h1.getST());
            console.log(h2.getName() + " " + h2.getST());

        }
    };
});