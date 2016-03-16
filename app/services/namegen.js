const TEAMS = {
  "_default": ["Hämmentävä", "Ylväs"],
  "autek": ["Automaattinen"],
  "bioner": ["Biologinen", "Luomu"],
  "hiukkanen": ["Hiukkasteleva"],
  "indecs": ["Indeksoitu"],
  "kork": ["Koneellinen"],
  "man@ger": ["Johtava"],
  "mik": ["Materiaalinen"],
  "skilta": ["Sähköinen", "Elektroninen"],
  "tamark": ["Arkkitehtoninen"],
  "taraki": ["Rakentava"],
  "tite": ["Binäärinen"],
  "yki": ["Ympäröivä"]
};

const FIRST_NAMES = [
  "Leksa", "Jönssi", "Pirkko", "Lissu", "Hessu", "Jallu", "Eevertti", "Kaaleppi", "Tenho", "Juuso"
];

const EPITHETS = [
  "Nörtti", "Ruuti", "Saha", "Kirves", "Keihäs", "Jallu", "Viski", "Leka", "Puukko", "Näyttöpääte", "Touhu", "Peuhu", "Pauhu", "Kauhu", "Paini", "Mekastus", "Mökellys", "Kökeltäjä", "Örveltäjä", "Luomu"
];

const generateName = (team) => {
  let teamIdx = team.toLowerCase();
  if (!TEAMS[teamIdx]) {
    teamIdx = "_default";
  }

  const getRandomFrom = (arr) => {
    let randomizedIndex = Math.round(Math.random() * (arr.length - 1));
    return arr[randomizedIndex];
  }

  return getRandomFrom(TEAMS[teamIdx]) + " " +
    getRandomFrom(EPITHETS) + "-" +
    getRandomFrom(FIRST_NAMES);
}

export default {
  generateName
};

if (!module.parent) {
  console.log(generateName("tite"));
}
