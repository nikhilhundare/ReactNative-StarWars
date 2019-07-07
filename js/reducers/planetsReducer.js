import { Actions } from 'react-native-router-flux';
import {
  FETCH_PLANETS_PENDING,
  FETCH_PLANETS_SUCCESS,
  FETCH_PLANETS_ERROR,
  FETCH_PLANETS_DETAILS_PENDING,
  FETCH_PLANETS_DETAILS_SUCCESS,
  FETCH_PLANETS_DETAILS_ERROR,
  RESET_PLANETS_DETAILS,
  FETCH_FILMS_PENDING,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_ERROR,
  FETCH_ACTORS_PENDING,
  FETCH_ACTORS_SUCCESS,
  FETCH_ACTORS_ERROR,
} from '../actions/planetsAction.js';

const planetsListInitialState = {
    planetsListData: [],
}
const planetsDetailsInitialState = {
  planetsDetails: [],
}
const filmsDetailsInitialState = {
  filmsDetails: [],
}
const actorsDetailsInitialState = {
  actorsDetails: [],
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
      case RESET_PLANETS_DETAILS:
          return {
            ...state,
            planetsDetailsData: {}
          }
      default:
          return state;
  }
}

export function filmsDetailsReducer(state = filmsDetailsInitialState, action) {
  switch(action.type) {
      case FETCH_FILMS_PENDING:
        return {
            ...state
        }
      case FETCH_FILMS_SUCCESS:
        return {
            ...state,
            filmsDetailsData: action.filmsDetailsData
        }
      case FETCH_FILMS_ERROR:
          return {
            ...state,
            error: action.error
          }
      default:
          return state;
  }
}

export function actorsDetailsReducer(state = actorsDetailsInitialState, action) {
  switch(action.type) {
      case FETCH_ACTORS_PENDING:
        return {
            ...state
        }
      case FETCH_ACTORS_SUCCESS:
        return {
            ...state,
            actorsDetailsData: action.actorsDetailsData
        }
      case FETCH_ACTORS_ERROR:
        return {
            ...state,
            error: action.error
        }
      default:
          return state;
  }
}
