'use strict';

import ActionTypes from '../constants/ActionTypes';
import api from '../services/api';

const EVENT_SET = 'EVENT_SET';


const fetchEvents = () => {
  return (dispatch) => {
    api.fetchModels('events').then(items => {
      dispatch({
        type: EVENT_SET,
        events: items
      });
    });
  }
};

export {
  EVENT_SET,
  fetchEvents
};
