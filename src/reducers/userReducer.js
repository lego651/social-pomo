import { CONSTANTS } from '../actions';

import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from '../actions/types';

const initialState = {
  authenticated: false,
  loading: false,
  profile: {}
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case CONSTANTS.LOG_IN:
      return {
        ...state,
        username: action.username
      };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        profile: action.payload.profile
      }
    default:
      return state;
  }
}

export default authReducer