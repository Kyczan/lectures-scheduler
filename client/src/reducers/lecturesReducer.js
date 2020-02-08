import * as types from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LECTURES:
      return {
        ...state,
        items: [...action.payload]
      };
    case types.NEW_LECTURE:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case types.UPDATE_LECTURE:
      return {
        ...state,
        items: [
          ...state.items.filter(lecture => lecture.id !== action.payload.id),
          action.payload
        ]
      };
    case types.DELETE_LECTURE:
      return {
        ...state,
        items: [
          ...state.items.filter(lecture => lecture.id !== action.payload.id)
        ]
      };
    default:
      return state;
  }
}
