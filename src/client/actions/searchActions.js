import * as types from './types';

export const searchData = search => dispatch => {
  const { searchArray, searchKeys, searchString } = search;
  if (searchString.length === 0) {
    return dispatch({
      type: types.SEARCH_DATA,
      payload: searchArray
    });
  }
  const filtered = searchArray.filter(obj => {
    let sum = 0;
    searchKeys.forEach(key => {
      if (
        obj[key] &&
        String(obj[key])
          .toLowerCase()
          .indexOf(searchString) > -1
      )
        sum++;
    });
    return sum ? true : false;
  });
  return dispatch({
    type: types.SEARCH_DATA,
    payload: filtered
  });
};
