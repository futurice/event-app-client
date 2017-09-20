import { fromJS } from 'immutable';

const defaultFloor = '1st';

// # Selectors
export const getSelectedFloor = state => state.floor.get('selectedFloor', defaultFloor);

// # Action types & creators
const SET_FLOOR = 'floor/SET_FLOOR';

export const setFloor = (floor) => ({ type: SET_FLOOR, payload: floor })


// # Reducer
const initialState = fromJS({
  selectedFloor: defaultFloor
});

export default function floor(state = initialState, action) {
  switch (action.type) {
    case SET_FLOOR: {
      return state.set('selectedFloor', action.payload);
    }

    default: {
      return state;
    }
  }
}
