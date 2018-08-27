import { combineReducers } from 'redux';
import driversReducer from '../../modules/drivers/reducer';

const rootReducer = combineReducers({
  driversReducer,  
});
export default rootReducer;