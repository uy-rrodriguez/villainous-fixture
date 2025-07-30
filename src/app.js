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
    /**
     * Returns whether both items refer to the same villain.
     *
     * @param {villain} other Another villain to compare.
     * @returns {boolean}
     */
    equals(other) {
        return this.name === other.name;
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
    /**
     * Creates a shallow copy of this element.
     * @returns {Pair}
     */
    copy() {
        const pair = new Pair(this.item1, this.item2);
        pair.score1 = this.score1;
        pair.score2 = this.score2;
        pair.winner = this.winner;
        return pair;
    }
    /**
     * Returns whether both pairs refer to the same items.
     *
     * @param {Pair} other Another pair to compare.
     * @returns {boolean}
     */
    equals(other) {
        return this.item1.equals(other.item1)
          && this.item2.equals(other.item2)
          || this.item1.equals(other.item2)
          && this.item2.equals(other.item1);
    }
    /**
     * Returns whether the pairs share at least one item.
     *
     * @param {Pair} other Another pair to compare.
     * @returns {boolean}
     */
    intersects(other) {
        return this.item1.equals(other.item1)
          || this.item2.equals(other.item2)
          || this.item1.equals(other.item2)
          || this.item2.equals(other.item1);
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
        pair.round = this;
    }
    /**
     * @returns {Pair}
     */
    pop() {
        pair = this.pairs.pop();
        pair.round = null;
        return pair;
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
        const pairs = this.pairs.map((p) => p.copy());
        const round = new Round(pairs);
        return round;
    }
    /**
     * Returns where the pair appears in this round.
     *
     * @param {Pair} pair A pair to search for.
     * @returns {boolean}
     */
    includes(pair) {
        for (let p of this.pairs) {
            if (p.equals(pair)) {
                return true;
            }
        }
        return false;
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
    /**
     * Returns where the pair appears in any round of this fixture.
     *
     * @param {Pair} pair A pair to search for.
     * @returns {boolean}
     */
    includes(pair) {
        for (let r of this.rounds) {
            if (r.includes(pair)) {
                return true;
            }
        }
        return false;
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
        rounds.push(new Round(pairs));
    }

    return rounds;
}

/**
 * Adds the missing pairs from every round of roundsB into roundsA.
 *
 * Since the distribution of pairs in the rounds might differ,
 * including the length of rounds, all new pairs from B are added
 * to A causing minimal disruption. All pairs in B that are not in
 * A, are distributed by order of appearance at the end of the
 * rounds of A, making sure that all rounds have the same length as
 * they have in B.
 *
 * @param {Round[]} a
 * @param {Round[]} b
 * @returns {Round[]}
 */
function mergeRounds(a, b) {
    // The result is a shallow copy of A
    const result = a.map((r) => r.copy());

    // Extract pairings from B not in A
    const fixA = new Fixture(1, a);
    let newPairs = b
        .flatMap((r) => r.pairs)
        .filter((p) => ! fixA.includes(p));

    // Calculate difference of round length between A and B
    const roundLength = b[0].length();
    const diff = roundLength - a[0].length();

    // Add pairs to rounds of A equal to the difference
    for (let round of result) {
        // Filter pairs from B that can be added to this round
        let validPairs = newPairs
            .filter((bp) =>
                ! round.pairs.some((ap) => ap.intersects(bp)));
    
        // Add pairs to A
        validPairs = validPairs.splice(0, Math.min(diff, validPairs.length));
        validPairs.forEach((bp) => round.push(bp));

        // Remove from pending
        newPairs = newPairs.filter((bp) => ! validPairs.includes(bp));
    }

    // Remaining pairs are placed into additional rounds
    const extraRounds = newPairs.length / roundLength;
    for (let i = 0; i < newPairs.length; i += roundLength) {
        const newRound = newPairs.slice(i, i + roundLength);
        result.push(new Round(newRound));
    }

    return result;
}

/**
 * Generates a list of rounds from a list of Villains.
 *
 * @param {Villain[]} villains
 * @param {any[][]} results Array of elements like ['villain1', score1, 'villain2', score2]
 * @param {Fixture} fixtureToUpdate (Optional) Existing fixture to update based on the new
       rounds calculated from the given villains. Useful when villains are added and you
       don't want to alter the entire fixture.
 * @returns {Fixture}
 */
function generateFixture(villains, results, fixtureToUpdate = null) {
    let rounds = getRoundsBerger(villains);
    let currentRound = 1;
    if (fixtureToUpdate != null) {
        rounds = mergeRounds(fixtureToUpdate.rounds, rounds);
        currentRound = fixtureToUpdate.current;
    }
    const fixture = new Fixture(currentRound, rounds);
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
        fixture.rounds.push(new Round(roundPairs));
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
                        <span class="villain-name">${pair.item1.name}</span>
                    </div>
                </div>
                <div class="col-xs-2 text-center villain-vs-wrapper">
                    ${scoresHtml}
                </div>
                <div class="villain villain-right ${resultClass2} col-xs-5">
                    <div class="villain-img-wrapper">
                        <img class="villain-img" src="assets/img/${pair.item2.image}" />
                        <span class="villain-name">${pair.item2.name}</span>
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
    const wins = new Map();
    const losses = new Map();
    const victories = new Map();
    const defeats = new Map();
    fixture.rounds.forEach((round, round_idx) => {
        round.forEach((pair, pair_idx) => {
            // Count only played matches
            if (pair.score1 || pair.score2) {
                wins.set(pair.item1, (wins.get(pair.item1) ?? 0) + pair.score1);
                wins.set(pair.item2, (wins.get(pair.item2) ?? 0) + pair.score2);
                losses.set(pair.item1, (losses.get(pair.item1) ?? 0) + pair.score2);
                losses.set(pair.item2, (losses.get(pair.item2) ?? 0) + pair.score1);
                if (pair.winner) {
                    victories.set(pair.winner, (victories.get(pair.winner) ?? 0) + 1);
                    const loser = (pair.winner === pair.item1) ? pair.item2 : pair.item1;
                    defeats.set(loser, (defeats.get(loser) ?? 0) + 1);
                }
            }
        });
    });

    const sortCoef = a => 2 * a.wins + a.victories - a.defeats - a.losses;
    const standings = Array.from(wins)
        .map(([k, v]) => ({
            villain: k,
            wins: v,
            losses: losses.get(k) ?? 0,
            victories: victories.get(k) ?? 0,
            defeats: defeats.get(k) ?? 0,
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
                ${data.wins} 🏆 &nbsp;&nbsp;
                ${data.victories} 🥇 &nbsp;&nbsp;
                ${data.defeats} 🥈 &nbsp;&nbsp;
            </div>`;

        if (isLast) {
            const filler = document.createElement("div");
            filler.classList.add("standings-before-last");
            filler.textContent = "...";
            container.appendChild(filler);
        }

        container.appendChild(item);
    }

    const standingsElem = document.getElementById("standings-container");
    standingsElem.appendChild(container);

    // Add button to toggle standings
    const toggleWrapper = document.createElement("div");
    toggleWrapper.id = "standings-toggle-wrapper";
    const toggle = document.createElement("button");
    toggleWrapper.appendChild(toggle);
    toggle.textContent = "🏆";
    toggle.onclick = () => {
        toggleWrapper.classList.toggle("active");
    };
    standingsElem.parentNode.insertBefore(toggleWrapper, standingsElem);
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
    // C) or Updtate existing fixture with new villains data
    //const oldFixture = loadFixture(villains, roundsData, []);
    //const fixture = generateFixture(villains, resultsData, oldFixture);
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
