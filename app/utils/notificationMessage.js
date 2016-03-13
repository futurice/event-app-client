import ActionTypes from '../constants/ActionTypes';

const getMessage = (payload) => {
  switch (payload.type) {
    case ActionTypes.IMAGE: {
      return 'Success! Image sent.';
    }
    case ActionTypes.BEER: {
      return 'Success! Beer sent.';
    }
    case ActionTypes.CIDER: {
      return 'Success! Cider sent.';
    }
    case ActionTypes.LONKKU: {
      return 'Success! Lonkku sent.';
    }
    case ActionTypes.JALLU: {
      return 'Success! Jallu sent.';
    }
    case ActionTypes.PUSH_THE_BUTTON: {
      return 'Success! Button push sent.';
    }
    case ActionTypes.TEXT: {
      return 'Success! Text sent.';
    }
  }
};

const getErrorMessage = (payload) => {
  switch (payload.type) {
    case ActionTypes.IMAGE: {
      return 'Error sending image!';
    }
    case ActionTypes.BEER: {
      return 'Error sending beer!';
    }
    case ActionTypes.CIDER: {
      return 'Error sending cider!';
    }
    case ActionTypes.LONKKU: {
      return 'Error sending lonkku!';
    }
    case ActionTypes.JALLU: {
      return 'Error sending jallu!';
    }
    case ActionTypes.PUSH_THE_BUTTON: {
      return 'Error sending button push!';
    }
    case ActionTypes.TEXT: {
      return 'Error sending text!';
    }
  }
};

export {
  getMessage,
  getErrorMessage
};
