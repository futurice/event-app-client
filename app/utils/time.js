import moment from 'moment';

const FORMATS = {
  default:  { day: 'D.M.',         time: 'HH:mm' },
  short:    { day: 'ddd D.M.',     time: 'HH:mm' },
  long:     { day: 'dddd D.M.',    time: 'HH:mm' }
}
const TRESHOLD_FOR_STARTS_SOON = 120; // in minutes
const TRESHOLD_FOR_EVENT_ENDING = 4; // in hours, bars might be open 4 hours after ending time

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

function getEventDay(startTime) {
  return moment(startTime).format(FORMATS.short.day)
}


function isEventInFuture(endTime) {
  return moment(endTime).isBefore(moment().add(TRESHOLD_FOR_EVENT_ENDING, 'hours'));
}

function eventsBetweenHours(endTime1, endTime2, hours) {
  const diffInHours = moment(endTime1).diff(moment(endTime2), 'hours');
  return diffInHours <= hours && diffInHours >= -TRESHOLD_FOR_EVENT_ENDING;
}

function getTimeStamp(time) {
  return moment(time).toDate().getTime();
}

function getTimeAgo(date) {
  if (!date) {
    return '';
  }

  const pastMoment = moment(date);
  const minutesInPast = moment().diff(pastMoment, 'minutes');

  if (minutesInPast <= 4) {
    return 'now';
  } else if (minutesInPast < 60) {
    return Math.round(minutesInPast) + 'm';
  } else if (minutesInPast / 60 < 24) {
    return Math.round(minutesInPast / 60) + 'h';
  } else {
    return Math.round(minutesInPast / 60 / 24) + 'd';
  }
}

export default {
  formatEventTime,
  eventIsOnGoing,
  getEventDay,
  isEventInFuture,
  getTimeStamp,
  eventsBetweenHours,
  getTimeAgo
};
