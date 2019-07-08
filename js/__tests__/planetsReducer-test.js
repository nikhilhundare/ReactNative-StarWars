import * as planetActions from '../actions/planetsAction.js';
import {
  planetsReducer,
  planetsDetailsReducer,
  filmsDetailsReducer,
  actorsDetailsReducer,
} from '../reducers/planetsReducer.js';
import { planetsList } from './mock/mockData.js';

describe('Planets Reducer', () => {
  describe('Get Planets List', () => {
    it('should return a default state', () => {
      const planetsListState = planetsReducer(undefined,{});
      expect(planetsListState).toEqual({planetsListData: []});
    });
    it('should return a initial state if type is received is pending', () => {
      const planetsListState = planetsReducer(undefined,{
        type:planetActions.FETCH_PLANETS_PENDING,
        planetsListData: [],
      });
      expect(planetsListState).toEqual({planetsListData: []});
    });
    it('should return a new state if type received is success', () => {
      const mockPlanetsListData = planetsList;
      const planetsListState = planetsReducer(undefined,{
        type:planetActions.FETCH_PLANETS_SUCCESS,
        planetsListData: mockPlanetsListData,
      });
      expect(planetsListState).toEqual(planetsList);
    });
    it('should return a error if type received is error', () => {
      const planetsListState = planetsReducer(undefined,{
        type:planetActions.FETCH_PLANETS_ERROR,
        error: 'Error',
      });
      expect(planetsListState).toEqual({
          planetsListData: [],
          error: 'Error'
      });
    });
  });
});
