import { CONSTANTS } from '../actions';

import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_TAG,
  REMOVE_TAG,
} from '../actions/types';

const initialState = {
  authenticated: false,
  loading: false,
  profile: {}
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case CONSTANTS.LOG_IN:
      return {
        ...state,
        username: action.username
      };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        profile: action.payload.profile
      }
    case ADD_PROJECT:
      return {
        ...state,
        profile: {
          ...state.profile,
          projects: [...state.profile.projects, action.payload.project]
        }
      }
    case REMOVE_PROJECT:
      return {
        ...state,
        profile: {
          ...state.profile,
          projects: state.profile.projects.filter(val => val !== action.payload.project)
        }
      }
    case ADD_TAG:
      return {
        ...state,
        profile: {
          ...state.profile,
          tags: [...state.profile.tags, action.payload.tag]
        }
      }
    case REMOVE_TAG:
      return {
        ...state,
        profile: {
          ...state.profile,
          projects: state.profile.tags.filter(val => val !== action.payload.tag)
        }
      }
    default:
      return state;
  }
}

export default authReducer
