import {
  CLEAR_SUCCESS,
  CLEAR_ERRORS,
  TOGGLE_SIDEBAR,
  OPEN_SLIDEDRAWER,
  CLOSE_SLIDEDRAWER
} from './types';

export const clearSuccess = () => (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const openSlideDrawer = () => (dispatch) => {
  dispatch({ type: OPEN_SLIDEDRAWER });
};

export const closeSlideDrawer = () => (dispatch) => {
  dispatch({ type: CLOSE_SLIDEDRAWER });
};


