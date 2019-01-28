import {
  FETCH_BUSINESSES,
  VOTE_LIKE,
  GET_VOTES,
  VOTE_UNLIKE,
  UPDATE_VOTE_LIKE,
  USER_LOGGED_OUT,
  FETCH_BUSINESSES_ERROR
} from '../actions/types';

const initialState = {
  businessList: [],
  votes: [],
  errors: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_OUT:
      return initialState
    case FETCH_BUSINESSES:
      return {
        ...state,
        businessList: action.payload,
        errors: {}
      }
    case GET_VOTES:
      return {
        ...state,
        votes: action.payload
      }
    case VOTE_LIKE:
      return {
        ...state,
        votes: [...state.votes, action.payload]
      }
    case UPDATE_VOTE_LIKE:
      let newList = [];
      let a = state.votes.filter(item => item.businessID !== action.payload.businessID)
      newList = [...a, action.payload]
      return {
        ...state,
        votes: newList
      }
    case VOTE_UNLIKE:
      let b = state.votes.filter(item => item.businessID === action.payload.businessID);
      let arrayLikes = b[0].likes;

      let upatedVotes = state.votes.filter(item => item.businessID !== action.payload.businessID);
      let VOTE_UNLIKE_newList = [];
      VOTE_UNLIKE_newList = [...upatedVotes, action.payload];

      if (arrayLikes.length === 1) {
        return {
          ...state,
          votes: [...upatedVotes]
        }
      } else {
        return {
          ...state,
          votes: VOTE_UNLIKE_newList
        }
      }
    case FETCH_BUSINESSES_ERROR:
      return {
        businessList: [],
        errors: action.payload
      }
    default:
      return state;
  }
}