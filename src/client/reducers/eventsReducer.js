import * as types from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_EVENTS:
    return {
      ...state,
      items: action.payload
    };
  default:
    return state;
  }
}
