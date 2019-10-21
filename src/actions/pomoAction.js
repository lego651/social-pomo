import axios from 'axios';

import {
  SET_ERRORS
} from './types';


export const createPomo = (newPomo) => (dispatch) => {
  console.log('data in action is:', newPomo)
  axios
    .post('/pomo', newPomo)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
}
