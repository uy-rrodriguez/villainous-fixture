/*
 * (C) Disney Villainous all-vs-all tournament fixture.
 * Copyright (C) 2021. uy-rrodriguez.
 * https://github.com/uy-rrodriguez
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Villain with name and image.
 *
 * @param {int} id
 * @param {string} name
 * @param {string} image
 * @constructor
 */
function Villain(name, image) {
    this.name = name;
    this.image = image;
    this.isDummy = false;
}
Villain.prototype.toString = function () {
    return `${this.name}`;
};

/**
 * Pair of values.
 *
 * @param {Villain} item1
 * @param {Villain} item2
 * @constructor
 */
function Pair (item1, item2) {
    this.item1 = item1;
    this.item2 = item2;
    this.winner = null;
}
Pair.prototype.toString = function () {
    return `(${this.item1}, ${this.item2})`;
};

/**
 * Round represented as a list of `Pair` elements.
 *
 * @constructor
 */
function Round (pairs) {
    this.pairs = pairs;
}
Round.prototype.toString = function () {
    return `${this.pairs}`;
};
/**
 * @param {Pair} pair
 */
Round.prototype.push = function (pair) {
    this.pairs.push(pair);
};
/**
 * @returns {Pair}
 */
Round.prototype.pop = function () {
    return this.pairs.pop();
};
/**
 *
 * @param stepCallback
 * @returns {*}
 */
Round.prototype.forEach = function (stepCallback) {
    return this.pairs.forEach(stepCallback);
};
/**
 * @returns {int}
 */
Round.prototype.length = function () {
    return this.pairs.length;
};
/**
 * @returns {Round}
 */
Round.prototype.copy = function () {
    return new Round(this.pairs.slice());
};

/**
 * Fixture with a list of rounds.
 *
 * @param {int} current
 * @param {Round[]} rounds
 * @constructor
 */
function Fixture (current, rounds) {
    this.current = current;
    this.rounds = rounds;
}
Fixture.prototype.toString = function () {
    return `Current round = ${this.current}; Rounds: ${this.rounds}`;
};


/**
 * Write a stream of data using the given callback.
 *
 * @param stream
 * @param data
 * @param callback
 */
function write(stream, data, callback) {
    if (!stream.write(data)) {
        stream.once("drain", callback);
    } else {
        process.nextTick(callback);
    }
}


/**
 * Loads a list of villains from a JSON object.
 *
 * @param {Object} jsonObject
 * @returns {Villain[]}
 */
function loadVillains(jsonObject) {
    const villains = [];
    let id = 0;
    jsonObject.forEach((data) => {
        villains.push(new Villain(data["name"], data["img"]));
    });
    return villains;
}

/**
 * Generates a list of Rounds following the Round Robin algorithm of Berger tables.
 *
 * @param {Villain[]} villains
 * @returns {Round[]}
 * @see https://en.wikipedia.org/wiki/Round-robin_tournament
 */
function getRoundsBerger(villains) {
    console.debug('getRoundsBerger');
    let rows = [];  // Rounds but only with the item ids
    let rounds = [];
    let n = villains.length;

    // Add dummy element if number is odd
    if (n % 2 > 0) {
        console.debug(`Odd number of elements (${n}). Creating dummy.`);
        let dummy = new Villain("dummy", "");
        dummy.isDummy = true;
        villains.push(dummy);
        n = n+1;
    }

    // First round pairs 1<->n, 2<->(n-1), 3<->(n-2), etc.
    let row = [];
    for (let i = 1; i <= n / 2; i++) {
        row.push(i);
        row.push(n+1-i);
    }
    console.debug(`Round 1, row: ${row}`);
    rows.push(row);

    // Following n-2 rounds fix item n and calculate the rest from the previous item in the same position.
    // Item Y in row R depends on item X on row R-1, where Y and X have the same index.
    // Y = X + n/2. If Y > (n-1) => Y = Y - (n-1)
    // E.g.:
    //  - Round 0: 1-6 | 2-5 | 3-4
    //  - Round 1: 4-6 | 5-3 | 1-2
    //
    // Afterwards, the position of item n is inverted for each odd row => Round 1: 6-4 | 5-3 | 1-2
    //
    for (let r = 1; r < n-1; r++) {
        const prevRow = row;
        row = [];
        for (let i = 0; i < n; i++) {
            const x = prevRow[i];
            let y;
            if (x === n) y = n;
            else {
                y = x + n/2;
                if (y > n-1) y = y - (n-1);
            }
            row.push(y);
        }
        let x0 = row[0];
        row[0] = row[1];
        row[1] = x0;
        console.debug(`Round ${r+1}, row: ${row}`);
        rows.push(row);
    }

    // Generate Rounds of Pairs
    for (let r = 0; r < n-1; r++) {
        const pairs = [];
        for (let i = 0; i < n-1; i+=2) {
            const idx1 = rows[r][i] - 1;
            const idx2 = rows[r][i+1] - 1;
            pairs.push(new Pair(villains[idx1], villains[idx2]));
        }
        rounds.push(pairs);
    }

    return rounds;
}

