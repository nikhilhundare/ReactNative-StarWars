import { combineReducers } from 'redux';

import {planetsReducer, planetsDetailsReducer} from './planetsReducer';
//import planetsDetailsReducer from './planetsReducer';

export default combineReducers({
  planetsList: planetsReducer,
  planetsDetails: planetsDetailsReducer,
});
