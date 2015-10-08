define(["./Hero"], function (Hero) {

    return {
        listHeight : 20,
        createHeroesList: function () {
            console.log("creating Heroes list...")

            var select = document.getElementById("heroesSelected");
            var opt = document.createElement('option');
            var name = "Hero #1 generated";
            opt.value = name;
            opt.innerHTML = name;
            select.appendChild(opt);            

        }
    }
});