import * as types from './types';

export const fetchLectures = () => async dispatch => {
  const rawRes = await fetch('api/lectures');
  const lectures = await rawRes.json();
  return dispatch({
    type: types.FETCH_LECTURES,
    payload: lectures
  });
};
