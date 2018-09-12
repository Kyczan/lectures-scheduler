import * as types from '../actions/types';

const initialState = {
  filtered: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.SEARCH_EVENTS:
    return {
      ...state,
      filtered: action.payload.filtered
    };
  default:
    return state;
  }
}
