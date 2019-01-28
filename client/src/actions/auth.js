
import axios from "axios";
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_LOGIN_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_ERROR,
  VALIDATE_TOKEN,
  VALIDATE_TOKEN_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR
} from './types';


export const signup = data => dispatch => {
  axios
    .post('/api/auth/register', data)
    .then(res => {
      localStorage.bookwormJWT = res.data.user.token;
      dispatch(userLoggedIn(res.data.user));
    })
    .catch(err => dispatch(loginError(err.response.data.errors)));
}

export const login = credentials => dispatch => {
  axios
    .post('/api/auth/login', credentials)
    .then(res => {
      localStorage.bookwormJWT = res.data.user.token;
      dispatch(userLoggedIn(res.data.user));
    })
    .catch(err => dispatch(loginError(err.response.data.errors)));
}

export const comfirm = token => dispatch => {
  axios
    .post('/api/auth/confirmation', { token: token })
    .then(res => {
      localStorage.bookwormJWT = res.data.user.token;
      dispatch(userLoggedIn(res.data.user));
    })
}

export const logout = () => dispatch => {
  localStorage.removeItem('bookwormJWT');
  dispatch(userLoggedOut());
}

export const resetPasswordRequest = (email) => dispatch => {
  axios
    .post('/api/auth/reset_password_request', email)
    .then(res => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
        payload: res.data.success
      })
    })
    .catch(err => dispatch(resetPasswordRequestError(err.response.data.errors)))
}

export const validateToken = token => dispatch => {
  axios
    .post('/api/auth/validate_token', { token })
    .then(res => {
      dispatch({
        type: VALIDATE_TOKEN,
        payload: res.data.success
      })
    })
    .catch(err => {
      dispatch({
        type: VALIDATE_TOKEN_ERROR,
        payload: err.response.data.error
      })
    })
}

export const resetPassword = data => dispatch => {
  axios
    .post('/api/auth/reset_password', { data })
    .then(res => {
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data.success
      })
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: err.response.data.errors
      })
    })
}

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})


export const loginError = data => ({
  type: USER_LOGIN_ERROR,
  payload: data
});

export const resetPasswordRequestError = data => ({
  type: RESET_PASSWORD_REQUEST_ERROR,
  payload: data
})

