import * as types from './types';

export const fetchSpeakers = () => async dispatch => {
  const rawRes = await fetch('api/speakers');
  const speakers = await rawRes.json();
  return dispatch({
    type: types.FETCH_SPEAKERS,
    payload: speakers
  });
};

export const newSpeaker = speaker => async dispatch => {
  const rawRes = await fetch('api/speakers', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(speaker)
  });
  const retSpeaker = await rawRes.json();
  return dispatch({
    type: types.NEW_SPEAKER,
    payload: retSpeaker
  });
};

export const updateSpeaker = speaker => async dispatch => {
  const body = { ...speaker };
  delete body.id;
  const rawRes = await fetch(`api/speakers/${speaker.id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const retSpeaker = await rawRes.json();
  return dispatch({
    type: types.UPDATE_SPEAKER,
    payload: retSpeaker
  });
};

export const deleteSpeaker = speakerId => async dispatch => {
  const rawRes = await fetch(`api/speakers/${speakerId}`, {
    method: 'delete'
  });
  const speaker = await rawRes.json();
  return dispatch({
    type: types.DELETE_SPEAKER,
    payload: speaker
  });
};
