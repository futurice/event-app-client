const TEAMS = {
  "_default": ["Hämmentävä", "Ylväs", "Kaikkivoipa", "Humanistinen", "Kelvollinen", "Erehtymätön", "Akateeminen"],
  "autek": ["Automaattinen", "Automatisoitu", "Autonominen", "Keltainen"],
  "bioner": ["Biologinen", "Luomu", "Alkuvoimainen", "Beige"],
  "hiukkanen": ["Hiukkasteleva", "Tekninen", "Matemaattinen", "Violetti"],
  "indecs": ["Indeksoitu", "Taloudellinen", "Optimaalinen", "Valkotakkinen"],
  "kork": ["Koneellinen", "Koneistettu", "Korkkaileva", "Punalahkeinen"],
  "man@ger": ["Johtava", "Mikromanageroiva", "Pörssinoteerattu", "Graniitinharmaa"],
  "mik": ["Materiaalinen", "Pintanahkainen", "Jalopuinen", "Kuminen", "Viininpunainen"],
  "skilta": ["Sähköinen", "Elektroninen", "Korkeajännitteinen", "Maadoitettu", "Sähkönsininen"],
  "tamark": ["Arkkitehtoninen", "Suurpiirteinen", "Pimeä", "Tummanpuhuva"],
  "taraki": ["Rakentava", "Kestopuinen", "Keltakypäräinen", "Rakentava", "Tummansininen"],
  "tite": ["Binäärinen", "Tietotekninen", "Koodintuoksuinen", "Tummasieluinen", "Yönmusta"],
  "yki": ["Ympäristöystävällinen", "Ympäröivä", "Metsämansikkainen", "Skutsinvihreä"]
};

const FIRST_NAMES = [
  "Leksa", "Jönssi", "Pirkko", "Lissu", "Hessu", "Jallu", "Eevertti", "Kaaleppi", "Tenho", "Juuso", "Jorma", "Jorma-Liisa", "Tiuhti", "Viuhti", "Nipsu", "Kyösti", "Kyöstikki", "Kuuno", "Tyyne", "Frida", "Masa", "Mirkku", "Jean-Pierre", "Ihkuli", "Kustaa", "Kukkuluuru", "Mymmeli", "Nuppu", "Kikka", "Gandalf", "Uolevi", "Kirka", "Orvokki", "Maikku", "Aune", "Aadolf", "Loordi", "Juuli", "Ahti", "Lempi", "Turso", "Marjatta"
];

const EPITHETS = [
  "Nörtti", "Ruuti", "Saha", "Kirves", "Keihäs", "Jallu", "Viski", "Leka", "Puukko", "Näyttöpääte", "Touhu", "Karaoke", "Rymy", "Peuhu", "Pauhu", "Kauhu", "Paini", "Mekastus", "Mökellys", "Kökeltäjä", "Örveltäjä", "Luomu",  "Liivate", "Porakone", "Robotti", "Näköis", "Kukka", "Kökkö", "Kakkosnelos", "Raparperi", "Kehveli", "Räppi", "BB", "Koeputki", "Kannuttelu", "Ruukku", "Skutsi", "Bönde", "Pölhö", "Nöpönenä", "Pissa", "Vehje", "Tööttä", "Krumeluuri", "Peikko", "Velho", "Loitsu", "Haltia", "Autotalli", "Kellari", "Varasto", "Jemma", "Bussi", "Juna", "Toimisto", "Nurmikko", "Reikä", "Rykäys", "Mämmi", "Kilju", "Kojootti", "Kiire", "Cthulhu", "Pipetti", "Tehdas", "Hillo", "Hyntty", "Mähmä", "Siirtomaa", "Traktori", "Otsatukka", "Takatukka", "Nahka", "Jalopuu", "Burrito", "Puuro", "Bönthö", "Myytti"
];

const generateName = (team = "") => {
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
  console.log(generateName(process.argv[2]));
}
