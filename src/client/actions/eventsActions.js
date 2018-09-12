import * as types from './types';
import axios from 'axios';

export const fetchEvents = () => dispatch =>
  axios.get('api/events').then(events =>
    dispatch({
      type: types.FETCH_EVENTS,
      payload: events.data
    })
  );

export const newEvent = event => dispatch =>
  axios.post('api/events', event).then(res =>
    dispatch({
      type: types.NEW_EVENT,
      payload: res.data
    })
  );

export const updateEvent = event => dispatch => {
  const body = { ...event };
  delete body.id;
  return axios.put(`api/events/${event.id}`, body).then(res =>
    dispatch({
      type: types.UPDATE_EVENT,
      payload: res.data
    })
  );
};

export const deleteEvent = eventId => dispatch =>
  axios.delete(`api/events/${eventId}`).then(res =>
    dispatch({
      type: types.DELETE_EVENT,
      payload: res.data
    })
  );

export const searchEvents = searchData => dispatch => {
  const { searchArray, searchKeys, searchString } = searchData;
  if (searchString.length === 0) {
    return dispatch({
      type: types.SEARCH_EVENTS,
      payload: searchArray
    });
  }
  const filtered = searchArray.filter(obj => {
    let sum = 0;
    searchKeys.forEach(key => {
      if (obj[key] && obj[key].toLowerCase().indexOf(searchString) > -1) sum++;
    });
    return sum ? true : false;
  });
  return dispatch({
    type: types.SEARCH_EVENTS,
    payload: filtered
  });
};
