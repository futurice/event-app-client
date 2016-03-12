import moment from 'moment';

const FORMATS = {
  default:  { day: 'D.M.',        time: 'HH:mm' },
  long:     { day: 'dddd D.M.',    time: 'HH:mm' }
}
const TRESHOLD_FOR_STARTS_SOON = 120; // in minutes

// opts.formatLong==true -> returns time and date in a longer format
function formatEventTime(startTime, endTime, opts) {
  opts = opts || {};

  let formatted = {
    date: '',
    time: '',
    endTime: '',
    onGoing: false,
    startsSoon: false
  };

  if (!startTime) {
    return formatted;
  }

  let startMoment = moment(startTime);
  let endMoment = moment(endTime);

  let usedFormat = opts.formatLong ? FORMATS.long : FORMATS.default;
  formatted.date = startMoment.format(usedFormat.day);
  formatted.time = startMoment.format(usedFormat.time);
  formatted.endTime = endMoment.format(usedFormat.time);

  formatted.onGoing = eventIsOnGoing(startTime, endTime);
  formatted.startsSoon = eventStartsSoon(startTime)

  return formatted;
}

function eventIsOnGoing(startTime, endTime) {
  let now = moment();
  return moment(startTime).isBefore(now) && now.isBefore(moment(endTime));
}

function eventStartsSoon(startTime) {
  return moment(startTime).diff(moment(), 'minutes') <= TRESHOLD_FOR_STARTS_SOON;
}



export default {
  formatEventTime,
  eventIsOnGoing
};
