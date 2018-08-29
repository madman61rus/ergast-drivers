import * as types from './actionTypes';
import axios from 'axios';
import {SERVER_URL,GET_RACES_INFO} from '../../settings/urls';

const racesIsFetching = () => {
  return {
    type: types.RACES_FETCHING
  }
}

const fetchRacesSuccess = (races) => {
  return {
    type: types.ADD_RACES,
    payload: races
  }
}

const racesFetchingErrors = (errors) => {
  console.log('error ', error)
}

const setTotal = (total) => {
  return {
    type: types.RACES_SET_TOTAL,
    payload: total
  }
}

const setLimit = (limit) => {
  return {
    type: types.RACES_SET_LIMIT,
    payload: limit
  }
}

export const setOffset = (offset) => {
  return {
    type: types.RACES_SET_OFFSET,
    payload: offset
  }
}

export const setCurrentPage = (currentPage, total, limit, offset) => {
  if (currentPage <= Math.round(total / limit))
  {
    return {
      type: types.RACES_SET_CURRENT_PAGE,
      payload: {
        currentPage,
        offset: limit * currentPage - 1
      }
    }
  }
}

export const resetRaces = () => {
  return {
    type: types.RACES_RESET
  }
}

export const fetchRacesInfo = (driverId, limit = 10, offset = 0) => {
  return dispatch => {
  dispatch(racesIsFetching(true))

  const fullUrl = SERVER_URL + GET_RACES_INFO+ `${driverId}/results.json?limit=${limit}&offset=${offset}`;

  axios.get(fullUrl)
    .then((response) => {
      console.log('response ', response);
      dispatch(fetchRacesSuccess(response.data.MRData.RaceTable.Races));
      dispatch(setTotal(response.data.MRData.total));
      dispatch(setLimit(response.data.MRData.limit));
      dispatch(setOffset(response.data.MRData.offset));
    }).catch((error) => {
    dispatch(fetchDriversError(error))
  });

  }

}
