import axios from 'axios';
import { CONSTANTS } from '../actions';

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
  axios
    .post('/message', newMessage)
    .then((res) => {
      console.log(res);
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
