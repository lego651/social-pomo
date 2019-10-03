import { CONSTANTS } from '../actions';

const initialState = {
  messages: []
}

const roomReducer = (state=initialState, action) => {
  switch(action.type) {
    case CONSTANTS.GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}

export default roomReducer
