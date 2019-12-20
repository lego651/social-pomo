import axios from 'axios';
// import { push } from 'react-router-redux';

import { CONSTANTS } from '../actions';
// import { history } from '../utils/history';
import {
  SET_ERRORS,
  ADD_INROOM_OWNSROOM,
  ADD_INROOM,
  REMOVE_INROOM,
  CLEAR_ERRORS,
  LOADING_UI,
  REMOVE_INROOM_OWNSROOM,
  LOADING_MESSAGE,
  STOP_LOADING_MESSAGE
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
        payloadCLEAR_ERRORS: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const addMessage = (newMessage) => (dispatch) => {
  dispatch({ type: LOADING_MESSAGE });
  axios
    .post('/message', newMessage)
    .then((res) => {
      // console.log(res);
      dispatch({ type:  STOP_LOADING_MESSAGE });
    })
    .catch((err) => {
      // console.log(err);
    })
}

export const deleteMessages = (roomName) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/messages', {roomName})
    .then((res) => {
      // console.log(res);
      dispatch({ type:  CLEAR_ERRORS});
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
  dispatch({ type: LOADING_UI });
  axios
    .post('/room', newRoom)
    .then((res) => {
      dispatch({
        type: ADD_INROOM_OWNSROOM,
        payload: newRoom.roomName
      })
      dispatch({
        type: CLEAR_ERRORS
      });
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
  dispatch({ type: LOADING_UI });
  axios
    .post('/joinroom', existingRoom)
    .then((res) => {
      console.log(res);
      if(res.data.success !== null) {
        dispatch({
          type: ADD_INROOM,
          payload: existingRoom.roomName
        })
        dispatch({
          type: CLEAR_ERRORS
        });
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

export const leaveRoom = (history, roomName) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/leaveroom', {roomName})
    .then((res) => {
      if(res.data.success !== null) {
        dispatch({
          type: REMOVE_INROOM
        })
        dispatch({
          type: CLEAR_ERRORS
        });
        history.push(`/room`)
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

export const deleteRoom = (history, roomName) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/room/delete', {roomName})
    .then((res) => {
      if(res.data.success !== null) {
        dispatch({
          type: REMOVE_INROOM_OWNSROOM
        })
        dispatch({
          type: CLEAR_ERRORS
        });
        history.push(`/room`)
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

export const deleteRoomNoRedirect = (roomName) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/room/delete', {roomName})
    .then((res) => {
      if(res.data.success !== null) {
        dispatch({
          type: REMOVE_INROOM_OWNSROOM
        })
        dispatch({
          type: CLEAR_ERRORS
        });
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

export const startCount = (roomName) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/startcount', { roomName })
    .then((res) => {
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch((err) => {
      console.log(err);
    })
}
