import { combineReducers } from 'redux';
import userReducer from './userReducer';
import roomReducer from './roomReducer';
import uiReducer from './uiReducer';
import pomoReducer from './pomoReducer';

export default combineReducers({
  user: userReducer,
  room: roomReducer,
  pomo: pomoReducer,
  UI: uiReducer
});
