import * as types from './types';

export const fetchLectures = () => async dispatch => {
  const rawRes = await fetch('api/lectures');
  const lectures = await rawRes.json();
  return dispatch({
    type: types.FETCH_LECTURES,
    payload: lectures
  });
};

export const newLecture = lecture => async dispatch => {
  const rawRes = await fetch('api/lectures', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lecture)
  });
  const retLecture = await rawRes.json();
  return dispatch({
    type: types.NEW_LECTURE,
    payload: retLecture
  });
};

export const updateLecture = lecture => async dispatch => {
  const body = { ...lecture };
  delete body.id;
  const rawRes = await fetch(`api/lectures/${lecture.id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const retLecture = await rawRes.json();
  return dispatch({
    type: types.UPDATE_LECTURE,
    payload: retLecture
  });
};

export const deleteLecture = lectureId => async dispatch => {
  const rawRes = await fetch(`api/lectures/${lectureId}`, {
    method: 'delete'
  });
  const lecture = await rawRes.json();
  return dispatch({
    type: types.DELETE_LECTURE,
    payload: lecture
  });
};
