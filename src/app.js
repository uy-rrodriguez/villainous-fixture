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
 * Global parameters
 */
const globalConfig = {
    sortBy: "ROUNDS",  // "MATCHES",
    isSortAsc: true,
};

/**
 * Villain with name and image.
 */
class Villain {
    /**
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
        /**
         * @type {int}
         */
        this.countMatches = 0;
    }
    toString() {
        return `${this.name}`;
    }
    /**
     * Generates the HTML code to print the `Villain` as part of a `Pair`.
     *
     * @param {boolean} isWinner Whether the `Villain` is the winner in the `Pair` being drawn.
     * @param {boolean} isLoser WHether the `Villain` is the loser in the `Pair` being drawn.
     * @returns HTML code.
     */
    toHtml(isWinner = false, isLoser = false) {
        let _class = isWinner ? "villain-won" : isLoser ? "villain-lost" : ""
        return `<div class="villain villain-left ${_class} col-xs-5">
                    <div class="villain-img-wrapper">
                        <img class="villain-img" src="assets/img/${this.image}" />
                        <span class="villain-name">${this.name}</span>
                    </div>
                </div>`;
    }
    /**
     * Returns whether both items refer to the same villain.
     *
     * @param {Villain} other Another villain to compare.
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
     * Generates the HTML code to print the `Pair` in a `Fixture`.
     *
     * @returns HTML code.
     */
    toHtml() {
        // Score is dislayed only if there is data
        let scoresHtml = '<span class="villain-vs">vs</span>';
        if (this.score1 || this.score2) {
            scoresHtml =
                `<span class="villain-score">${this.score1}</span>
                <span class="villain-vs">-</span>
                <span class="villain-score">${this.score2}</span>`;
        }
        let item1Won = this.winner === this.item1,
            item2Won = this.winner === this.item2;
        return `${this.item1.toHtml(item1Won, item2Won)}
                <div class="col-xs-2 text-center villain-vs-wrapper">
                    ${scoresHtml}
                </div>
                ${this.item2.toHtml(item2Won, item1Won)}`;
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
    getTotalMatches() {
        return this.item1.countMatches + this.item2.countMatches;
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
 * Generates a list of Rounds following the Simple Round Robin algorithm.
 *
 * @param {Villain[]} villains
 * @returns {Round[]}
 * @see https://en.wikipedia.org/wiki/Round-robin_tournament
 */
function getRoundsRobin(villains) {
    console.debug('getRoundsRobin');
    let rows = [];  // Rounds but only with the item ids
    let rounds = [];
    let n = villains.length;
    let dummy = null;

    // List of all item ids
    let ids = []
    for (let i = 0; i < n; i++) {
        ids.push(i);
    }

    // Add dummy element at position 1 if number is odd
    if (n % 2 > 0) {
        console.debug(`Odd number of elements (${n}). Creating dummy.`);
        dummy = "d";
        n = n+1;
        // Place dummy at the beginning, in the non-rotating slot
        // (i.e. invert first two positions)
        ids.push(ids.shift());
        ids.unshift(dummy);
        // ids.push(dummy);
    }

    // First round pairs 1<->n, 2<->(n-1), 3<->(n-2), etc.
    let row = [];
    for (let i = 0; i < n / 2; i++) {
        row.push(ids[i]);
        row.push(ids[n-1-i]);
    }
    console.debug(`Round 1, row: ${row}`);
    rows.push(row);

    // Following n-2 rounds fix item 1 and rotate the rest, shifting them one
    // position forward. Last item moves to position 2 in the array.
    //
    for (let r = 1; r < n-1; r++) {
        const prevIds = ids;
        ids = [prevIds[0], prevIds[n-1]];
        for (let i = 1; i < n-1; i++) {
            ids.push(prevIds[i]);
        }

        row = []
        for (let i = 0; i < n / 2; i++) {
            row.push(ids[i]);
            row.push(ids[n-1-i]);
        }
        console.debug(`Round ${r+1}, row: ${row}`);
        rows.push(row);
    }

    // Generate Rounds of Pairs
    // The position of item 1 is inverted for each odd row to make it go second.
    //
    for (let r = 0; r < n-1; r++) {
        const pairs = [];
        for (let i = 0; i < n-1; i+=2) {
            const idx1 = rows[r][i];
            const idx2 = rows[r][i+1];

            // Ignore pair if it contains the dummy
            if (idx1 !== dummy && idx2 !== dummy) {
                if (r % 2 > 0) {
                    pairs.push(new Pair(villains[idx2], villains[idx1]));
                }
                else{
                    pairs.push(new Pair(villains[idx1], villains[idx2]));
                }
            }
        }
        rounds.push(new Round(pairs));
    }

    // console.debug(rounds);
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
    // let rounds = getRoundsBerger(villains);
    let rounds = getRoundsRobin(villains);
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
                    pair.item1.countMatches++;
                    pair.item2.countMatches++;
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
            // console.debug(pair);
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
 * Groups pairs by total number of matches played by both villains.
 *
 * @param {Fixture} fixture Current `Fixture`.
 * @returns
 */
function groupPairsByMatches(fixture) {
    let pairs = [];

    // Count number of played games per villain
    fixture.rounds.forEach((round, round_idx) => {
        round.id = round_idx + 1;
        round.forEach((pair, pair_idx) => {
            pair.round = round;
            pairs.push(pair);
        });
    });

    // Sort by the total matches played by both villains in the match
    pairs.sort(
        (a, b) =>
            (globalConfig.isSortAsc ? 1 : -1)
                * (a.getTotalMatches() - b.getTotalMatches())
    );

    let groups = pairs.reduce(function (rv, pair) {
        (rv[pair.getTotalMatches()] ??= []).push(pair);
        return rv;
    }, {});

    return groups;
}

/**
 * Generates HTML code to display the fixture.
 *
 * @param {Fixture} fixture
 */
function drawFixtureHtml(fixture) {
    const container = document.createElement("div");

    if (globalConfig.sortBy === "MATCHES") {
        const groups = groupPairsByMatches(fixture);

        let i = 1;
        for (const totGames in groups) {
            const groupPairs = groups[totGames];

            const panel = document.createElement("div");
            panel.classList.add("panel", "panel-default");
            container.appendChild(panel);

            panel.innerHTML =
                `<div id="round${i++}" class="panel-heading">
                    <div class="row">
                        <div class="col-md-9 col-sm-12 col-xs-12">
                            <h3 class="panel-title">
                                <strong>Games played ${totGames}</strong>
                            </h3>
                        </div>
                    </div>
                </div>`;

            const body = document.createElement("div");
            body.classList.add("panel-body");
            panel.appendChild(body);

            groupPairs.forEach((pair, pair_idx) => {
                const row = document.createElement("div");
                row.classList.add("row", "row-pad-18", "vertical-align");
                body.appendChild(row);

                // Row with pairing
                row.innerHTML = pair.toHtml();
            });
        }
    }
    else {
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

                // Row with pairing
                row.innerHTML = pair.toHtml();
            });
        });
    }

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

    const standingsElem = document.getElementById("standings-container");

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("standings");

    const interContainer = document.createElement("div");
    interContainer.classList.add("intermediate");

    // Title
    // const title = document.createElement("div");
    // title.classList.add("standings-title");
    // title.textContent = "Standings";
    // container.appendChild(title);

    // Villains in top 3 and last position
    // for (let i of [0, 1, 2, standings.length - 1]) {
    for (let i = 0; i < standings.length; i++) {
        const data = standings[i];
        const isFirst = sortCoef(data) === sortCoef(standings[0]);
        const isLast = i === standings.length - 1;

        // Add container for villains at intermediate positions
        if (i === 3) {
            mainContainer.appendChild(interContainer);
        }

        const item = document.createElement("div");
        item.classList.add("standings-item");
        if (isFirst) {
            item.classList.add("standings-first");
        } else if (isLast) {
            item.classList.add("standings-last");
        }

        item.innerHTML =
            `<div class="pos">${i+1}</div>
            <div class="villain ${isLast ? 'villain-lost' : ''}">
                <div class="villain-img-wrapper">
                    <img class="villain-img" src="assets/img/${data.villain.image}" />
                </div>
            </div>
            <div class="results">
                <span class="victories" title="Victories">${data.victories} 🏆</span>
                <span class="wins" title="Wins">${data.wins} 🥇</span>
                <span class="losses" title="Losses">${data.losses} 🥈</span>
            </div>`;

        if (isLast) {
            const filler = document.createElement("div");
            filler.classList.add("standings-before-last");
            filler.textContent = "...";
            filler.title = "Show all";
            filler.onclick = () => {
                interContainer.classList.toggle("shown");
                standingsElem.classList.toggle("with-intermediate");
                filler.classList.toggle("with-intermediate");
                if (interContainer.classList.contains("shown")) {
                    interContainer.style.height =
                        `${interContainer.dataset.height}px`;
                    filler.textContent = "^";
                    filler.title = "Hide";
                } else {
                    interContainer.style.height = 0;
                    filler.textContent = "...";
                    filler.title = "Show all";
                }
            };
            mainContainer.appendChild(filler);
        }

        if (i > 2 && i < standings.length - 1) {
            interContainer.appendChild(item);
        }
        else {
            mainContainer.appendChild(item);
        }
    }

    // Add standings to wrapping container
    standingsElem.appendChild(mainContainer);

    // Add button to toggle standings
    const toggleWrapper = document.createElement("div");
    toggleWrapper.id = "standings-toggle-wrapper";
    toggleWrapper.classList.add("sidebar-toggle-wrapper");
    const toggle = document.createElement("button");
    toggleWrapper.appendChild(toggle);
    toggle.textContent = "🏆";
    toggle.onclick = () => {
        toggleWrapper.classList.toggle("active");
    };
    standingsElem.parentNode.insertBefore(toggleWrapper, standingsElem);

    // Calculate total height of intermediate container (for animation)
    interContainer.dataset.height = interContainer.offsetHeight;
    interContainer.style.height = 0;
}

