import axios from 'axios';
import {
  SET_USER,
  SET_NICKNAME,
  SET_ERRORS,
  SET_SUCCESS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_TAG,
  REMOVE_TAG,
  SET_TODO,
  REMOVE_TODO,
} from './types';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserDataAndRedirect(history));
      dispatch({
        type: CLEAR_ERRORS
      })
    })
    .catch((err) => {
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
      setAuthorizationHeader(res.data.token);
      dispatch(getUserDataAndRedirect(history));
      dispatch({
        type: CLEAR_ERRORS
      })
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
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch((err) => console.log(err));
};

export const getUserDataAndRedirect = (history) => (dispatch) => {
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      history.push('/dashboard');
    })
    .catch((err) => console.log(err));
}

export const updateNickName = (nickName) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/user/nickname', {nickName})
    .then((res) => {
      dispatch({
        type: SET_NICKNAME,
        payload: nickName
      });
      dispatch({
        type: SET_SUCCESS,
        payload: res.data.success
      });
    })
    .catch((err) => console.log(err));
};

export const updatePassword = (data, callback) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/user/password', data)
    .then((res) => {
      dispatch({
        type: SET_SUCCESS,
        payload: res.data.success
      });
      callback();
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      callback();
    });
};

export const uploadImage = (formData) => (dispatch) => {
  // dispatch({ type: LOADING_USER });
  axios
    .post('/user/avatar', formData)
    .then(() => {
      dispatch(getUserData());
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
  dispatch({
    type: CLEAR_ERRORS
  });
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
      dispatch({
        type: SET_SUCCESS,
        payload: {'project': 'New project created.'}
      })
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
}

export const removeProject = (projectName) => (dispatch) => {
  const projectToRemove = {
    project: projectName
  }
  axios
    .post('/project/remove', projectToRemove)
    .then((res) => {
      dispatch({
        type: REMOVE_PROJECT,
        payload: projectToRemove
      })
    })
    .catch((err) => console.log(err));
}

export const addTag = (tagName) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
  const newTag = {
    tag: tagName
  }
  axios
    .post('/tag', newTag)
    .then((res) => {
      dispatch({
        type: ADD_TAG,
        payload: newTag
      })
      dispatch({
        type: SET_SUCCESS,
        payload: {tag: 'New tag created.'}
      })
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
}

export const removeTag = (tagName) => (dispatch) => {
  const tagToRemove = {
    tag: tagName
  }
  axios
    .post('/tag/remove', tagToRemove)
    .then((res) => {
      dispatch({
        type: REMOVE_TAG,
        payload: tagToRemove
      })
    })
    .catch((err) => console.log(err));
}

export const addTodo = (todo, roomName, handle) => (dispatch) => {
  const newMessage = {
    content: `${handle} committed to work on: ${todo}.`,
    roomName: roomName,
    userHandle: handle
  }
  axios
    .post('/message', newMessage)
    .then((res) => {
      dispatch({
        type: SET_TODO,
        payload: todo
      })
    })
    .catch((err) => console.log(err));
}

export const removeTodo = () => (dispatch) => {
  return dispatch({
    type: REMOVE_TODO
  })
}
