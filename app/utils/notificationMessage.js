import ActionTypes from '../constants/ActionTypes';

const getMessage = (payload) => {
  switch (payload.type) {
    case ActionTypes.IMAGE: {
      return 'Great shot!';
    }
    case ActionTypes.BEER: {
      return 'One beer down!';
    }
    case ActionTypes.CIDER: {
      return 'Tasty cider!';
    }
    case ActionTypes.SODA: {
      return 'Pop that soda!';
    }
    case ActionTypes.BUTTON_PUSH: {
      return 'Way to push that button!';
    }
    case ActionTypes.TEXT: {
      return 'That\'s cool!';
    }
  }
};

const getErrorMessage = (payload) => {
  return 'Oh no, an error occurred! :-(';
};

export {
  getMessage,
  getErrorMessage
};
