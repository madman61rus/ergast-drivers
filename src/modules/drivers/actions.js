import * as types from './actionTypes';
import axios from 'axios';
import {SERVER_URL,GET_DRIVERS,GET_DRIVER_INFO} from '../../settings/urls';

const driversIsFetching = (state) => {
  return {
    type: types.DRIVERS_FETCHING,
    payload: state
  }
}

const driverInfoIsFetching = (state) => {
  return {
    type: types.DRIVER_INFO_FETCHING,
    payload: state
  }
}

const fetchDriversSuccess = (drivers) => {
  return {
    type: types.ADD_DRIVERS,
    payload: drivers
  }
}

const fetchDriverInfoSuccess = (driverInfo) => {
  if (driverInfo[0]){
    return {
      type: types.ADD_DRIVER_INFO,
      payload: driverInfo[0]
    }
  }
}

const fetchDriversError = (errors) => {
  return {
    type: types.DRIVERS_SET_ERRORS,
    payload: errors
  }
}

const setTotal = (total) => {
  return {
    type: types.DRIVERS_SET_TOTAL,
    payload: total
  }
}

const setLimit = (limit) => {
  return {
    type: types.DRIVERS_SET_LIMIT,
    payload: limit
  }
}

export const setOffset = (offset) => {
  return {
    type: types.DRIVERS_SET_OFFSET,
    payload: offset
  }
}

export const setCurrentPage = (currentPage, total, limit, offset) => {
  if (currentPage <= Math.round(total / limit))
  {
    return {
      type: types.DRIVERS_SET_CURRENT_PAGE,
      payload: {
        currentPage,
        offset: limit * currentPage - 1
      }
    }
  }
}


export const fetchDrivers = (limit = 30, offset = 0) => {
  return dispatch => {
  dispatch(driversIsFetching(true))

  const fullUrl = SERVER_URL + GET_DRIVERS + `limit=${limit}&offset=${offset}`;

  axios.get(fullUrl)
    .then((response) => {
      dispatch(fetchDriversSuccess(response.data.MRData.DriverTable.Drivers));
      dispatch(setTotal(response.data.MRData.total));
      dispatch(setLimit(response.data.MRData.limit));
      dispatch(setOffset(response.data.MRData.offset));
    }).catch((error) => {
    dispatch(fetchDriversError(error));
  });

  }

}

export const fetchDriverInfo = (driverId) => {
  return dispatch => {
  dispatch(driversIsFetching(true));

  const fullUrl = SERVER_URL + GET_DRIVER_INFO + `${driverId}.json`;

  axios.get(fullUrl)
    .then((response) => {
      dispatch(fetchDriverInfoSuccess(response.data.MRData.DriverTable.Drivers));
    }).catch((error) => {
    dispatch(fetchDriversError(error));
  });

  }

}
