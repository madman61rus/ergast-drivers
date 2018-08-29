import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
   const { logger } = require(`redux-logger`);

   middlewares.push(logger);
}

const configureStore = (initialState) => {

  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};

export default configureStore;