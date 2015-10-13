﻿/* global sorttable */
define(["./HeroesSingleton"], function (HeroesSingleton) {
    "use strict";
    var isPoleWeaponsChargeFirstRoundChecked = false;
    var isDefendVsPoleChargeChecked = false;
    var isVerboseChecked = false;

    function createTableFromProperties(heroWins, isVersus) {
        var tbl = document.createElement("table");
        tbl.style.width = "100%"
        tbl.className = "sortable";  // sorttable.js is the hook
        tbl.setAttribute("border", "0");
        var tbhead = document.createElement('thead');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        if (isVersus) {
            td.appendChild(document.createTextNode("Hero 1"));
            tr.appendChild(td);
            td = document.createElement('td');
            td.appendChild(document.createTextNode("vs Hero 2"));
            tr.appendChild(td);
        } else {
            td = document.createElement('td');
            td.appendChild(document.createTextNode("Hero"));
            tr.appendChild(td);
        }
        td = document.createElement('td');
        td.appendChild(document.createTextNode("Wins"));
        tr.appendChild(td);
        tbhead.appendChild(tr);
        tbl.appendChild(tbhead);
        var tbdy = document.createElement('tbody');
        for (var property in heroWins) {
            if (heroWins.hasOwnProperty(property)) {
                tr = document.createElement('tr');
                td = document.createElement('td');
                if (isVersus) {
                    var heroes = property.split("/");
                    td.appendChild(document.createTextNode(heroes[0]));
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.appendChild(document.createTextNode(heroes[1]));
                    tr.appendChild(td);
                } else {
                    td.appendChild(document.createTextNode(property));
                    tr.appendChild(td);
                }
                // add the column for the number of wins
                td = document.createElement('td');
                td.appendChild(document.createTextNode(heroWins[property]));
                tr.appendChild(td);
                tbdy.appendChild(tr);
            }
        }
        tbl.appendChild(tbdy);
        return tbl;
    }

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

    return {
        start: function () {
            isPoleWeaponsChargeFirstRoundChecked = document.getElementById("poleWeaponsChargeFirstRound").checked;
            isDefendVsPoleChargeChecked = document.getElementById("defendVsPoleCharge").checked;
            isVerboseChecked = document.getElementById("verboseOutput").checked;
            
            // 'this' is the button that was clicked (onclick)
            var startButton = this;
            startButton.disabled = true;
            
            /**
             * Clear results from previous run 
             */
            var div = document.getElementById("heroWins");
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            div = document.getElementById("matchupWins");
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

            console.log('Starting simulation');
            var selectElement = document.getElementById("heroesSelected");
            var selectedHeroes = getSelectedValues(selectElement);
            //console.log(heroSet);
            
            var boutCount = document.getElementById("boutsPerMatchup").value;

            // crunch the numbers in a web worker
            var worker = new Worker("app/simulator.js");
            worker.postMessage("hello");
            worker.addEventListener("message", function (event) {
                var data = event.data;
                //console.log("Web worker messaged me: " + event.data);
                switch (data.cmd) {
                    case 'worker started':
                        // give worker the info
                        worker.postMessage({ 'selectedHeroes': selectedHeroes, 'boutCount': boutCount, 'isPoleWeaponsChargeFirstRound': isPoleWeaponsChargeFirstRoundChecked, 'isDefendVsPoleCharge': isDefendVsPoleChargeChecked, 'isVerbose':isVerboseChecked });
                        break;

                    case 'progressUpdate':
                        var progressBar = document.getElementById("progress");
                        progressBar.value = data.progress;
                        break;

                    case 'finished':
                        var heroWinsTable = createTableFromProperties(data.heroWins, false);
                        document.getElementById("heroWins").appendChild(heroWinsTable);
                        sorttable.makeSortable(heroWinsTable);

                        var matchupWinsTable = createTableFromProperties(data.matchupWins, true);
                        document.getElementById("matchupWins").appendChild(matchupWinsTable);
                        sorttable.makeSortable(matchupWinsTable);

                        startButton.disabled = false;
                        break;

                    default:
                        console.log("Unrecognized message from web worker: ");
                        console.log(data);
                        break;
                }
            });

            worker.addEventListener("error", function () {
                console.log("WORKER ERROR", arguments);
            });

            // worker takes over leaving the GUI thread free to update
        }

    };
});