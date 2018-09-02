import * as types from './types';

export const fetchEvents = () => dispatch => {
  fetch('api/events')
    .then(res => res.json())
    .then(events =>
      dispatch({
        type: types.FETCH_EVENTS,
        payload: events
      })
    );
};

export const deleteEvent = eventId => dispatch => {
  fetch(`api/events/${eventId}`, {
    method: 'delete'
  })
    .then(res => res.json())
    .then(event =>
      dispatch({
        type: types.DELETE_EVENT,
        payload: event
      })
    );
};
