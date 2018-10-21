import * as types from './types';
import axios from 'axios';

export const fetchPrepared = speakerId => dispatch =>
  axios.get(`api/speakers/${speakerId}/prepared`).then(res =>
    dispatch({
      type: types.FETCH_PREPARED,
      payload: res.data
    })
  );

export const newPrepared = (speakerId, prepared) => dispatch =>
  axios.post(`api/speakers/${speakerId}/prepared`, prepared).then(res =>
    dispatch({
      type: types.NEW_PREPARED,
      payload: res.data
    })
  );

export const deletePrepared = (speakerId, preparedId) => dispatch =>
  axios.delete(`api/speakers/${speakerId}/prepared/${preparedId}`).then(res =>
    dispatch({
      type: types.DELETE_PREPARED,
      payload: res.data
    })
  );
