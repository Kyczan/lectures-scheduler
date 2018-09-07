import * as types from './types';

export const fetchCongregations = () => async dispatch => {
  const rawRes = await fetch('api/congregations');
  const congregations = await rawRes.json();
  return dispatch({
    type: types.FETCH_CONGREGATIONS,
    payload: congregations
  });
};

export const newCongregation = congregation => async dispatch => {
  const rawRes = await fetch('api/congregations', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(congregation)
  });
  const retCongregation = await rawRes.json();
  return dispatch({
    type: types.NEW_CONGREGATION,
    payload: retCongregation
  });
};

export const updateCongregation = congregation => async dispatch => {
  const body = { ...congregation };
  delete body.id;
  const rawRes = await fetch(`api/congregations/${congregation.id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const retCongregation = await rawRes.json();
  return dispatch({
    type: types.UPDATE_CONGREGATION,
    payload: retCongregation
  });
};

export const deleteCongregation = congregationId => async dispatch => {
  const rawRes = await fetch(`api/congregations/${congregationId}`, {
    method: 'delete'
  });
  const congregation = await rawRes.json();
  return dispatch({
    type: types.DELETE_CONGREGATION,
    payload: congregation
  });
};