/**
 * Draws the inputs allowing the change of config (e.g. chose the pairs sorting
 * order).
 *
 * @param {Fixture} fixture Current fixture
 * @returns HTMLElement of the select box.
 */
function drawConfigSidebar(fixture) {
    const opts = [
        {text: "Sort by rounds", value: "ROUNDS"},
        {text: "Sort by matches", value: "MATCHES"},
    ];

    const sortBy = document.createElement("select");
    sortBy.id = "sort_by";
    sortBy.name = "sort_by";
    opts.forEach((opt) => {
        const option = document.createElement("option");
        option.text = opt.text;
        option.value = opt.value;
        sortBy.add(option);
    });
    sortBy.onchange = (evt) => {
        // Reload fixture
        globalConfig.sortBy = evt.target.value;
        drawFixtureHtml(fixture);
        const rounds = drawRoundSelector(fixture);
        triggerScroll(rounds, rounds.value);
    };

    // Update global config
    globalConfig.sortBy = sortBy.value;

    // Display sidebar HTML elements
    const configElem = document.getElementById("config-container");
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("config");

    // Title
    const title = document.createElement("div");
    title.classList.add("sidebar-title");
    title.textContent = "Parameters";
    mainContainer.appendChild(title);

    // Add inputs to wrapping container
    mainContainer.appendChild(sortBy);
    configElem.appendChild(mainContainer);

    // Add button to toggle standings
    const toggleWrapper = document.createElement("div");
    toggleWrapper.id = "config-toggle-wrapper";
    toggleWrapper.classList.add("sidebar-toggle-wrapper");
    const toggle = document.createElement("button");
    toggleWrapper.appendChild(toggle);
    toggle.textContent = "🔧";
    toggle.onclick = () => {
        toggleWrapper.classList.toggle("active");
    };
    configElem.parentNode.insertBefore(toggleWrapper, configElem);
}

