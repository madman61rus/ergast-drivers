import { combineReducers } from 'redux';
import driversReducer from '../../modules/drivers/reducer';
import racesReducer from '../../modules/races/reducer';

const rootReducer = combineReducers({
  driversReducer,
  racesReducer  
});
export default rootReducer;