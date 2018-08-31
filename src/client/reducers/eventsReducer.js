import * as types from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_EVENTS:
    return {
      ...state,
      items: [...action.payload]
    };
  case types.DELETE_EVENT:
    return {
      ...state,
      items: [...state.items.filter(event => event.id !== action.payload.id)]
    };
  default:
    return state;
  }
}
