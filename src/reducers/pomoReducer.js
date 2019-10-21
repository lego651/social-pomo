import { CONSTANTS } from '../actions';

import {
  GET_POMOS,
} from '../actions/types';

const initialState = {
  pomos: []
}

const pomoReducer = (state=initialState, action) => {
  switch(action.type) {
    case CONSTANTS.GET_POMOS:
      return {
        ...state,
        pomos: action.payload
      };
    default:
      return state;
  }
}

export default pomoReducer
