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
