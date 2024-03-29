import { CONSTANTS } from '../actions';

import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_TAG,
  REMOVE_TAG,
  SET_TODO,
  REMOVE_TODO,
  ADD_INROOM,
  REMOVE_INROOM,
  REMOVE_INROOM_OWNSROOM,
  ADD_INROOM_OWNSROOM,
  SET_NICKNAME,
  START_MATCHING,
  MATCH_THEN_JOIN_ROOM,
  SET_STOPWATCH_TIMER,
  REMOVE_STOPWATCH_TIMER,
  SET_POMO_TIMER,
  REMOVE_POMO_TIMER
} from '../actions/types';

const initialState = {
  authenticated: false,
  loading: false,
  todo: null,
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
    case SET_NICKNAME:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          nickName: action.payload
        }
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
          tags: state.profile.tags.filter(val => val !== action.payload.tag)
        }
      }
    case ADD_INROOM:
      return {
        ...state,
        profile: {
          ...state.profile,
          inRoom: action.payload
        }
      }
    case REMOVE_INROOM:
      return {
        ...state,
        profile: {
          ...state.profile,
          inRoom: null
        }
      }
    case ADD_INROOM_OWNSROOM:
      return {
        ...state,
        profile: {
          ...state.profile,
          inRoom: action.payload,
          ownsRoom: action.payload,
        }
      }
    case REMOVE_INROOM_OWNSROOM:
      return {
        ...state,
        profile: {
          ...state.profile,
          inRoom: null,
          ownsRoom: null,
        }
      }
    case SET_TODO:
      return {
        ...state,
        todo: action.payload
      }
    case REMOVE_TODO:
      return {
        ...state,
        todo: null
      }
    case START_MATCHING:
      return {
        ...state,
        profile: {
          ...state.profile,
          matching: true
        }
      }
    case MATCH_THEN_JOIN_ROOM:
      return {
        ...state,
        profile: {
          ...state.profile,
          matching: false,
          ownsRoom: action.payload.ownsRoom,
          inRoom: action.payload.inRoom
        }
      }
    case SET_STOPWATCH_TIMER:
      return {
        ...state,
        profile: {
          ...state.profile,
          stopwatch: {
            ...state.profile.stopwatch,
            on: action.payload.on,
            startingTime: action.payload.startingTime,
            pauseTimer: action.payload.pauseTimer,
          }
        }
      }
    case REMOVE_STOPWATCH_TIMER:
      return {
        ...state,
        profile: {
          ...state.profile,
          stopwatch: {
            ...state.profile.stopwatch,
            on: false,
            startingTime: null,
            pauseTimer: null,
          }
        }
      }
    case SET_POMO_TIMER:
      return {
        ...state,
        profile: {
          ...state.profile,
          timer: {
            ...state.profile.timer,
            on: action.payload.on,
            startingTime: action.payload.startingTime,
            logTime: action.payload.logTime,
            pauseTimer: action.payload.pauseTimer,
          }
        }
      }
    case REMOVE_POMO_TIMER:
      return {
        ...state,
        profile: {
          ...state.profile,
          timer: {
            ...state.profile.timer,
            on: false,
            startingTime: null,
            logTime: null,
            pauseTimer: null,
          }
        }
      }
    default:
      return state;
  }
}

export default authReducer
