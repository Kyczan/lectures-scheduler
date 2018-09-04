import * as types from './types';

export const fetchSpeakers = () => async dispatch => {
  const rawRes = await fetch('api/speakers');
  const speakers = await rawRes.json();
  return dispatch({
    type: types.FETCH_SPEAKERS,
    payload: speakers
  });
};
