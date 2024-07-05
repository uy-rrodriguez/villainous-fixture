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
  "current": 3,
  "rounds": [
    [
      {
        "1": "Hades",
        "2": "Cruella"
      },
      {
        "1": "Scar",
        "2": "Evil Queen"
      },
      {
        "1": "Pete",
        "2": "Maleficent"
      },
      {
        "1": "Ursula",
        "2": "Jafar"
      },
      {
        "1": "Yzma",
        "2": "Dr. Facilier"
      },
      {
        "1": "Ratigan",
        "2": "Prince John"
      },
      {
        "1": "Queen of Hearts",
        "2": "Mother Gothel"
      },
      {
        "1": "Captain Hook",
        "2": "Horned King"
      },
      {
        "1": "Gaston",
        "2": "Lady Tremaine"
      },
      {
        "1": "Syndrome",
        "2": "Lotso"
      },
      {
        "1": "Madame Mim",
        "2": "Oogie Boogie"
      }
    ],
    [
      {
        "1": "Cruella",
        "2": "Oogie Boogie"
      },
      {
        "1": "Lotso",
        "2": "Madame Mim"
      },
      {
        "1": "Lady Tremaine",
        "2": "Syndrome"
      },
      {
        "1": "Horned King",
        "2": "Gaston"
      },
      {
        "1": "Mother Gothel",
        "2": "Captain Hook"
      },
      {
        "1": "Prince John",
        "2": "Queen of Hearts"
      },
      {
        "1": "Dr. Facilier",
        "2": "Ratigan"
      },
      {
        "1": "Jafar",
        "2": "Yzma"
      },
      {
        "1": "Maleficent",
        "2": "Ursula"
      },
      {
        "1": "Evil Queen",
        "2": "Pete"
      },
      {
        "1": "Hades",
        "2": "Scar"
      }
    ],
    [
      {
        "1": "Scar",
        "2": "Cruella"
      },
      {
        "1": "Pete",
        "2": "Hades"
      },
      {
        "1": "Ursula",
        "2": "Evil Queen"
      },
      {
        "1": "Yzma",
        "2": "Maleficent"
      },
      {
        "1": "Ratigan",
        "2": "Jafar"
      },
      {
        "1": "Queen of Hearts",
        "2": "Dr. Facilier"
      },
      {
        "1": "Captain Hook",
        "2": "Prince John"
      },
      {
        "1": "Gaston",
        "2": "Mother Gothel"
      },
      {
        "1": "Syndrome",
        "2": "Horned King"
      },
      {
        "1": "Madame Mim",
        "2": "Lady Tremaine"
      },
      {
        "1": "Oogie Boogie",
        "2": "Lotso"
      }
    ],
    [
      {
        "1": "Cruella",
        "2": "Lotso"
      },
      {
        "1": "Lady Tremaine",
        "2": "Oogie Boogie"
      },
      {
        "1": "Horned King",
        "2": "Madame Mim"
      },
      {
        "1": "Mother Gothel",
        "2": "Syndrome"
      },
      {
        "1": "Prince John",
        "2": "Gaston"
      },
      {
        "1": "Dr. Facilier",
        "2": "Captain Hook"
      },
      {
        "1": "Jafar",
        "2": "Queen of Hearts"
      },
      {
        "1": "Maleficent",
        "2": "Ratigan"
      },
      {
        "1": "Evil Queen",
        "2": "Yzma"
      },
      {
        "1": "Hades",
        "2": "Ursula"
      },
      {
        "1": "Scar",
        "2": "Pete"
      }
    ],
    [
      {
        "1": "Pete",
        "2": "Cruella"
      },
      {
        "1": "Ursula",
        "2": "Scar"
      },
      {
        "1": "Yzma",
        "2": "Hades"
      },
      {
        "1": "Ratigan",
        "2": "Evil Queen"
      },
      {
        "1": "Queen of Hearts",
        "2": "Maleficent"
      },
      {
        "1": "Captain Hook",
        "2": "Jafar"
      },
      {
        "1": "Gaston",
        "2": "Dr. Facilier"
      },
      {
        "1": "Syndrome",
        "2": "Prince John"
      },
      {
        "1": "Madame Mim",
        "2": "Mother Gothel"
      },
      {
        "1": "Oogie Boogie",
        "2": "Horned King"
      },
      {
        "1": "Lotso",
        "2": "Lady Tremaine"
      }
    ],
    [
      {
        "1": "Cruella",
        "2": "Lady Tremaine"
      },
      {
        "1": "Horned King",
        "2": "Lotso"
      },
      {
        "1": "Mother Gothel",
        "2": "Oogie Boogie"
      },
      {
        "1": "Prince John",
        "2": "Madame Mim"
      },
      {
        "1": "Dr. Facilier",
        "2": "Syndrome"
      },
      {
        "1": "Jafar",
        "2": "Gaston"
      },
      {
        "1": "Maleficent",
        "2": "Captain Hook"
      },
      {
        "1": "Evil Queen",
        "2": "Queen of Hearts"
      },
      {
        "1": "Hades",
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
        "1": "Ursula",
        "2": "Cruella"
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
        "2": "Hades"
      },
      {
        "1": "Captain Hook",
        "2": "Evil Queen"
      },
      {
        "1": "Gaston",
        "2": "Maleficent"
      },
      {
        "1": "Syndrome",
        "2": "Jafar"
      },
      {
        "1": "Madame Mim",
        "2": "Dr. Facilier"
      },
      {
        "1": "Oogie Boogie",
        "2": "Prince John"
      },
      {
        "1": "Lotso",
        "2": "Mother Gothel"
      },
      {
        "1": "Lady Tremaine",
        "2": "Horned King"
      }
    ],
    [
      {
        "1": "Cruella",
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
        "2": "Oogie Boogie"
      },
      {
        "1": "Jafar",
        "2": "Madame Mim"
      },
      {
        "1": "Maleficent",
        "2": "Syndrome"
      },
      {
        "1": "Evil Queen",
        "2": "Gaston"
      },
      {
        "1": "Hades",
        "2": "Captain Hook"
      },
      {
        "1": "Scar",
        "2": "Queen of Hearts"
      },
      {
        "1": "Pete",
        "2": "Ratigan"
      },
      {
        "1": "Ursula",
        "2": "Yzma"
      }
    ],
    [
      {
        "1": "Yzma",
        "2": "Cruella"
      },
      {
        "1": "Ratigan",
        "2": "Ursula"
      },
      {
        "1": "Queen of Hearts",
        "2": "Pete"
      },
      {
        "1": "Captain Hook",
        "2": "Scar"
      },
      {
        "1": "Gaston",
        "2": "Hades"
      },
      {
        "1": "Syndrome",
        "2": "Evil Queen"
      },
      {
        "1": "Madame Mim",
        "2": "Maleficent"
      },
      {
        "1": "Oogie Boogie",
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
        "1": "Cruella",
        "2": "Mother Gothel"
      },
      {
        "1": "Prince John",
        "2": "Horned King"
      },
      {
        "1": "Dr. Facilier",
        "2": "Lady Tremaine"
      },
      {
        "1": "Jafar",
        "2": "Lotso"
      },
      {
        "1": "Maleficent",
        "2": "Oogie Boogie"
      },
      {
        "1": "Evil Queen",
        "2": "Madame Mim"
      },
      {
        "1": "Hades",
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
        "1": "Ratigan",
        "2": "Cruella"
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
        "2": "Hades"
      },
      {
        "1": "Oogie Boogie",
        "2": "Evil Queen"
      },
      {
        "1": "Lotso",
        "2": "Maleficent"
      },
      {
        "1": "Lady Tremaine",
        "2": "Jafar"
      },
      {
        "1": "Horned King",
        "2": "Dr. Facilier"
      },
      {
        "1": "Mother Gothel",
        "2": "Prince John"
      }
    ],
    [
      {
        "1": "Cruella",
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
        "1": "Hades",
        "2": "Oogie Boogie"
      },
      {
        "1": "Scar",
        "2": "Madame Mim"
      },
      {
        "1": "Pete",
        "2": "Syndrome"
      },
      {
        "1": "Ursula",
        "2": "Gaston"
      },
      {
        "1": "Yzma",
        "2": "Captain Hook"
      },
      {
        "1": "Ratigan",
        "2": "Queen of Hearts"
      }
    ],
    [
      {
        "1": "Queen of Hearts",
        "2": "Cruella"
      },
      {
        "1": "Captain Hook",
        "2": "Ratigan"
      },
      {
        "1": "Gaston",
        "2": "Yzma"
      },
      {
        "1": "Syndrome",
        "2": "Ursula"
      },
      {
        "1": "Madame Mim",
        "2": "Pete"
      },
      {
        "1": "Oogie Boogie",
        "2": "Scar"
      },
      {
        "1": "Lotso",
        "2": "Hades"
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
        "1": "Cruella",
        "2": "Dr. Facilier"
      },
      {
        "1": "Jafar",
        "2": "Prince John"
      },
      {
        "1": "Maleficent",
        "2": "Mother Gothel"
      },
      {
        "1": "Evil Queen",
        "2": "Horned King"
      },
      {
        "1": "Hades",
        "2": "Lady Tremaine"
      },
      {
        "1": "Scar",
        "2": "Lotso"
      },
      {
        "1": "Pete",
        "2": "Oogie Boogie"
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
        "1": "Captain Hook",
        "2": "Cruella"
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
        "1": "Oogie Boogie",
        "2": "Ursula"
      },
      {
        "1": "Lotso",
        "2": "Pete"
      },
      {
        "1": "Lady Tremaine",
        "2": "Scar"
      },
      {
        "1": "Horned King",
        "2": "Hades"
      },
      {
        "1": "Mother Gothel",
        "2": "Evil Queen"
      },
      {
        "1": "Prince John",
        "2": "Maleficent"
      },
      {
        "1": "Dr. Facilier",
        "2": "Jafar"
      }
    ],
    [
      {
        "1": "Cruella",
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
        "1": "Hades",
        "2": "Mother Gothel"
      },
      {
        "1": "Scar",
        "2": "Horned King"
      },
      {
        "1": "Pete",
        "2": "Lady Tremaine"
      },
      {
        "1": "Ursula",
        "2": "Lotso"
      },
      {
        "1": "Yzma",
        "2": "Oogie Boogie"
      },
      {
        "1": "Ratigan",
        "2": "Madame Mim"
      },
      {
        "1": "Queen of Hearts",
        "2": "Syndrome"
      },
      {
        "1": "Captain Hook",
        "2": "Gaston"
      }
    ],
    [
      {
        "1": "Gaston",
        "2": "Cruella"
      },
      {
        "1": "Syndrome",
        "2": "Captain Hook"
      },
      {
        "1": "Madame Mim",
        "2": "Queen of Hearts"
      },
      {
        "1": "Oogie Boogie",
        "2": "Ratigan"
      },
      {
        "1": "Lotso",
        "2": "Yzma"
      },
      {
        "1": "Lady Tremaine",
        "2": "Ursula"
      },
      {
        "1": "Horned King",
        "2": "Pete"
      },
      {
        "1": "Mother Gothel",
        "2": "Scar"
      },
      {
        "1": "Prince John",
        "2": "Hades"
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
        "1": "Cruella",
        "2": "Maleficent"
      },
      {
        "1": "Evil Queen",
        "2": "Jafar"
      },
      {
        "1": "Hades",
        "2": "Dr. Facilier"
      },
      {
        "1": "Scar",
        "2": "Prince John"
      },
      {
        "1": "Pete",
        "2": "Mother Gothel"
      },
      {
        "1": "Ursula",
        "2": "Horned King"
      },
      {
        "1": "Yzma",
        "2": "Lady Tremaine"
      },
      {
        "1": "Ratigan",
        "2": "Lotso"
      },
      {
        "1": "Queen of Hearts",
        "2": "Oogie Boogie"
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
        "1": "Syndrome",
        "2": "Cruella"
      },
      {
        "1": "Madame Mim",
        "2": "Gaston"
      },
      {
        "1": "Oogie Boogie",
        "2": "Captain Hook"
      },
      {
        "1": "Lotso",
        "2": "Queen of Hearts"
      },
      {
        "1": "Lady Tremaine",
        "2": "Ratigan"
      },
      {
        "1": "Horned King",
        "2": "Yzma"
      },
      {
        "1": "Mother Gothel",
        "2": "Ursula"
      },
      {
        "1": "Prince John",
        "2": "Pete"
      },
      {
        "1": "Dr. Facilier",
        "2": "Scar"
      },
      {
        "1": "Jafar",
        "2": "Hades"
      },
      {
        "1": "Maleficent",
        "2": "Evil Queen"
      }
    ],
    [
      {
        "1": "Cruella",
        "2": "Evil Queen"
      },
      {
        "1": "Hades",
        "2": "Maleficent"
      },
      {
        "1": "Scar",
        "2": "Jafar"
      },
      {
        "1": "Pete",
        "2": "Dr. Facilier"
      },
      {
        "1": "Ursula",
        "2": "Prince John"
      },
      {
        "1": "Yzma",
        "2": "Mother Gothel"
      },
      {
        "1": "Ratigan",
        "2": "Horned King"
      },
      {
        "1": "Queen of Hearts",
        "2": "Lady Tremaine"
      },
      {
        "1": "Captain Hook",
        "2": "Lotso"
      },
      {
        "1": "Gaston",
        "2": "Oogie Boogie"
      },
      {
        "1": "Syndrome",
        "2": "Madame Mim"
      }
    ],
    [
      {
        "1": "Madame Mim",
        "2": "Cruella"
      },
      {
        "1": "Oogie Boogie",
        "2": "Syndrome"
      },
      {
        "1": "Lotso",
        "2": "Gaston"
      },
      {
        "1": "Lady Tremaine",
        "2": "Captain Hook"
      },
      {
        "1": "Horned King",
        "2": "Queen of Hearts"
      },
      {
        "1": "Mother Gothel",
        "2": "Ratigan"
      },
      {
        "1": "Prince John",
        "2": "Yzma"
      },
      {
        "1": "Dr. Facilier",
        "2": "Ursula"
      },
      {
        "1": "Jafar",
        "2": "Pete"
      },
      {
        "1": "Maleficent",
        "2": "Scar"
      },
      {
        "1": "Evil Queen",
        "2": "Hades"
      }
    ]
  ]
};
