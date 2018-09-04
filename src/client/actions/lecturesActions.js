import * as types from './types';

export const fetchLectures = () => dispatch => {
  fetch('api/lectures')
    .then(res => res.json())
    .then(lectures =>
      dispatch({
        type: types.FETCH_LECTURES,
        payload: lectures
      })
    );
};
