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

function getEventDay(startTime){
  return moment(startTime).format(FORMATS.long.day)
}

function getTimeAgo(date){
    if (!date) {
      return '';
    }

    const diff = (new Date().getTime() - new Date(date).getTime()) / 60000; // minutes

    if (diff <= 0) {
      return 'now';
    } else if (diff < 60) {
      return Math.round(diff) + 'm';
    } else if(diff < 60 * 24) {
      return Math.round(diff/60) + 'h';
    } else {
      return Math.round(diff / 60 / 24) + 'd';
    }
}

export default {
  formatEventTime,
  eventIsOnGoing,
  getEventDay,
  getTimeAgo
};
