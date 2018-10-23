import * as types from './types';
import axios from 'axios';

export const fetchSpeakers = () => dispatch =>
  axios.get('api/speakers').then(speakers =>
    dispatch({
      type: types.FETCH_SPEAKERS,
      payload: speakers.data
    })
  );

export const newSpeaker = speaker => dispatch =>
  axios.post('api/speakers', speaker).then(res =>
    dispatch({
      type: types.NEW_SPEAKER,
      payload: res.data
    })
  );

export const updateSpeaker = speaker => dispatch => {
  const body = { ...speaker };
  delete body.id;
  return axios.put(`api/speakers/${speaker.id}`, body).then(res =>
    dispatch({
      type: types.UPDATE_SPEAKER,
      payload: res.data
    })
  );
};

export const deleteSpeaker = speakerId => dispatch =>
  axios.delete(`api/speakers/${speakerId}`).then(res =>
    dispatch({
      type: types.DELETE_SPEAKER,
      payload: res.data
    })
  );
