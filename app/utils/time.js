import moment from 'moment';

const BASIC_FORMAT = 'DD.MM HH:mm';


function format(time) {
  if (!time) {
    return '';
  } else {
    return moment(time).format(BASIC_FORMAT);
  }
}

export default {
  format
};
