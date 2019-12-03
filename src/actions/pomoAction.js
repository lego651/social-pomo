import axios from 'axios';

// import {
//   SET_ERRORS
// } from './types';

export const createPomo = (newPomoObj) => (dispatch) => {
  // console.log('data in action is:', newPomoObj)
  axios
    .post('/pomo', newPomoObj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
}
