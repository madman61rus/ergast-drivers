import * as types from './actionTypes';

const initState = {
  races: [],
  limit: 10,
  total: 0,
  offset: 0,
  currentPage: 1,
  requesting: false,
  successful: false,
  errors: []
} 

export default function racesReducer(state = initState, action) {
  switch (action.type) {
    case types.RACES_FETCHING:
      return {
        ...state,
        requesting: true,
        successful: false
      }
    case types.ADD_RACES:
      return {
        ...state,
        requesting: false,
        successful: true,
        races: action.payload
      }
    case types.RACES_SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
      case types.RACES_SET_TOTAL:
      return {
        ...state,
        total: action.payload
      }
    case types.RACES_SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      }
    case types.RACES_SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      }
    case types.RACES_SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        offset: action.payload.offset
      }
    case types.RACES_RESET:
      return initState       
       
    default:
      return state
  }
}