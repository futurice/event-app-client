import moment from 'moment';

const DAY_FORMAT = 'D.M.';
const TIME_FORMAT = 'HH:mm';

const TRESHOLD_FOR_STARTS_SOON = 120; // in minutes

function formatEventTime(startTime, endTime, opts) {
  opts = opts || {};

  let formatted = {
    date: '',
    time: '',
    onGoing: false,
    startsSoon: false
  };

  if (!startTime) {
    return formatted;
  }

  let startMoment = moment(startTime);
  let endMoment = moment(endTime);

  formatted.date = startMoment.format(DAY_FORMAT);
  formatted.time = startMoment.format(TIME_FORMAT);

  formatted.onGoing = eventIsOnGoing(startTime, endTime);
  formatted.startsSoon = eventStartsSoon(startTime)

  return formatted;
}

function eventIsOnGoing(startTime, endTime) {
  let now = moment();
  return moment(startTime).isBefore(now) && now.isBefore(moment(endTime));
}

function eventStartsSoon(startTime) {
  return moment().diff(moment(startTime), 'minutes') <= TRESHOLD_FOR_STARTS_SOON;
}



export default {
  formatEventTime,
  eventIsOnGoing
};
