import {
  CLEAR_SUCCESS,
  CLEAR_ERRORS,
  TOGGLE_SIDEBAR
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


