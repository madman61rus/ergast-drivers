import * as types from './actionTypes';

const initState = {
  races: {},
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
    console.log('ADD_RACES ', action.payload)
      return {
        ...state,
        requesting: false,
        successful: true,
        races: action.payload
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