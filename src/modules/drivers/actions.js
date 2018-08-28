import * as types from './actionTypes';
import axios from 'axios';
import {SERVER_URL,GET_DRIVERS} from '../../settings/urls';

const driversIsFetching = (state) => {
  console.log('driversIsFetching');
  return {
    type: types.DRIVERS_FETCHING,
    payload: state
  }
}

const fetchDriversSuccess = (drivers) => {
  return {
    type: types.ADD_DRIVERS,
    payload: drivers
  }
}

const fetchDriversError = (error) => {
  console.log('error ', error)
}

const setTotal = (total) => {
  return {
    type: types.SET_TOTAL,
    payload: total
  }
}

const setLimit = (limit) => {
  return {
    type: types.SET_LIMIT,
    payload: limit
  }
}

export const setOffset = (offset) => {
  return {
    type: types.SET_OFFSET,
    payload: offset
  }
}

export const fetchDrivers = (limit = 30, offset = 0) => {
  return dispatch => {
  dispatch(driversIsFetching(true))

  const fullUrl = SERVER_URL + GET_DRIVERS + `limit=${limit}&offset=${offset}`;

  axios.get(fullUrl)
    .then((response) => {
      dispatch(fetchDriversSuccess(response.data.MRData.DriverTable.Drivers))
      dispatch(setTotal(response.data.MRData.total))
      dispatch(setLimit(response.data.MRData.limit))
      dispatch(setOffset(response.data.MRData.offset))
    }).catch((error) => {
    dispatch(fetchDriversError(error))
  });

  }

}
