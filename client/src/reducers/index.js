import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';

export default combineReducers({
  auth: authReducer,
  searchResult: businessReducer
});
