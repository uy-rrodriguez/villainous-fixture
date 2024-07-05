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
 */
class Villain {
    /**
     * @param {int} id
     * @param {string} name
     * @param {string} image
     */
    constructor(name, image) {
        /**
         * @type {string}
         */
        this.name = name;
        /**
         * @type {string}
         */
        this.image = image;
    }
    toString() {
        return `${this.name}`;
    }
}

/**
 * Pair of villains, representing a match.
 */
class Pair {
    /**
     * @param {Villain} item1   Villain 1.
     * @param {Villain} item2   Villain 2.
     */
    constructor(item1, item2) {
        /**
         * @type {Villain}
         */
        this.item1 = item1;
        /**
         * @type {Villain}
         */
        this.item2 = item2;
        /**
         * @type {Villain}
         */
        this.winner = null;
        /**
         * @type {int}
         */
        this.score1 = 0;
        /**
         * @type {int}
         */
        this.score2 = 0;
    }
    toString() {
        return `(${this.item1}, ${this.item2})`;
    }
    /**
     * Set the results for this match.
     *
     * @param {int} score1 Number of games won by villain 1.
     * @param {int} score2 Number of games won by villain 2.
     */
    setScores(score1, score2) {
        this.score1 = score1;
        this.score2 = score2;
        this.setWinner();
    }
    /**
     * Updatest the value of `winner` depending on scores.
     */
    setWinner() {
        if (this.score1 > this.score2) {
            this.winner = this.item1;
        } else if (this.score2 > this.score1) {
            this.winner = this.item2;
        }
    }
}

/**
 * Round represented as a list of `Pair` elements.
 */
class Round {
    /**
     * @param {Pair[]} pairs Pairs of villains for the round.
     */
    constructor(pairs) {
        /**
         * @type {Pair[]}
         */
        this.pairs = pairs;
    }
    toString() {
        return `${this.pairs}`;
    }
    /**
     * @param {Pair} pair
     */
    push(pair) {
        this.pairs.push(pair);
    }
    /**
     * @returns {Pair}
     */
    pop() {
        return this.pairs.pop();
    }
    /**
     *
     * @param {(value: Pair, index: number, array: Pair[]) => void} callbackfn
     */
    forEach(callbackfn) {
        return this.pairs.forEach(callbackfn);
    }
    /**
     * @returns {int}
     */
    length() {
        return this.pairs.length;
    }
    /**
     * @returns {Round}
     */
    copy() {
        return new Round(this.pairs.slice());
    }
}

/**
 * Fixture with a list of rounds.
 */
class Fixture {
    /**
     * Fixture with a list of rounds.
     *
     * @param {int} current     Number of the current round (starting by 1).
     * @param {Round[]} rounds  List of Rounds.
     */
    constructor(current, rounds) {
        /**
         * @type {int}
         */
        this.current = current;
        /**
         * @type {Round[]}
         */
        this.rounds = rounds;
    }
    toString() {
        return `Current round = ${this.current}; Rounds: ${this.rounds}`;
    }
}


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
    let dummy = null;

    // Add dummy element if number is odd
    if (n % 2 > 0) {
        console.debug(`Odd number of elements (${n}). Creating dummy.`);
        dummy = n;
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

            // Ignore pair if it contains the dummy
            if (idx1 !== dummy && idx2 !== dummy) {
                pairs.push(new Pair(villains[idx1], villains[idx2]));
            }
        }
        rounds.push(pairs);
    }

    return rounds;
}

/**
 * Generates a list of rounds from a list of Villains.
 *
 * @param {Villain[]} villains
 * @param {any[][]} results Array of elements like ['villain1', score1, 'villain2', score2]
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
 * @param {any[][]} results Array of elements like ['villain1', score1, 'villain2', score2]
 */
