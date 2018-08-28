import * as types from './actionTypes';

const initState = {
  driverInfo: {},
  requesting: false,
  successful: false,
  errors: []
} 

export default function driversReducer(state = initState, action) {
  switch (action.type) {
    case types.DRIVER_INFO_FETCHING:
      return {
        ...state,
        requesting: true
      }
    case types.ADD_DRIVER_INFO:
      return {
        ...state,
        requesting: false,
        successful: true,
        driverInfo: action.payload
      }
    case types.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
       
    default:
      return state
  }
}