import { CONSTANTS } from '../actions';

const initialState = {
  username: null
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case CONSTANTS.LOG_IN:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
}

export default authReducer
