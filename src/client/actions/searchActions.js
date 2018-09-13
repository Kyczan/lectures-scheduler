import * as types from './types';

export const searchData = search => dispatch => {
  const { searchArray, searchKeys, searchString } = search;
  const toSearch = String(searchString)
    .toLowerCase()
    .trim();
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

export const sortData = sort => dispatch => {
  const { sortArray, sortKey, direction } = sort;
  const asc = direction === 'asc' ? 1 : -1;
  sortArray.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -asc;
    if (a[sortKey] > b[sortKey]) return asc;
    return 0;
  });
  return dispatch({
    type: types.SORT_DATA,
    payload: sortArray
  });
};
