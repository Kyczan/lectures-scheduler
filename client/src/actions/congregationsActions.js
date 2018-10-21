import * as types from './types';
import axios from 'axios';

export const fetchCongregations = () => dispatch =>
  axios.get('api/congregations').then(res =>
    dispatch({
      type: types.FETCH_CONGREGATIONS,
      payload: res.data
    })
  );

export const newCongregation = congregation => dispatch =>
  axios.post('api/congregations', congregation).then(res =>
    dispatch({
      type: types.NEW_CONGREGATION,
      payload: res.data
    })
  );

export const updateCongregation = congregation => dispatch => {
  const body = { ...congregation };
  delete body.id;
  return axios.put(`api/congregations/${congregation.id}`, body).then(res =>
    dispatch({
      type: types.UPDATE_CONGREGATION,
      payload: res.data
    })
  );
};

export const deleteCongregation = congregationId => dispatch =>
  axios.delete(`api/congregations/${congregationId}`).then(res =>
    dispatch({
      type: types.DELETE_CONGREGATION,
      payload: res.data
    })
  );
