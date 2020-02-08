import * as types from '../actions/types';

const initialState = {
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SETTING:
      return {
        ...state,
        item: { ...action.payload }
      };
    default:
      return state;
  }
}
