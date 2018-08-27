import * as types from './actionTypes';

const initState = {
  drivers: [],
  limit: 0,
  total: 0,
  offset: 0,
  requesting: false,
  successful: false,
  errors: []
} 

export default function driversReducer(state = initState, action) {
  switch (action.type) {
    case types.DRIVERS_FETCHING:
      return {
        ...state,
        requesting: true
      }
    case types.ADD_DRIVERS:
      return {
        ...state,
        requesting: false,
        successful: true,
        drivers: action.payload
      }
    case types.SET_TOTAL:
      return {
        ...state,
        total: action.payload
      }
    case types.SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      }
    case types.SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      }    
    default:
      return state
  }
}