export function fetchPlanetsList(){
  return dispatch => {

    fetch('https://swapi.co/api/planets/')
      .then((response) => response.json())
      .then((responseJson) => dispatch(fetchPlanetSuccess(responseJson.results)));
  }
}

export function fetchPlanetSuccess(data){
  return {
    type:'FETCH_PLANETS_SUCCESS',
    planetsListData: data
  }
}

planetsDetailsObject = {
  planetsData : {},
  filmsData : {},
};
export function fetchPlanetsDetails(){
    return dispatch => {
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
      });
    }
}

export function fetchPlanetDetailsSuccess(data){
  return {
    type:'FETCH_PLANETS_DETAILS_SUCCESS',
    planetsDetailsData: data
  }
}
