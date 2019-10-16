import axios from 'axios';
// import { push } from 'react-router-redux';

import { CONSTANTS } from '../actions';
// import { history } from '../utils/history';
import {
  SET_ERRORS
} from './types';


export const loginUser = (username) => {
  return dispatch => {
    return dispatch({
      type: CONSTANTS.LOG_IN,
      username,
    })
  }
}

export const getMessages = () => (dispatch) => {
  axios
    .get('/messages')
    .then((res) => {
      dispatch({
        type: CONSTANTS.GET_MESSAGES,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const addMessage = (newMessage) => (dispatch) => {
  console.log(newMessage)
  axios
    .post('/message', newMessage)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    })
}

// export const joinRoom = (taskObj, history) => (dispatch) => {
//   console.log(taskObj);
//   // dispatch(push('/room'));
//   history.push('/room');
// }

export const createRoom = (newRoom, history) => (dispatch) => {
  axios
    .post('/room', newRoom)
    .then((res) => {
      console.log(res);
      history.push(`/room/${newRoom.roomName}`)
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const joinRoom = (existingRoom, history) => (dispatch) => {
  console.log(existingRoom)
  axios
    .post('/joinroom', existingRoom)
    .then((res) => {
      console.log(res);
      if(res.data.success !== null) {
        history.push(`/room/${existingRoom.roomName}`)
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

// export const getReady = () => (dispatch) => {
//   axios
//     .get('/readyaddone')
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }
