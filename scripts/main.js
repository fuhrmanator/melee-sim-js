require(["heroes"], function (heroes) {
    heroes.createHeroesList();
    //var select = document.getElementById("heroesSelected");
    //select.applyElement('size=' + heroes.listHeight);
    console.log("Heroes list height = " + heroes.listHeight);
});