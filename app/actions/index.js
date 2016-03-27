const REQUEST_ACTION_SUFFIXES = {
  REQUEST: '_REQUEST',
  SUCCESS: '_SUCCESS',
  FAILURE: '_FAILURE',
};

function createRequestActionTypes(baseAction) {
  const request = baseAction + REQUEST_ACTION_SUFFIXES.REQUEST;
  const success = baseAction + REQUEST_ACTION_SUFFIXES.SUCCESS;
  const failure = baseAction + REQUEST_ACTION_SUFFIXES.FAILURE;

  return {
    [request]: request,
    [success]: success,
    [failure]: failure
  };
}

export {
  createRequestActionTypes,
  REQUEST_ACTION_SUFFIXES
};
