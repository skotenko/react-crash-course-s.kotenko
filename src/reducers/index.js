import { combineReducers } from 'redux';
import { planetsReducer } from './planets';

let rootReducer =  combineReducers({
  planetsReducer,
});

export default rootReducer;