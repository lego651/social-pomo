import axios from 'axios';

// import firebase from '../utils/firebase';
import firebase from 'firebase/app';

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

require('firebase/auth')

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    console.log("setPersistence is called...");
    return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + errorMessage)
  });

  axios
    .post('/login', userData)
    .then((res) => {
      // console.log("line 47", res.data);
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

export const refreshToken = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.getIdToken(true)
      .then(function(data) {
        console.log("refreshToken is called...");
        console.log(data)
      })
      .catch(function(error) {
        // Handle error
        console.log(error);
      });
    }
  });
  // firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
  //   // Send token to your backend via HTTPS
  //   // ...
  //   console.log(idToken);
  // }).catch(function(error) {
  //   // Handle error
  //   console.log(error);
  // });
}

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
  console.log("getUserData is called...");
  refreshToken();
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
    .catch((err) => {
      localStorage.removeItem("FBIdToken");
      window.location.href = "/login";
      console.log(err)
    });
};

export const getUserDataAndRedirect = (history) => (dispatch) => {
  // console.log("redirect to login.");
  history.push('/home');
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
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

export const addTodo = (todo, handle, nickName, avatar, roomName) => (dispatch) => {
  const newMessage = {
    content: `${nickName} will focus on: ${todo}`,
    userHandle: "Pomo",
    nickName: "Pomo",
    avatar: null,
    roomName: roomName    
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
