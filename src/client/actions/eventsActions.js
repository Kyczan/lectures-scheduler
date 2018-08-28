import {
  FETCH_EVENTS,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from './types';

export const fetchEvents = () => dispatch => {
  fetch('api/events')
    .then(res => res.json())
    .then(events => dispatch({
      type: FETCH_EVENTS,
      payload: events
    }));
};
