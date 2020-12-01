import axios from 'axios';

import {
  GET_WEEKLY_POMO,
  GET_MINUTES_TODAY,
  GET_MINUTES_WEEK,
  GET_MINUTES_ALL,
  GET_POMOS_TODAY,
} from './types';

export const createPomo = (newPomoObj) => (dispatch) => {
  axios.post('/pomo', newPomoObj)
}

export const getPomosToday = () => (dispatch) => {
  axios.get('/pomo/today')
    .then(res => {
      dispatch({
        type: GET_POMOS_TODAY,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.error(err);
    })
}

export const getWeeklyPomo = () => (dispatch) => {
  axios.get('/pomo/week')
    .then((res) => {
      console.log(res.data.data);
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

export const getMinutesWeek = () => (dispatch) => {
  axios
    .get('/minutes/week')
    .then((res) => {
      dispatch({
        type: GET_MINUTES_WEEK,
        payload: res.data
      });
    })
    .catch((err) => {
      console.error(err);
    })
}

export const getMinutesAll = () => (dispatch) => {
  axios
    .get('/minutes/all')
    .then((res) => {
      dispatch({
        type: GET_MINUTES_ALL,
        payload: res.data
      });
    })
    .catch((err) => {
      console.error(err);
    })
}

