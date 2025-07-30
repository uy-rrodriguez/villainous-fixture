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

const roundsData = {
  "current": 1,
  "rounds": [
    [
      {
        "1": "Hades",
        "2": "Oogie Boogie"
      },
      {
        "1": "Scar",
        "2": "Cruella"
      },
      {
        "1": "Pete",
        "2": "Evil Queen"
      },
      {
        "1": "Ursula",
        "2": "Maleficent"
      },
      {
        "1": "Yzma",
        "2": "Jafar"
      },
      {
        "1": "Ratigan",
        "2": "Dr. Facilier"
      },
      {
        "1": "Queen of Hearts",
        "2": "Prince John"
      },
      {
        "1": "Captain Hook",
        "2": "Mother Gothel"
      },
      {
        "1": "Gaston",
        "2": "Horned King"
      },
      {
        "1": "Syndrome",
        "2": "Lady Tremaine"
      },
      {
        "1": "Madame Mim",
        "2": "Lotso"
      }
    ],
    [
      {
        "1": "Cruella",
        "2": "Hades"
      },
      {
        "1": "Evil Queen",
        "2": "Oogie Boogie"
      },
      {
        "1": "Maleficent",
        "2": "Scar"
      },
      {
        "1": "Jafar",
        "2": "Pete"
      },
      {
        "1": "Dr. Facilier",
        "2": "Ursula"
      },
      {
        "1": "Prince John",
        "2": "Yzma"
      },
      {
        "1": "Mother Gothel",
        "2": "Ratigan"
      },
      {
        "1": "Horned King",
        "2": "Queen of Hearts"
      },
      {
        "1": "Lady Tremaine",
        "2": "Captain Hook"
      },
      {
        "1": "Lotso",
        "2": "Gaston"
      },
      {
        "1": "Madame Mim",
        "2": "Syndrome"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Evil Queen"
      },
      {
        "1": "Cruella",
        "2": "Maleficent"
      },
      {
        "1": "Oogie Boogie",
        "2": "Jafar"
      },
      {
        "1": "Scar",
        "2": "Dr. Facilier"
      },
      {
        "1": "Pete",
        "2": "Prince John"
      },
      {
        "1": "Ursula",
        "2": "Mother Gothel"
      },
      {
        "1": "Yzma",
        "2": "Horned King"
      },
      {
        "1": "Ratigan",
        "2": "Lady Tremaine"
      },
      {
        "1": "Queen of Hearts",
        "2": "Lotso"
      },
      {
        "1": "Captain Hook",
        "2": "Madame Mim"
      },
      {
        "1": "Gaston",
        "2": "Syndrome"
      }
    ],
    [
      {
        "1": "Maleficent",
        "2": "Hades"
      },
      {
        "1": "Jafar",
        "2": "Evil Queen"
      },
      {
        "1": "Dr. Facilier",
        "2": "Cruella"
      },
      {
        "1": "Prince John",
        "2": "Oogie Boogie"
      },
      {
        "1": "Mother Gothel",
        "2": "Scar"
      },
      {
        "1": "Horned King",
        "2": "Pete"
      },
      {
        "1": "Lady Tremaine",
        "2": "Ursula"
      },
      {
        "1": "Lotso",
        "2": "Yzma"
      },
      {
        "1": "Madame Mim",
        "2": "Ratigan"
      },
      {
        "1": "Syndrome",
        "2": "Queen of Hearts"
      },
      {
        "1": "Gaston",
        "2": "Captain Hook"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Jafar"
      },
      {
        "1": "Maleficent",
        "2": "Dr. Facilier"
      },
      {
        "1": "Evil Queen",
        "2": "Prince John"
      },
      {
        "1": "Cruella",
        "2": "Mother Gothel"
      },
      {
        "1": "Oogie Boogie",
        "2": "Horned King"
      },
      {
        "1": "Scar",
        "2": "Lady Tremaine"
      },
      {
        "1": "Pete",
        "2": "Lotso"
      },
      {
        "1": "Ursula",
        "2": "Madame Mim"
      },
      {
        "1": "Yzma",
        "2": "Syndrome"
      },
      {
        "1": "Ratigan",
        "2": "Gaston"
      },
      {
        "1": "Queen of Hearts",
        "2": "Captain Hook"
      }
    ],
    [
      {
        "1": "Dr. Facilier",
        "2": "Hades"
      },
      {
        "1": "Prince John",
        "2": "Jafar"
      },
      {
        "1": "Mother Gothel",
        "2": "Maleficent"
      },
      {
        "1": "Horned King",
        "2": "Evil Queen"
      },
      {
        "1": "Lady Tremaine",
        "2": "Cruella"
      },
      {
        "1": "Lotso",
        "2": "Oogie Boogie"
      },
      {
        "1": "Madame Mim",
        "2": "Scar"
      },
      {
        "1": "Syndrome",
        "2": "Pete"
      },
      {
        "1": "Gaston",
        "2": "Ursula"
      },
      {
        "1": "Captain Hook",
        "2": "Yzma"
      },
      {
        "1": "Queen of Hearts",
        "2": "Ratigan"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Prince John"
      },
      {
        "1": "Dr. Facilier",
        "2": "Mother Gothel"
      },
      {
        "1": "Jafar",
        "2": "Horned King"
      },
      {
        "1": "Maleficent",
        "2": "Lady Tremaine"
      },
      {
        "1": "Evil Queen",
        "2": "Lotso"
      },
      {
        "1": "Cruella",
        "2": "Madame Mim"
      },
      {
        "1": "Oogie Boogie",
        "2": "Syndrome"
      },
      {
        "1": "Scar",
        "2": "Gaston"
      },
      {
        "1": "Pete",
        "2": "Captain Hook"
      },
      {
        "1": "Ursula",
        "2": "Queen of Hearts"
      },
      {
        "1": "Yzma",
        "2": "Ratigan"
      }
    ],
    [
      {
        "1": "Mother Gothel",
        "2": "Hades"
      },
      {
        "1": "Horned King",
        "2": "Prince John"
      },
      {
        "1": "Lady Tremaine",
        "2": "Dr. Facilier"
      },
      {
        "1": "Lotso",
        "2": "Jafar"
      },
      {
        "1": "Madame Mim",
        "2": "Maleficent"
      },
      {
        "1": "Syndrome",
        "2": "Evil Queen"
      },
      {
        "1": "Gaston",
        "2": "Cruella"
      },
      {
        "1": "Captain Hook",
        "2": "Oogie Boogie"
      },
      {
        "1": "Queen of Hearts",
        "2": "Scar"
      },
      {
        "1": "Ratigan",
        "2": "Pete"
      },
      {
        "1": "Yzma",
        "2": "Ursula"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Horned King"
      },
      {
        "1": "Mother Gothel",
        "2": "Lady Tremaine"
      },
      {
        "1": "Prince John",
        "2": "Lotso"
      },
      {
        "1": "Dr. Facilier",
        "2": "Madame Mim"
      },
      {
        "1": "Jafar",
        "2": "Syndrome"
      },
      {
        "1": "Maleficent",
        "2": "Gaston"
      },
      {
        "1": "Evil Queen",
        "2": "Captain Hook"
      },
      {
        "1": "Cruella",
        "2": "Queen of Hearts"
      },
      {
        "1": "Oogie Boogie",
        "2": "Ratigan"
      },
      {
        "1": "Scar",
        "2": "Yzma"
      },
      {
        "1": "Pete",
        "2": "Ursula"
      }
    ],
    [
      {
        "1": "Lady Tremaine",
        "2": "Hades"
      },
      {
        "1": "Lotso",
        "2": "Horned King"
      },
      {
        "1": "Madame Mim",
        "2": "Mother Gothel"
      },
      {
        "1": "Syndrome",
        "2": "Prince John"
      },
      {
        "1": "Gaston",
        "2": "Dr. Facilier"
      },
      {
        "1": "Captain Hook",
        "2": "Jafar"
      },
      {
        "1": "Queen of Hearts",
        "2": "Maleficent"
      },
      {
        "1": "Ratigan",
        "2": "Evil Queen"
      },
      {
        "1": "Yzma",
        "2": "Cruella"
      },
      {
        "1": "Ursula",
        "2": "Oogie Boogie"
      },
      {
        "1": "Pete",
        "2": "Scar"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Lotso"
      },
      {
        "1": "Lady Tremaine",
        "2": "Madame Mim"
      },
      {
        "1": "Horned King",
        "2": "Syndrome"
      },
      {
        "1": "Mother Gothel",
        "2": "Gaston"
      },
      {
        "1": "Prince John",
        "2": "Captain Hook"
      },
      {
        "1": "Dr. Facilier",
        "2": "Queen of Hearts"
      },
      {
        "1": "Jafar",
        "2": "Ratigan"
      },
      {
        "1": "Maleficent",
        "2": "Yzma"
      },
      {
        "1": "Evil Queen",
        "2": "Ursula"
      },
      {
        "1": "Cruella",
        "2": "Pete"
      },
      {
        "1": "Oogie Boogie",
        "2": "Scar"
      }
    ],
    [
      {
        "1": "Madame Mim",
        "2": "Hades"
      },
      {
        "1": "Syndrome",
        "2": "Lotso"
      },
      {
        "1": "Gaston",
        "2": "Lady Tremaine"
      },
      {
        "1": "Captain Hook",
        "2": "Horned King"
      },
      {
        "1": "Queen of Hearts",
        "2": "Mother Gothel"
      },
      {
        "1": "Ratigan",
        "2": "Prince John"
      },
      {
        "1": "Yzma",
        "2": "Dr. Facilier"
      },
      {
        "1": "Ursula",
        "2": "Jafar"
      },
      {
        "1": "Pete",
        "2": "Maleficent"
      },
      {
        "1": "Scar",
        "2": "Evil Queen"
      },
      {
        "1": "Oogie Boogie",
        "2": "Cruella"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Syndrome"
      },
      {
        "1": "Madame Mim",
        "2": "Gaston"
      },
      {
        "1": "Lotso",
        "2": "Captain Hook"
      },
      {
        "1": "Lady Tremaine",
        "2": "Queen of Hearts"
      },
      {
        "1": "Horned King",
        "2": "Ratigan"
      },
      {
        "1": "Mother Gothel",
        "2": "Yzma"
      },
      {
        "1": "Prince John",
        "2": "Ursula"
      },
      {
        "1": "Dr. Facilier",
        "2": "Pete"
      },
      {
        "1": "Jafar",
        "2": "Scar"
      },
      {
        "1": "Maleficent",
        "2": "Oogie Boogie"
      },
      {
        "1": "Evil Queen",
        "2": "Cruella"
      }
    ],
    [
      {
        "1": "Gaston",
        "2": "Hades"
      },
      {
        "1": "Captain Hook",
        "2": "Syndrome"
      },
      {
        "1": "Queen of Hearts",
        "2": "Madame Mim"
      },
      {
        "1": "Ratigan",
        "2": "Lotso"
      },
      {
        "1": "Yzma",
        "2": "Lady Tremaine"
      },
      {
        "1": "Ursula",
        "2": "Horned King"
      },
      {
        "1": "Pete",
        "2": "Mother Gothel"
      },
      {
        "1": "Scar",
        "2": "Prince John"
      },
      {
        "1": "Oogie Boogie",
        "2": "Dr. Facilier"
      },
      {
        "1": "Cruella",
        "2": "Jafar"
      },
      {
        "1": "Evil Queen",
        "2": "Maleficent"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Captain Hook"
      },
      {
        "1": "Gaston",
        "2": "Queen of Hearts"
      },
      {
        "1": "Syndrome",
        "2": "Ratigan"
      },
      {
        "1": "Madame Mim",
        "2": "Yzma"
      },
      {
        "1": "Lotso",
        "2": "Ursula"
      },
      {
        "1": "Lady Tremaine",
        "2": "Pete"
      },
      {
        "1": "Horned King",
        "2": "Scar"
      },
      {
        "1": "Mother Gothel",
        "2": "Oogie Boogie"
      },
      {
        "1": "Prince John",
        "2": "Cruella"
      },
      {
        "1": "Dr. Facilier",
        "2": "Evil Queen"
      },
      {
        "1": "Jafar",
        "2": "Maleficent"
      }
    ],
    [
      {
        "1": "Queen of Hearts",
        "2": "Hades"
      },
      {
        "1": "Ratigan",
        "2": "Captain Hook"
      },
      {
        "1": "Yzma",
        "2": "Gaston"
      },
      {
        "1": "Ursula",
        "2": "Syndrome"
      },
      {
        "1": "Pete",
        "2": "Madame Mim"
      },
      {
        "1": "Scar",
        "2": "Lotso"
      },
      {
        "1": "Oogie Boogie",
        "2": "Lady Tremaine"
      },
      {
        "1": "Cruella",
        "2": "Horned King"
      },
      {
        "1": "Evil Queen",
        "2": "Mother Gothel"
      },
      {
        "1": "Maleficent",
        "2": "Prince John"
      },
      {
        "1": "Jafar",
        "2": "Dr. Facilier"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Ratigan"
      },
      {
        "1": "Queen of Hearts",
        "2": "Yzma"
      },
      {
        "1": "Captain Hook",
        "2": "Ursula"
      },
      {
        "1": "Gaston",
        "2": "Pete"
      },
      {
        "1": "Syndrome",
        "2": "Scar"
      },
      {
        "1": "Madame Mim",
        "2": "Oogie Boogie"
      },
      {
        "1": "Lotso",
        "2": "Cruella"
      },
      {
        "1": "Lady Tremaine",
        "2": "Evil Queen"
      },
      {
        "1": "Horned King",
        "2": "Maleficent"
      },
      {
        "1": "Mother Gothel",
        "2": "Jafar"
      },
      {
        "1": "Prince John",
        "2": "Dr. Facilier"
      }
    ],
    [
      {
        "1": "Yzma",
        "2": "Hades"
      },
      {
        "1": "Ursula",
        "2": "Ratigan"
      },
      {
        "1": "Pete",
        "2": "Queen of Hearts"
      },
      {
        "1": "Scar",
        "2": "Captain Hook"
      },
      {
        "1": "Oogie Boogie",
        "2": "Gaston"
      },
      {
        "1": "Cruella",
        "2": "Syndrome"
      },
      {
        "1": "Evil Queen",
        "2": "Madame Mim"
      },
      {
        "1": "Maleficent",
        "2": "Lotso"
      },
      {
        "1": "Jafar",
        "2": "Lady Tremaine"
      },
      {
        "1": "Dr. Facilier",
        "2": "Horned King"
      },
      {
        "1": "Prince John",
        "2": "Mother Gothel"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Ursula"
      },
      {
        "1": "Yzma",
        "2": "Pete"
      },
      {
        "1": "Ratigan",
        "2": "Scar"
      },
      {
        "1": "Queen of Hearts",
        "2": "Oogie Boogie"
      },
      {
        "1": "Captain Hook",
        "2": "Cruella"
      },
      {
        "1": "Gaston",
        "2": "Evil Queen"
      },
      {
        "1": "Syndrome",
        "2": "Maleficent"
      },
      {
        "1": "Madame Mim",
        "2": "Jafar"
      },
      {
        "1": "Lotso",
        "2": "Dr. Facilier"
      },
      {
        "1": "Lady Tremaine",
        "2": "Prince John"
      },
      {
        "1": "Horned King",
        "2": "Mother Gothel"
      }
    ],
    [
      {
        "1": "Pete",
        "2": "Hades"
      },
      {
        "1": "Scar",
        "2": "Ursula"
      },
      {
        "1": "Oogie Boogie",
        "2": "Yzma"
      },
      {
        "1": "Cruella",
        "2": "Ratigan"
      },
      {
        "1": "Evil Queen",
        "2": "Queen of Hearts"
      },
      {
        "1": "Maleficent",
        "2": "Captain Hook"
      },
      {
        "1": "Jafar",
        "2": "Gaston"
      },
      {
        "1": "Dr. Facilier",
        "2": "Syndrome"
      },
      {
        "1": "Prince John",
        "2": "Madame Mim"
      },
      {
        "1": "Mother Gothel",
        "2": "Lotso"
      },
      {
        "1": "Horned King",
        "2": "Lady Tremaine"
      }
    ],
    [
      {
        "1": "Hades",
        "2": "Scar"
      },
      {
        "1": "Pete",
        "2": "Oogie Boogie"
      },
      {
        "1": "Ursula",
        "2": "Cruella"
      },
      {
        "1": "Yzma",
        "2": "Evil Queen"
      },
      {
        "1": "Ratigan",
        "2": "Maleficent"
      },
      {
        "1": "Queen of Hearts",
        "2": "Jafar"
      },
      {
        "1": "Captain Hook",
        "2": "Dr. Facilier"
      },
      {
        "1": "Gaston",
        "2": "Prince John"
      },
      {
        "1": "Syndrome",
        "2": "Mother Gothel"
      },
      {
        "1": "Madame Mim",
        "2": "Horned King"
      },
      {
        "1": "Lotso",
        "2": "Lady Tremaine"
      }
    ]
  ]
};
