import axios from 'axios';

import {
  START_MATCHING,
  SET_ERRORS,
} from './types';

// add user to waiting queue, and update redux profile.matching to true
export const startMatching = () => (dispatch) => {
  axios
    .get('/match')
    .then((res) => {
      console.log(res);
      dispatch({
        type: START_MATCHING
      })
    })
    .catch((err) => {
      console.error(err);
    })
}

export const joinMatchedRoom = (roomName, history) => (dispatch) => {
  axios
    .post('/joinmatch', { roomName })
    .then((res) => {
      console.log('action called, why no redirect???');
      console.log(roomName);
      history.push(`/room/${roomName}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}
