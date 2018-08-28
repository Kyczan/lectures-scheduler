import {
  FETCH_EVENTS,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function( state = initialState, action ) {
  switch (action.type) {
  case FETCH_EVENTS:
    return {
      ...state,
      items: action.payload
    };
  default:
    return state;
  }
}