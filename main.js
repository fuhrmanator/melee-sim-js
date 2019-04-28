require({
        paths: {
            bunit: 'lib/bunit',
            assert: 'lib/assert',
            domReady: 'www/lib/domReady',
            Die: 'www/app/Die',
            Armor: 'www/app/Armor',
            Hero: 'www/app/Hero',
            Shield: 'www/app/Shield',
            Weapon: 'www/app/Weapon',
            Logger: 'www/app/Logger'
        }
    },
    ['bunit', 'tests/tests', 'domReady'],
    function (bunit, tests, domReady) {
        domReady(function () {
            //This function is called once the DOM is ready.
            //It will be safe to query the DOM and manipulate
            //DOM nodes in this function.
            // var r = bunit.runner();

            var outputArea = document.createElement('div');
            document.body.appendChild(outputArea)
            var r = bunit.runner();
            r.run({
                output: bunit.HTMLOutput(outputArea),
                // interval: 2000   // if you want to repeat tests every X milliseconds
            });
        });
    }
);