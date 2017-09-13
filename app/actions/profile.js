import Links from '../constants/Links';

const SET_LINK = 'SET_LINK';

const fetchLinks = () => {
  return (dispatch) => {
    dispatch({ type: SET_LINK, links: Links.links });
  }
};

export {
  SET_LINK,
  fetchLinks
};
