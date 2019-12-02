import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SUCCESS,
  CLEAR_SUCCESS,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_MESSAGE,
  STOP_LOADING_MESSAGE,
} from '../actions/types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  loadingMessage: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case SET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        success: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    case LOADING_MESSAGE:
      return {
        ...state,
        loadingMessage: true
      };
    case STOP_LOADING_MESSAGE:
      return {
        ...state,
        loadingMessage: false
      };
    default:
      return state;
  }
}
