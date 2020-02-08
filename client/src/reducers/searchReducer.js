import * as types from '../actions/types';

const initialState = {
  filtered: [],
  sorted: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_DATA:
      return {
        ...state,
        filtered: action.payload
      };
    case types.SORT_DATA:
      return {
        ...state,
        sorted: action.payload
      };
    default:
      return state;
  }
}
