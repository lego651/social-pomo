import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SUCCESS,
  CLEAR_SUCCESS,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_MESSAGE,
  STOP_LOADING_MESSAGE,
  GETTING,
  STOP_GETTING,
  POSTING,
  STOP_POSTING,
  TOGGLE_SIDEBAR,
  OPEN_SLIDEDRAWER,
  CLOSE_SLIDEDRAWER
} from '../actions/types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  loadingMessage: false,
  getting: false,
  posting: false, 
  showSidebar: false,
  showSlideDrawer: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        getting: false,
        posting: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        getting: false,
        posting: false,
        errors: null
      };
    case SET_SUCCESS:
      return {
        ...state,
        loading: false,
        getting: false,
        posting: false,
        success: action.payload
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        getting: false,
        posting: false,
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
    case GETTING:
      return {
        ...state,
        getting: true
      };
    case STOP_GETTING:
      return {
        ...state,
        getting: false
      };
    case POSTING:
      return {
        ...state,
        posting: true
      };
    case STOP_POSTING:
      return {
        ...state,
        posting: false
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar
      };
    case OPEN_SLIDEDRAWER:
      return {
        ...state,
        showSlideDrawer: true
      };
    case CLOSE_SLIDEDRAWER:
      return {
        ...state,
        showSlideDrawer: false
      };
    default:
      return state;
  }
}
