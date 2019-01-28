import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_LOGIN_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  VALIDATE_TOKEN,
  VALIDATE_TOKEN_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
} from '../actions/types';

const initialState = {
  user: [],
  success: '',
  resetPassword: '',
  errors: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
        errors: {}
      }
    case USER_LOGGED_OUT:
      return {
        user: []
      }
    case USER_LOGIN_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        success: action.payload
      }
    case RESET_PASSWORD_REQUEST_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    case VALIDATE_TOKEN:
      return {
        ...state,
        success: action.payload
      }
    case VALIDATE_TOKEN_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state;
  }
}