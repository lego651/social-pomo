// import { CONSTANTS } from '../actions';

import {
  GET_POMOS,
  GET_WEEKLY_POMO,
  GET_MINUTES_TODAY,
} from '../actions/types';

const initialState = {
  pomos: [],
  weekly_pomo: [],
  minutes_today: 0,
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
    case GET_MINUTES_TODAY:
      return {
        ...state,
        minutes_today: action.payload
      };
    default:
      return state;
  }
}

export default pomoReducer