/**
 * Generates a list of rounds from a list of Villains.
 *
 * @param {Villain[]} villains
 * @returns {Fixture}
 */
function generateFixture(villains, results) {
    const rounds = getRoundsBerger(villains);
    const fixture = new Fixture(1, rounds);
    setResultsIntoFixture(fixture, results);
    return fixture;
}

/**
 * Sets the results into a Fixture, from the given Results list.
 *
 * @param {Fixture} fixture
 * @param {[][]} results: array of elements like ['villain1', 'villain2', 1]
 */
function setResultsIntoFixture(fixture, results) {
    console.debug('setResultsIntoFixture');
    const resultsCopy = results.slice();
    console.debug(resultsCopy);
    fixture.rounds.forEach((round_pairs) => round_pairs.forEach((pair) => {
        let result = null;
        let i = 0;
        while (result === null && i < resultsCopy.length) {
            if (pair.item1.name in resultsCopy[i] && pair.item2.name in resultsCopy[i]) {
                result = resultsCopy.splice(i, 1)[0];
                console.debug(`Found result: ${result}`);

                // Set winner Villain depending on the stored value
                const winnerName = result[result[2]-1];  // Stored winner value is either 1 or 2
                pair.winner =
                    winnerName === pair.item1.name ? pair.item1
                    : winnerName === pair.item2.name ? pair.item2
                    : null;
            }
            i++;
        }
    }));
    console.debug(fixture);
}

/**
 * Generates a JSON string from the fixture.
 *
 * @param {Fixture} fixture
 * @returns {string}
 */
function fixtureToJson(fixture) {
    console.debug('printFixture');
    const simplifiedRounds = [];
    fixture.rounds.forEach(round => {
        const simpleRound = [];
        round.forEach(pair => {
            console.debug(pair);
            simpleRound.push({
                1: pair.item1.name,
                2: pair.item2.name,
            });
        });
        simplifiedRounds.push(simpleRound);
    });
    return JSON.stringify({
        current: fixture.current,
        rounds: simplifiedRounds,
    }, null, 2);
}

/**
 * Generates a JSON string from the fixture rounds with winners data.
 *
 * @param {Fixture} fixture
 * @returns {string}
 */
function resultsToJson(fixture) {
    console.debug('resultsToJson');
    const pairs = [];
    fixture.rounds.forEach(round => {
        round.forEach(pair => {
            const winner =
                pair.winner === pair.item1 ? 1
                : pair.winner === pair.item2 ? 2
                : null;
            if (winner !== null) {
                pairs.push([pair.item1.name, pair.item2.name, winner]);
            }
        });
    });

    // JSONify manually, to avoid line breaks inside a result array
    if (pairs.length > 0) {
        let jsonified = '[';
        pairs.forEach(pair => jsonified += `\n  ["${pair[0]}", "${pair[1]}", ${pair[2]}],`);
        jsonified = jsonified.slice(0, -1);  // Remove last ","
        jsonified += '\n]';
        console.log(jsonified);
    }
    else {
        console.log('[]');
    }
}

/**
 * Finds a Villain instance from the given name.
 *
 * @param {string} name
 * @param {Villain[]} villains
 * @returns {Villain|null}
 */
function findVillain(name, villains) {
    for (let i=0; i<villains.length; i++) {
        if (villains[i].name === name) {
            return villains[i];
        }
    }
    return null;
}

/**
 * Loads a pre-generated fixture from a JSON object.
 * Sets winners from the given results array.
 *
 * @param {Villain[]} villains
 * @param {Fixture} fixture
 * @param {any[][]} results: array of elements like ['villain1', 'villain2', 1]
 * @returns {Fixture}
 */
