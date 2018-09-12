import * as types from '../actions/types';

const initialState = {
  items: [],
  filtered: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_EVENTS:
    return {
      ...state,
      items: [...action.payload]
    };
  case types.NEW_EVENT:
    return {
      ...state,
      items: [...state.items, action.payload]
    };
  case types.UPDATE_EVENT:
    return {
      ...state,
      items: [
        ...state.items.filter(event => event.id !== action.payload.id),
        action.payload
      ]
    };
  case types.DELETE_EVENT:
    return {
      ...state,
      items: [...state.items.filter(event => event.id !== action.payload.id)]
    };
  case types.SEARCH_EVENTS:
    return {
      ...state,
      counter: action.payload.counter,
      filtered: action.payload.filtered
    };
  default:
    return state;
  }
}
