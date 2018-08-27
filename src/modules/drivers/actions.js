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

const fetchDriversSuccess = (response) => {
  console.log('response ', response)
  return {
    type: types.ADD_DRIVERS,
    payload: response.data.MRData.DriverTable.Drivers
  }
}

const fetchDriversError = (error) => {
  console.log('error ', error)
}

export const fetchDrivers = (limit = 30, offset = 0) => {
  return dispatch => {
  dispatch(driversIsFetching(true))

  const fullUrl = SERVER_URL + GET_DRIVERS + `limit=${limit}&offset=${offset}`;

  axios.get(fullUrl)
    .then((response) => {
      dispatch(fetchDriversSuccess(response))
    }).catch((error) => {
    dispatch(fetchDriversError(error))
  });

  }

}