const UPDATE_LOCATION = 'UPDATE_LOCATION';

const updateLocation = location => {
  return { type: UPDATE_LOCATION, payload: location }
};

export {
  UPDATE_LOCATION,
  updateLocation
}
