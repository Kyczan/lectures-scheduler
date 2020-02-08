import * as types from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CONGREGATIONS:
      return {
        ...state,
        items: [...action.payload]
      };
    case types.NEW_CONGREGATION:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case types.UPDATE_CONGREGATION:
      return {
        ...state,
        items: [
          ...state.items.filter(
            congregation => congregation.id !== action.payload.id
          ),
          action.payload
        ]
      };
    case types.DELETE_CONGREGATION:
      return {
        ...state,
        items: [
          ...state.items.filter(
            congregation => congregation.id !== action.payload.id
          )
        ]
      };
    default:
      return state;
  }
}
