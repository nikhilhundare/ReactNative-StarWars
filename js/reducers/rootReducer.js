import { combineReducers } from 'redux';

import {
  planetsReducer,
  planetsDetailsReducer,
  filmsDetailsReducer,
  actorsDetailsReducer,
} from './planetsReducer';

export default combineReducers({
  planetsList: planetsReducer,
  planetsDetails: planetsDetailsReducer,
  filmsDetails: filmsDetailsReducer,
  actorsDetails: actorsDetailsReducer,
});
