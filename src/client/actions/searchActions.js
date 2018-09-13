import * as types from './types';

export const searchData = search => dispatch => {
  const { searchArray, searchKeys, searchString } = search;
  const toSearch = String(searchString).toLowerCase().trim();
  if (toSearch.length === 0) {
    return dispatch({
      type: types.SEARCH_DATA,
      payload: searchArray
    });
  }
  const filtered = searchArray.filter(obj => {
    for (let i = 0; i < searchKeys.length; i++) {
      if (
        obj[searchKeys[i]] &&
        String(obj[searchKeys[i]])
          .toLowerCase()
          .indexOf(toSearch) > -1
      )
        return true;
    }
    return false;
  });
  return dispatch({
    type: types.SEARCH_DATA,
    payload: filtered
  });
};