function loadFixture(villains, fixtureData, results) {
    const fixture = new Fixture(fixtureData.current, []);
    fixtureData.rounds.forEach(simpleRound => {
        const roundPairs = [];
        simpleRound.forEach(simplePair => {
            const pair = new Pair(
                findVillain(simplePair["1"], villains),
                findVillain(simplePair["2"], villains),
            );
            // If fixture still has results data, load it
            if ('winner' in simplePair) {
                switch (simplePair.winner) {
                    case "1": pair.winner = pair.item1; break;
                    case "2": pair.winner = pair.item2;
                }
            }
            roundPairs.push(pair);
        });
        fixture.rounds.push(roundPairs);
    });
    setResultsIntoFixture(fixture, results);
    return fixture;
}

/**
 * Generates HTML code to display the fixture.
 *
 * @param {Fixture} fixture
 */
function drawFixtureHtml(fixture) {
    const container = document.createElement("div");
    const hr = document.createElement("hr");
    hr.classList.add("thin-hr");

    fixture.rounds.forEach((round_pairs, round_idx) => {
        const panel = document.createElement("div");
        container.appendChild(panel);

        panel.classList.add("panel", "panel-default");
        panel.innerHTML =
            `<div id="round${round_idx + 1}" class="panel-heading">
                <div class="row">
                    <div class="col-md-9 col-sm-12 col-xs-12">
                        <h3 class="panel-title">
                            <strong>Round ${round_idx + 1}</strong>
                        </h3>
                    </div>
                </div>
            </div>`;

        const body = document.createElement("div");
        panel.appendChild(body);
        body.classList.add("panel-body");

        round_pairs.forEach((pair, pair_idx) => {
            // Ignore a pairing with the dummy element (when the number of items is odd)
            if (pair.item1.isDummy || pair.item2.isDummy)
                return;

            const row = document.createElement("div");
            body.appendChild(row);
            row.classList.add("row", "row-pad-18", "vertical-align");

            let resultClass1 = "";
            let resultClass2 = "";
            if (pair.winner === pair.item1) {
                resultClass1 = "villain-won";
                resultClass2 = "villain-lost";
            }
            else if (pair.winner === pair.item2) {
                resultClass1 = "villain-lost";
                resultClass2 = "villain-won";
            }

            row.innerHTML =
                `<div class="villain villain-left ${resultClass1} col-xs-5">
                     <div class="text-right">
                         <div class="villain-img-wrapper">
                             <img class="villain-img" src="assets/img/${pair.item1.image}" />
                         </div>
                     </div>
                </div>
                <div class="col-xs-2 text-center villain-vs">vs</div>
                <div class="villain villain-right ${resultClass2} col-xs-5">
                    <div class="text-left">
                        <div class="villain-img-wrapper">
                            <img class="villain-img" src="assets/img/${pair.item2.image}" />
                        </div>
                    </div>
                </div>`;

            if (pair_idx < round_pairs.length - 1) {
                row.appendChild(hr.cloneNode());
            }
        });
    });

    document.getElementById("fixture-container").innerHTML = container.innerHTML;
}

/**
 * Logic to be executed when the HTML page loads.
 * 
 * @param {Fixture} fixture
 */
function onPageLoad(villainsData, roundsData, resultsData) {
    const villains = loadVillains(villainsData);

    // A) Either load fixture from rounds data
    //const fixture = loadFixture(villains, roundsData, resultsData);
    // B) or Generate new fixture from villains data
    const fixture = generateFixture(villains, resultsData);
    console.log(fixtureToJson(fixture));

    // Draw fixture as HTML
    drawFixtureHtml(fixture);

    // Calculate header size once
    animateHeader();

    // Load rounds
    const currentRound = fixture.current;
    const rounds = document.getElementById("rounds");
    for (let i = 1; i <= fixture.rounds.length; i++) {
        const option = document.createElement("option");
        option.text = "Round " + i;
        option.value = `${i}`;
        if (i < currentRound) {
            option.classList.add("complete");
        } else if (i === currentRound) {
            option.classList.add("current");
        }
        rounds.add(option);
    }
    rounds.onchange = (evt) => {
        scrollToRound(evt.target.value, true);
    };

    // Go to current round
    rounds.value = currentRound;
    rounds.dispatchEvent(new Event("change"));
}
