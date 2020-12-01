// import { CONSTANTS } from '../actions';

import {
  GET_POMOS,
  GET_WEEKLY_POMO,
  GET_MINUTES_TODAY,
  GET_MINUTES_WEEK,
  GET_MINUTES_ALL,
  GET_POMOS_TODAY,
} from '../actions/types';

const initialState = {
  pomos: [],
  weekly_pomo: [],
  minutes_today: 0,
  minutes_week: 0,
  minutes_all: 0,
  today: null,
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
    case GET_MINUTES_WEEK:
      return {
        ...state,
        minutes_week: action.payload
      };
    case GET_MINUTES_ALL:
      return {
        ...state,
        minutes_all: action.payload
      };
    case GET_POMOS_TODAY:
      return {
        ...state,
        today: action.payload
      }
    default:
      return state;
  }
}

export default pomoReducer
