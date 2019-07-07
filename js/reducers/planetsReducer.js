const planetsListInitialState = {
    planetsListData: [],
}
const planetsDetailsInitialState = {
  planetsDetails: [],
}
export function planetsReducer(state = planetsListInitialState, action) {
    switch(action.type) {
        case 'FETCH_PLANETS_SUCCESS':
            return {
                ...state,
                planetsListData: action.planetsListData
            }
        default:
            return state;
    }
}

export function planetsDetailsReducer(state = planetsDetailsInitialState, action) {
    switch(action.type) {
        case 'FETCH_PLANETS_DETAILS_SUCCESS':
            return {
                ...state,
                planetsDetailsData: action.planetsDetailsData
            }
        default:
            return state;
    }
}
