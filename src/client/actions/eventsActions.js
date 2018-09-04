import * as types from './types';

export const fetchEvents = () => async dispatch => {
  const rawRes = await fetch('api/events');
  const events = await rawRes.json();
  return dispatch({
    type: types.FETCH_EVENTS,
    payload: events
  });
};

export const newEvent = event => async dispatch => {
  const rawRes = await fetch('api/events', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });
  const retEvent = await rawRes.json();
  return dispatch({
    type: types.NEW_EVENT,
    payload: retEvent
  });
};

export const updateEvent = event => async dispatch => {
  const rawRes = await fetch(`api/events/${event.id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });
  const retEvent = await rawRes.json();
  return dispatch({
    type: types.UPDATE_EVENT,
    payload: retEvent
  });
};

export const deleteEvent = eventId => async dispatch => {
  const rawRes = await fetch(`api/events/${eventId}`, {
    method: 'delete'
  });
  const event = await rawRes.json();
  return dispatch({
    type: types.DELETE_EVENT,
    payload: event
  });
};