function setResultsIntoFixture(fixture, results) {
    const resultsCopy = results.slice();
    fixture.rounds.forEach((round_pairs) =>
        round_pairs.forEach((pair) => {
            let result = null;
            let i = 0;
            while (result === null && i < resultsCopy.length) {
                const idxVillain1 = resultsCopy[i].indexOf(pair.item1.name);
                const idxVillain2 = resultsCopy[i].indexOf(pair.item2.name);
                if (idxVillain1 >= 0 && idxVillain2 >= 0) {
                    result = resultsCopy.splice(i, 1)[0];
                    pair.setScores(result[idxVillain1 + 1], result[idxVillain2 + 1]);
                }
                i++;
            }
        })
    );
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
            pair = [pair.item1.name, pair.score1, pair.item2.name, pair.score2];
            console.debug(pair);
            pairs.push(pair);
        });
    });

    // JSONify manually, to avoid line breaks inside a result array
    if (pairs.length > 0) {
        let jsonified = '[';
        pairs.forEach(pair => jsonified += `\n  ["${pair[0]}", ${pair[1]}, "${pair[2]}", ${pair[3]}],`);
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
 * @param {Fixture} fixtureData
 * @param {any[][]} results     Array of elements like ['villain1', score1, 'villain2', score2]
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

            // Score is dislayed only if there is data
            let scoresHtml = '<span class="villain-vs">vs</span>';
            if (pair.score1 || pair.score2) {
                scoresHtml =
                    `<span class="villain-score">${pair.score1}</span>
                    <span class="villain-vs">-</span>
                    <span class="villain-score">${pair.score2}</span>`;
            }

            // Row with pairing
            row.innerHTML =
                `<div class="villain villain-left ${resultClass1} col-xs-5">
                    <div class="villain-img-wrapper">
                        <img class="villain-img" src="assets/img/${pair.item1.image}" />
                    </div>
                </div>
                <div class="col-xs-2 text-center villain-vs-wrapper">
                    ${scoresHtml}
                </div>
                <div class="villain villain-right ${resultClass2} col-xs-5">
                    <div class="villain-img-wrapper">
                        <img class="villain-img" src="assets/img/${pair.item2.image}" />
                    </div>
                </div>`;
        });
    });

    document.getElementById("fixture-container").innerHTML = container.innerHTML;
}

/**
 * Generates HTML code to display the current standings.
 *
 * @param {Fixture} fixture
 */
function drawStandingsHtml(fixture) {
    const points = new Map();
    const wins = new Map();
    const losses = new Map();
    fixture.rounds.forEach((round, round_idx) => {
        round.forEach((pair, pair_idx) => {
            // Count only played matches
            if (pair.score1 || pair.score2) {
                points.set(pair.item1, (points.get(pair.item1) ?? 0) + pair.score1);
                points.set(pair.item2, (points.get(pair.item2) ?? 0) + pair.score2);
                if (pair.winner) {
                    wins.set(pair.winner, (wins.get(pair.winner) ?? 0) + 1);
                    const loser = (pair.winner === pair.item1) ? pair.item2 : pair.item1;
                    losses.set(loser, (losses.get(loser) ?? 0) + 1);
                }
            }
        });
    });

    const sortCoef = a => 2 * a.points + a.wins - a.losses;
    const standings = Array.from(points)
        .map(([k, v]) => ({
            villain: k,
            points: v,
            wins: wins.get(k) ?? 0,
            losses: losses.get(k) ?? 0,
        }))
        .sort((a, b) => sortCoef(b) - sortCoef(a));
    //console.debug(standings);

    const container = document.createElement("div");
    container.classList.add("standings");

    // Title
    // const title = document.createElement("div");
    // title.classList.add("standings-title");
    // title.textContent = "Standings";
    // container.appendChild(title);

    // Villains in top 3 and last position
    for (let i of [0, 1, 2, standings.length - 1]) {
        const data = standings[i];
        const isFirst = sortCoef(data) === sortCoef(standings[0]);
        const isLast = i === standings.length - 1;

        const item = document.createElement("div");
        item.classList.add("standings-item");
        if (isFirst) {
            item.classList.add("standings-first");
        } else if (isLast) {
            item.classList.add("standings-last");
        }

        item.innerHTML =
            `<div class="villain ${isLast ? 'villain-lost' : ''}">
                <div class="villain-img-wrapper">
                    <img class="villain-img" src="assets/img/${data.villain.image}" />
                </div>
            </div>
            <div class="results">
                ${data.points} P &nbsp;&nbsp;
                ${data.wins} W &nbsp;&nbsp;
                ${data.losses} L
            </div>`;

        if (isLast) {
            const filler = document.createElement("div");
            filler.classList.add("standings-before-last");
            filler.textContent = "...";
            container.appendChild(filler);
        }

        container.appendChild(item);
    }

    document.getElementById("standings-container").appendChild(container);
}

/**
 * Logic to be executed when the HTML page loads.
 *
 * @param {{ "name": string, "img": string }[]} villainsData
 * @param {Fixture} roundsData
 * @param {[string, int, string, int][]} resultsData
 */
function onPageLoad(villainsData, roundsData, resultsData) {
    const villains = loadVillains(villainsData);

    // A) Either load fixture from rounds data
    const fixture = loadFixture(villains, roundsData, resultsData);
    // B) or Generate new fixture from villains data
    //const fixture = generateFixture(villains, resultsData);
    //console.log(fixtureToJson(fixture));

    // Draw fixture as HTML
    drawFixtureHtml(fixture);
    drawStandingsHtml(fixture);

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
