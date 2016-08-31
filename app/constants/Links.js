const ROOT_URL = 'http://wappu.futurice.com';

const Terms = [
  {title: 'Competence academy', link: `https://docs.google.com/spreadsheets/d/1g4tuZ-FnlSWMFrd5VMH-Tp8_hngQRPmueXS-11_81_U/edit?usp=sharing`, icon: 'star'},
  {title: 'Useful info', link: `https://docs.google.com/document/d/1Y4NqEqv7Kdu5sUdu5mRBQAlKlRg8QRc8Wzs4kyuzCZI/edit`, icon: 'question-answer'},
  {title: 'Official timetable', link: `https://docs.google.com/spreadsheets/d/1J0dGKug2J2GVOnEPRBCqylopREHU6Jz_YVSUZvQbvls/edit#gid=0`, icon: 'event'},
  {title: 'Need a ride?',
    link: 'https://taxify.eu/',
    icon: 'directions-car'},
  {title: 'Terms of Service', link: `${ROOT_URL}/terms`, icon: 'info'},
  {title: 'Privacy', link: `${ROOT_URL}/privacy`, icon: 'lock'},
  {title: 'Licenses', link: `${ROOT_URL}/licenses`, icon: 'help'},
];

export default {
  terms: Terms,
};
