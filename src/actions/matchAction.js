import axios from 'axios';

import {
  START_MATCHING,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  MATCH_THEN_JOIN_ROOM
} from './types';

// add user to waiting queue, and update redux profile.matching to true
export const startMatching = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get('/match')
    .then((res) => {
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
  dispatch({ type: LOADING_UI });
  axios
    .post('/joinmatch', { roomName })
    .then((res) => {
      // console.log(res.data)
      dispatch({
        type: MATCH_THEN_JOIN_ROOM,
        payload: {
          ownsRoom: res.data.ownsRoom,
          inRoom: res.data.inRoom
        }
      })
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push(`/room/${roomName}`);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}
