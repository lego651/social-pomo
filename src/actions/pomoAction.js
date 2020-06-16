import axios from 'axios';

import {
  GET_WEEKLY_POMO
  GET_MINUTES_TODAY,
} from './types';

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

export const getWeeklyPomo = () => (dispatch) => {
  axios
    .get('/pomo/week')
    .then((res) => {
      dispatch({
        type: GET_WEEKLY_POMO,
        payload: res.data
      });
    })
    .catch((err) => {
      console.error(err);
    })
}

export const getMinutesToday = () => (dispatch) => {
  axios
    .get('/minutes/today')
    .then((res) => {
      dispatch({
        type: GET_MINUTES_TODAY,
        payload: res.data
      });
    })
    .catch((err) => {
      console.error(err);
    })
}

