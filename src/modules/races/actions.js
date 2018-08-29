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

export const fetchRacesInfo = (driverId, limit = 30, offset = 0) => {
  return dispatch => {
  dispatch(racesIsFetching(true))

  const fullUrl = SERVER_URL + GET_RACES_INFO+ `${driverId}/results.json?${limit}&${offset}`;

  axios.get(fullUrl)
    .then((response) => {
      dispatch(fetchRacesSuccess(response.data.MRData.RaceTable.Races))
    }).catch((error) => {
    dispatch(fetchDriversError(error))
  });

  }

}
