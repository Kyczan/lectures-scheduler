import * as types from './types';

export const fetchSpeakers = () => dispatch => {
  fetch('api/speakers')
    .then(res => res.json())
    .then(speakers =>
      dispatch({
        type: types.FETCH_SPEAKERS,
        payload: speakers
      })
    );
};
