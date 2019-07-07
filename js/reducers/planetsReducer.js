import {
  FETCH_PLANETS_PENDING,
  FETCH_PLANETS_SUCCESS,
  FETCH_PLANETS_ERROR,
  FETCH_PLANETS_DETAILS_PENDING,
  FETCH_PLANETS_DETAILS_SUCCESS,
  FETCH_PLANETS_DETAILS_ERROR,
} from '../actions/planetsAction.js';

const planetsListInitialState = {
    planetsListData: [],
}
const planetsDetailsInitialState = {
  planetsDetails: [],
}
export function planetsReducer(state = planetsListInitialState, action) {
    switch(action.type) {
        case FETCH_PLANETS_PENDING:
            return {
                ...state
            }
        case FETCH_PLANETS_SUCCESS:
            return {
                ...state,
                planetsListData: action.planetsListData
            }
        case FETCH_PLANETS_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export function planetsDetailsReducer(state = planetsDetailsInitialState, action) {
  switch(action.type) {
      case FETCH_PLANETS_PENDING:
        return {
            ...state
        }
      case FETCH_PLANETS_DETAILS_SUCCESS:
          return {
              ...state,
              planetsDetailsData: action.planetsDetailsData
          }
      case FETCH_PLANETS_DETAILS_ERROR:
          return {
              ...state,
              error: action.error
          }
      default:
          return state;
  }
}
