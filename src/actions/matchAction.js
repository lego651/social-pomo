import axios from 'axios';

import {
  START_MATCHING,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
} from './types';

// add user to waiting queue, and update redux profile.matching to true
export const startMatching = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get('/match')
    .then((res) => {
      console.log(res);
      dispatch({
        type: START_MATCHING
      })
      dispatch({
        type: CLEAR_ERRORS
      });
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
