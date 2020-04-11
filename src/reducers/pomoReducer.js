// import { CONSTANTS } from '../actions';

import {
  GET_POMOS,
  GET_WEEKLY_POMO
} from '../actions/types';

const initialState = {
  pomos: [],
  weekly_pomo: [],
}

const pomoReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_POMOS:
      return {
        ...state,
        pomos: action.payload
      };
    case GET_WEEKLY_POMO:
      return {
        ...state,
        weekly_pomo: action.payload
      };
    default:
      return state;
  }
}

export default pomoReducer
