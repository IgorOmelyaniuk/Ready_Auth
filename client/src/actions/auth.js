import axios from 'axios'
import history from '../history' 
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../constants';

const API_URL = 'http://localhost:3100';

export const signinUser = ({ email, password }) => dispatch => {
  axios.post(`${API_URL}/signin`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', response.data.token);
      history.push('/feature');
    })
    .catch(() => dispatch(authError('Bad Login Info')));
}

export const signoutUser = () => {
  localStorage.removeItem('token');
  history.push('/');
  return { type: UNAUTH_USER }
}

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export const signupUser = ({ email, password }) => dispatch => {
  axios.post(`${API_URL}/signup`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/feature')
    })
    // .catch(error => dispatch(authError(error.response.data.error)));
}

export const fetchMessage = () => dispatch => {
  console.log('fetchMessage')
  axios.get(API_URL, {
    headers: { authorization: localStorage.getItem('token') }
  })
    .then(response => dispatch({
      type: FETCH_MESSAGE,
      payload: response.data.message
    }))
}