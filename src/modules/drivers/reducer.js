import * as types from './actionTypes';

const initState = {
  drivers: [],
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
    default:
      return state
  }
}