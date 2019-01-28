import axios from "axios";
import { FETCH_BUSINESSES, FETCH_BUSINESSES_ERROR, VOTE_LIKE, UPDATE_VOTE_LIKE, VOTE_UNLIKE, GET_VOTES } from './types';

export const fetchBusinesses = theQuery => dispatch => {
  const API_KEY = "wFjDtYRs6H8AWzcGKVTiT2rkSPWG7JeMjMKA8EMlujXP7wRY3On6LD93416DbYXgwGvMRPoI0Xv2p1O0fFr7QQAJpjFlUzqRiSDum2RZzSjhob3RfKpEgJyvJD6lWnYx";
  const yelpBasePath = "https://api.yelp.com/v3/businesses/search?categories=nightlife";
  axios
    .get(`https://cors-anywhere.herokuapp.com/${yelpBasePath}&location=${theQuery}`, { headers: { Authorization: `Bearer ${API_KEY}` } })
    .then(res => {
      dispatch({
        type: FETCH_BUSINESSES,
        payload: res.data.businesses
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_BUSINESSES_ERROR,
        payload: err.response.data.error
      })
    })
};

export const voteLike = (userEmail, businessID) => dispatch => {
  const theIDs = {
    userEmail,
    businessID
  }
  axios
    .post(`/api/like/theID`, theIDs)
    .then(res => {
      dispatch({
        type: VOTE_LIKE,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

export const updateVoteLike = (userEmail, businessID) => dispatch => {
  const theIDs = {
    userEmail,
    businessID
  }
  axios
    .post(`/api/like/theID`, theIDs)
    .then(res => {
      dispatch({
        type: UPDATE_VOTE_LIKE,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

export const unLike = (userEmail, businessID) => dispatch => {
  const theIDs = {
    userEmail,
    businessID
  }
  axios
    .post(`/api/unlike`, theIDs)
    .then(res => {
      dispatch({
        type: VOTE_UNLIKE,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

// Get votes
export const getVotes = () => dispatch => {
  axios
    .get('/api/votes')
    .then(res => {
      dispatch({
        type: GET_VOTES,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
};