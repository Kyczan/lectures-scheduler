import * as types from './types';

export const fetchPrepared = (speakerId) => async dispatch => {
  const rawRes = await fetch(`api/speakers/${speakerId}/prepared`);
  const prepared = await rawRes.json();
  return dispatch({
    type: types.FETCH_PREPARED,
    payload: prepared
  });
};

export const newPrepared = (speakerId, prepared) => async dispatch => {
  const rawRes = await fetch(`api/speakers/${speakerId}/prepared`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prepared)
  });
  const retPrepared = await rawRes.json();
  return dispatch({
    type: types.NEW_PREPARED,
    payload: retPrepared
  });
};

export const deletePrepared = (speakerId, preparedId) => async dispatch => {
  const rawRes = await fetch(`api/speakers/${speakerId}/prepared/${preparedId}`, {
    method: 'delete'
  });
  const prepared = await rawRes.json();
  return dispatch({
    type: types.DELETE_PREPARED,
    payload: prepared
  });
};
