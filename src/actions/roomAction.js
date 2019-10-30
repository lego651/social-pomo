import axios from 'axios';
// import { push } from 'react-router-redux';

import { CONSTANTS } from '../actions';
// import { history } from '../utils/history';
import {
  SET_ERRORS,
  ADD_INROOM_OWNSROOM,
  ADD_INROOM,
  REMOVE_INROOM,
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
      // console.log(res);
      dispatch({
        type: ADD_INROOM_OWNSROOM,
        payload: newRoom.roomName
      })
      history.push(`/room/${newRoom.roomName}`)
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const joinRoom = (existingRoom, history) => (dispatch) => {
  console.log('data in actions is', existingRoom)
  axios
    .post('/joinroom', existingRoom)
    .then((res) => {
      console.log(res);
      if(res.data.success !== null) {
        dispatch({
          type: ADD_INROOM,
          payload: existingRoom.roomName
        })
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

export const leaveRoom = (history) => (dispatch) => {
  axios
    .get('/inroom/remove')
    .then((res) => {
      if(res.data.success !== null) {
        dispatch({
          type: REMOVE_INROOM
        })
        history.push(`/room`)
      }
    })
    .catch((err) => {
      console.log(err);
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
