import {
  CLEAR_SUCCESS,
  CLEAR_ERRORS,
} from './types';

export const clearSuccess = () => (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
