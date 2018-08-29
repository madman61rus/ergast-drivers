import * as types from './actionTypes';

const initState = {
  drivers: [],
  driverInfo: {},
  limit: 30,
  total: 0,
  offset: 0,
  currentPage: 1,
  requesting: false,
  successful: false,
  errors: []
} 

export default function driversReducer(state = initState, action) {
  switch (action.type) {
    case types.DRIVERS_FETCHING:
      return {
        ...state,
        requesting: action.payload,
        successful: false
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
      case types.DRIVER_INFO_FETCHING:
      return {
        ...state,
        requesting: true,
        successful: false
      }
    case types.ADD_DRIVER_INFO:
      return {
        ...state,
        requesting: false,
        successful: true,
        driverInfo: action.payload
      }
    case types.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        offset: action.payload.offset
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