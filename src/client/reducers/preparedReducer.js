import * as types from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_PREPARED:
    return {
      ...state,
      items: [...action.payload]
    };
  case types.NEW_PREPARED:
    return {
      ...state,
      items: [...state.items, action.payload]
    };
  case types.DELETE_PREPARED:
    return {
      ...state,
      items: [...state.items.filter(prepared => prepared.id !== action.payload.id)]
    };
  default:
    return state;
  }
}