/**
 * Draws and returns a select box to quickly scroll between rounds.
 *
 * @param {Fixture} fixture Current fixture
 * @returns HTMLElement of the select box.
 */
function drawRoundSelector(fixture) {
    const opts = [];

    if (globalConfig.sortBy === "MATCHES") {
        const groups = groupPairsByMatches(fixture);
        for (const totGames in groups) {
            opts.push({
                text: `Games ${totGames}`
            });
        }
    }
    else {
        const currentRound = fixture.current;
        for (let i = 1; i <= fixture.rounds.length; i++) {
            opts.push({
                text: `Round ${i}`,
                cls: (i < currentRound) ? "complete"
                    : (i === currentRound) ? "current"
                    : null
            });
        }
    }

    const rounds = document.getElementById("rounds");
    const select = document.createElement("select");
    opts.forEach((opt, i) => {
        const option = document.createElement("option");
        option.text = opt.text;
        option.value = `${i+1}`;
        if (opt.cls) {
            option.classList.add(opt.cls);
        }
        select.add(option);
    });
    rounds.onchange = (evt) => {
        scrollToRound(evt.target.value, true);
    };
    rounds.innerHTML = select.innerHTML;

    return rounds;
}

function triggerScroll(roundsSelect, roundValue) {
    roundsSelect.value = roundValue;
    roundsSelect.dispatchEvent(new Event("change"));
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
    // const fixture = generateFixture(villains, resultsData);
    // C) or Update existing fixture with new villains data
    // const oldFixture = loadFixture(villains, roundsData, []);
    // const fixture = generateFixture(villains, resultsData, oldFixture);

    // console.log(fixtureToJson(fixture));

    // Draw fixture as HTML
    drawFixtureHtml(fixture);
    drawStandingsHtml(fixture);
    drawConfigSidebar(fixture);

    // Calculate header size once
    animateHeader();

    // Draw round selector
    const rounds = drawRoundSelector(fixture);

    // Go to current round
    if (globalConfig.sortBy === "ROUNDS") {
        triggerScroll(rounds, fixture.current);
    }
}
