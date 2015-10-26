/* global sorttable */
define(function () {
    "use strict";
    var isPoleWeaponsChargeFirstRoundChecked = false;
    var isDefendVsPoleChargeChecked = false;
    var isVerboseChecked = false;

    var webWorker = {};

    function createTableFromProperties(heroWins, totalCount, caption, isVersus) {
        var tbl = document.createElement("table");
        tbl.style.width = "100%";
        tbl.className = "sortable table table-striped table-condensed"; // bootstrap --> class="table table-striped"
        // tbl.className = "sortable";  // sorttable.js is the hook
        tbl.setAttribute("border", "0");
        /**
         * add caption
         */
        var tbcaption = document.createElement('caption');
        tbcaption.appendChild(document.createTextNode(caption));
        tbl.appendChild(tbcaption);
        var tbhead = document.createElement('thead');
        var tr = document.createElement('tr');
        var td = document.createElement('th');
        if (isVersus) {
            td.appendChild(document.createTextNode("Hero 1"));
            tr.appendChild(td);
            td = document.createElement('th');
            td.appendChild(document.createTextNode("vs Hero 2"));
            tr.appendChild(td);
        } else {
            td = document.createElement('th');
            td.appendChild(document.createTextNode("Hero"));
            tr.appendChild(td);
        }
        td = document.createElement('th');
        td.id = (isVersus ? "match" : "") + "wins";
        td.appendChild(document.createTextNode("Wins"));
        // td.setAttribute("align", "right");
        td.style.textAlign = "right";
        tr.appendChild(td);
        td = document.createElement('th');
        td.style.textAlign = "right";
        td.appendChild(document.createTextNode("% total"));
        tr.appendChild(td);
        tbhead.appendChild(tr);
        tbl.appendChild(tbhead);
        var tbdy = document.createElement('tbody');
        var percentageWin = 0;
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
                td.style.textAlign = "right";
                td.appendChild(document.createTextNode(heroWins[property]));
                tr.appendChild(td);
                td = document.createElement('td');
                td.style.textAlign = "right";
                percentageWin = ((heroWins[property] / totalCount) * 100).toFixed(2);
                td.appendChild(document.createTextNode("" + percentageWin));
                if (percentageWin > 70) { tr.className = "success"; }
                else if (percentageWin < 30) { tr.className = "danger"; }
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

    function clearDiv(id) {
        var div = document.getElementById(id);
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }

    return {
        start: function () {
            isPoleWeaponsChargeFirstRoundChecked = document.getElementById("poleWeaponsChargeFirstRound").checked;
            isDefendVsPoleChargeChecked = document.getElementById("defendVsPoleCharge").checked;
            isVerboseChecked = document.getElementById("verboseOutput").checked;

            // 'this' is the button that was clicked (onclick)
            var startButton = this;
            startButton.disabled = true;
            var stopButton = document.getElementById("stopSimulation");
            stopButton.disabled = false;
            var progressBar = document.getElementById("progress");
            progressBar.value = 0;
            var verboseOutputText = document.getElementById("verboseOutputText");
            verboseOutputText.value = "";

            /**
             * Clear results from previous run 
             */
            clearDiv("heroWins");
            clearDiv("matchupWins");

            console.log('Starting simulation');
            var selectElement = document.getElementById("heroesSelected");
            var selectedHeroes = getSelectedValues(selectElement);
            var logBuffer = "";
            //console.log(heroSet);

            var boutCount = document.getElementById("boutsPerMatchup").value;

            // crunch the numbers in a web worker
            var worker = new Worker("app/simulator.js");
            webWorker = worker;
            //worker.postMessage("hello");
            worker.addEventListener("message", function (event) {
                var data = event.data;
                //console.log("Web worker messaged me: " + event.data);
                switch (data.cmd) {
                    case 'worker started':
                        // give worker the info
                        worker.postMessage({ 'selectedHeroes': selectedHeroes, 'boutCount': boutCount, 'isPoleWeaponsChargeFirstRound': isPoleWeaponsChargeFirstRoundChecked, 'isDefendVsPoleCharge': isDefendVsPoleChargeChecked, 'isVerbose': isVerboseChecked });
                        var p = document.createElement('p');
                        p.className = "bg-info";
                        p.appendChild(document.createTextNode("Calculating results - please wait."));
                        document.getElementById("matchupWins").appendChild(p);
                        p = document.createElement('p');
                        p.className = "bg-info";
                        p.appendChild(document.createTextNode("Calculating results - please wait.")); document.getElementById("heroWins").appendChild(p);
                        break;

                    case 'log':
                        logBuffer += data.message + "\n";
                        break;

                    case 'progressUpdate':
                        progressBar.value = data.progress;
                        break;

                    case 'finished':
                        /**
                         * Clear messages 
                         */
                        clearDiv("heroWins");
                        clearDiv("matchupWins");
                        var heroWinsTable = createTableFromProperties(data.heroWins, (selectedHeroes.length - 1) * boutCount, "Results for " + selectedHeroes.length + " heroes, paired up for " + boutCount + " bouts each", false);
                        document.getElementById("heroWins").appendChild(heroWinsTable);
                        sorttable.makeSortable(heroWinsTable);

                        var matchupWinsTable = createTableFromProperties(data.matchupWins, boutCount, "Pairwise results for " + selectedHeroes.length + " heroes, paired up for " + boutCount + " bouts each:", true);
                        document.getElementById("matchupWins").appendChild(matchupWinsTable);
                        sorttable.makeSortable(matchupWinsTable);


                        /**
                         * Force tables to be sorted
                         */
                        var myTH = document.getElementById("matchwins");
                        sorttable.innerSortFunction.apply(myTH, []); // once for ascending
                        sorttable.innerSortFunction.apply(myTH, []); // again for descending (stupid but it's how it works)
                        myTH = document.getElementById("wins"); // top table last, since the icon only shows on last table sorted...
                        sorttable.innerSortFunction.apply(myTH, []);
                        sorttable.innerSortFunction.apply(myTH, []);

                        verboseOutputText.value = logBuffer;

                        startButton.disabled = false;
                        stopButton.disabled = true;
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
        },
        stop: function () {
            /**
             * Stop the web worker
             */
            var stopButton = this;
            stopButton.disabled = true;
            webWorker.terminate();
            /**
             * Clear results from previous run 
             */
            clearDiv("heroWins");
            clearDiv("matchupWins");

            var p = document.createElement('p');
            p.className = "bg-warning";
            p.appendChild(document.createTextNode("No results becase the simulator was stopped before it finished."));
            document.getElementById("matchupWins").appendChild(p);
            p = document.createElement('p');
            p.className = "bg-warning";
            p.appendChild(document.createTextNode("No results becase the simulator was stopped before it finished.")); document.getElementById("heroWins").appendChild(p);
            document.getElementById("startSimulation").disabled = false;
        }
    };
});