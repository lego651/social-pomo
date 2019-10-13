import { combineReducers } from 'redux';
import userReducer from './userReducer';
import roomReducer from './roomReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  user: userReducer,
  room: roomReducer,
  UI: uiReducer
});
