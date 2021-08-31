# Disney Villainous - The Ultimate Battle for Evil

I'm a big fan of the board game [Disney Villainous](https://boardgamegeek.com/boardgame/256382/disney-villainous)
where players take on the roles of classic Disney villains and try to achieve their schemes.

This is a simple project implemented in plain HTML, JavaScript and CSS. It represents a tournament-like fixture
where all villains are paired to compete against each other, in the ultimate battle for Evil! :smiling_imp:

Villains data (name and image) is loaded from the JavaScript file `villains_data.js`.

Rounds are generated using the [round-robin tournament algorithm](https://en.wikipedia.org/wiki/Round-robin_tournament)
of Berger tables, that basically calculates pairings based on the relative positions of previous rounds.

The results are stored in the file `rounds_data.js` to be processed and drawn on the page load event.


### Copyright notice
The developers of this tool don't own any of the images used.

&copy;Disney Villainous is game designed by Prospero Hall, while different editions are produced by different
publishers, including Wonder Forge and Ravensburger. 

All images have been taken from https://disney-villainous.fandom.com/. Image files are copyrighted by their authors.
They must be used in a way that qualifies as fair use under US copyright law. Content of the &copy;Disney Villainous
Fandom wiki is available under the license [CC-BY-SA](https://www.fandom.com/licensing) unless otherwise noted.
