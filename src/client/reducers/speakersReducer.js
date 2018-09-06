import * as types from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_SPEAKERS:
    return {
      ...state,
      items: [...action.payload]
    };
  case types.NEW_SPEAKER:
    return {
      ...state,
      items: [...state.items, action.payload]
    };
  case types.UPDATE_SPEAKER:
    return {
      ...state,
      items: [
        ...state.items.filter(speaker => speaker.id !== action.payload.id),
        action.payload
      ]
    };
  case types.DELETE_SPEAKER:
    return {
      ...state,
      items: [...state.items.filter(speaker => speaker.id !== action.payload.id)]
    };
  default:
    return state;
  }
}
