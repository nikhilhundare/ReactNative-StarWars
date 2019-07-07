export const FETCH_PLANETS_PENDING = 'FETCH_PLANETS_PENDING';
export const FETCH_PLANETS_SUCCESS = 'FETCH_PLANETS_SUCCESS';
export const FETCH_PLANETS_ERROR = 'FETCH_PLANETS_ERROR';

export const FETCH_PLANETS_DETAILS_PENDING = 'FETCH_PLANETS_DETAILS_PENDING';
export const FETCH_PLANETS_DETAILS_SUCCESS = 'FETCH_PLANETS_DETAILS_SUCCESS';
export const FETCH_PLANETS_DETAILS_ERROR = 'FETCH_PLANETS_DETAILS_ERROR';


function fetchPlanetPending(){
  return {
    type:FETCH_PLANETS_PENDING,
  }
}
function fetchPlanetSuccess(data){
  return {
    type:FETCH_PLANETS_SUCCESS,
    planetsListData: data
  }
}
function fetchPlanetError(error){
  return {
    type:FETCH_PLANETS_ERROR,
    error:error,
  }
}

export function fetchPlanetsList(){
  return dispatch => {
    dispatch(fetchPlanetPending());
    fetch('https://swapi.co/api/planets/')
      .then((response) => response.json())
      .then((responseJson) => dispatch(fetchPlanetSuccess(responseJson.results)))
      .catch(error => {
            dispatch(fetchPlanetError(error));
      })
  }
}

planetsDetailsObject = {
  planetsData : {},
  filmsData : {},
};
export function fetchPlanetsDetails(){
    return dispatch => {
      dispatch(fetchPlanetDetailsPending());
      fetch('https://swapi.co/api/planets/1')
      .then((response) => response.json())
      .then((responseJSON) => {
        planetsDetailsObject.planetsData = Object.assign(responseJSON);
        let filmsURLs = responseJSON.films;
        let filmsDetailsArray = new Array;
        let fetchURLsArray = [];

        for(let i = 0; i < filmsURLs.length; i++){
          fetchURLsArray.push(
            fetch(filmsURLs[i])
            .then((response) => response.json())
            .then((filmsResponse) => {
                filmsDetailsArray.push(filmsResponse);
            })
          )
        }
        Promise.all(fetchURLsArray).then(function() {
          planetsDetailsObject.filmsData = filmsDetailsArray;
          dispatch(fetchPlanetDetailsSuccess(planetsDetailsObject))
        });
      })
      .catch(error => {
            dispatch(fetchPlanetDetailsError(error));
      })
    }
}

function fetchPlanetDetailsPending(){
  return {
    type:FETCH_PLANETS_DETAILS_PENDING,
  }
}
function fetchPlanetDetailsSuccess(data){
  return {
    type: FETCH_PLANETS_DETAILS_SUCCESS,
    planetsDetailsData: data
  }
}
function fetchPlanetDetailsError(error){
  return {
    type:FETCH_PLANETS_DETAILS_ERROR,
    error:error,
  }
}
