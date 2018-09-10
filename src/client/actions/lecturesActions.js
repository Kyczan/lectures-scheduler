import * as types from './types';
import axios from 'axios';

export const fetchLectures = () => dispatch =>
  axios.get('api/lectures').then(res =>
    dispatch({
      type: types.FETCH_LECTURES,
      payload: res.data
    })
  );

export const newLecture = lecture => dispatch =>
  axios.post('api/lectures', lecture).then(res =>
    dispatch({
      type: types.NEW_LECTURE,
      payload: res.data
    })
  );

export const updateLecture = lecture => dispatch => {
  const body = { ...lecture };
  delete body.id;
  return axios.put(`api/lectures/${lecture.id}`, body).then(res =>
    dispatch({
      type: types.UPDATE_LECTURE,
      payload: res.data
    })
  );
};

export const deleteLecture = lectureId => dispatch =>
  axios.delete(`api/lectures/${lectureId}`).then(res =>
    dispatch({
      type: types.DELETE_LECTURE,
      payload: res.data
    })
  );
