const ROOT_URL = 'http://www.ttyy.fi/ttyy/sites/webhotel2.tut.fi.ttyy/files/sisalto/alayhdistykset/logot/';
const kiltaLogos = {
  'TiTe':'tite.png',
  'Skilta':'skilta.png',
  'Autek':'autek.png',
  'Bioner':'bioner.png',
  'Hiukkanen':'hiukkanen.png',
  'Indecs':'indecs.png',
  'KoRK':'kork.png',
  'Man@ger':'manager.png',
  'Materiaali-insinöörikilta':'mik.png',
  'TamArk':'tamark.png',
  'TARAKI':'taraki.png',
  'YKI':'yki.png',
};
Object.keys(kiltaLogos).forEach(item => {
  kiltaLogos[item] = ROOT_URL + kiltaLogos[item];
});

export default {
  killat: kiltaLogos,
};
