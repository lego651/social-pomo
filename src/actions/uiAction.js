import axios from 'axios';
import {
  CLEAR_SUCCESS,
} from './types';

export const clearSuccess = () => (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS });
};
