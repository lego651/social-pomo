import axios from 'axios';
import {
  LOG_IN,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  ADD_PROJECT,
  DELETE_PROJECT,
} from './types';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/profile');
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      console.log(res);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/profile');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = '/login';
};

export const addProject = (projectName) => (dispatch) => {
  const newProject = {
    project: projectName
  }
  axios
    .post('/project', newProject)
    .then((res) => {
      dispatch({
        type: ADD_PROJECT,
        payload: newProject
      })
    })
    .catch((err) => console.log(err));
}

export const deleteProject = (projectName) => (dispatch) => {
  const projectToDelete = {
    project: projectName
  }
  axios
    .delete('/project', projectToDelete)
    .then((res) => {
      dispatch({
        type: DELETE_PROJECT,
        payload: projectToDelete
      })
    })
    .catch((err) => console.log(err));
}
