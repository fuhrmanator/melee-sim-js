define(["./heroes", "./Hero", "./Weapon"], function (heroes, Hero, Weapon) {
  return {
    getSelectValues: function(selectElement) {
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
    },
    start: function () {
      console.log('Starting simulation');
      var selectElement = document.getElementById("heroesSelected");
      console.log(selectElement);
      var selectedHeroes = this.getSelectValues(selectElement);
      alert(selectedHeroes);
    }
  };
});