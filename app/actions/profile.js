'use strict';

import Links from '../constants/Links';

const LINK_SET = 'LINK_SET';

const fetchLinks = () => {
  return (dispatch) => {
    dispatch({ type: LINK_SET, links: Links.terms });
  }
};

export {
  LINK_SET,
  fetchLinks
};
