export const FETCH_PLANETS_PENDING = 'FETCH_PLANETS_PENDING';
export const FETCH_PLANETS_SUCCESS = 'FETCH_PLANETS_SUCCESS';
export const FETCH_PLANETS_ERROR = 'FETCH_PLANETS_ERROR';

export const FETCH_PLANETS_DETAILS_PENDING = 'FETCH_PLANETS_DETAILS_PENDING';
export const FETCH_PLANETS_DETAILS_SUCCESS = 'FETCH_PLANETS_DETAILS_SUCCESS';
export const FETCH_PLANETS_DETAILS_ERROR = 'FETCH_PLANETS_DETAILS_ERROR';
export const RESET_PLANETS_DETAILS = 'RESET_PLANETS_DETAILS';

export const FETCH_FILMS_PENDING = 'FETCH_FILMS_PENDING';
export const FETCH_FILMS_SUCCESS = 'FETCH_FILMS_SUCCESS';
export const FETCH_FILMS_ERROR = 'FETCH_FILMS_ERROR';

export const FETCH_ACTORS_PENDING = 'FETCH_ACTORS_PENDING';
export const FETCH_ACTORS_SUCCESS = 'FETCH_ACTORS_SUCCESS';
export const FETCH_ACTORS_ERROR = 'FETCH_ACTORS_ERROR';

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
export function fetchPlanetsDetails(url){
    return dispatch => {
      dispatch(fetchPlanetDetailsPending());
      fetch(url)
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
export function resetPlanetDetails(){
  return {
    type:RESET_PLANETS_DETAILS,
  }
}

function fetchFilmsPending(){
  return {
    type:FETCH_FILMS_PENDING,
  }
}
function fetchFilmsSuccess(data){
  return {
    type:FETCH_FILMS_SUCCESS,
    filmsDetailsData: data
  }
}
function fetchFilmsError(error){
  return {
    type:FETCH_FILMS_ERROR,
    error:error,
  }
}
filmsDetailsObject = {
  filmsData : {},
  actorsData : {},
};
export function fetchFilmsDetails(url){
  return dispatch => {
    dispatch(fetchFilmsPending());
    fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
      filmsDetailsObject.filmsData = Object.assign(responseJSON);
      let actorsURLs = responseJSON.characters;
      let actorsDetailsArray = new Array;
      let fetchURLsArray = [];

      for(let i = 0; i < actorsURLs.length; i++){
        fetchURLsArray.push(
          fetch(actorsURLs[i])
          .then((response) => response.json())
          .then((actorsResponse) => {
              actorsDetailsArray.push(actorsResponse);
          })
        )
      }
      Promise.all(fetchURLsArray).then(function() {
        filmsDetailsObject.actorsData = actorsDetailsArray;
        dispatch(fetchFilmsSuccess(filmsDetailsObject))
      });
    })
    .catch(error => {
          dispatch(fetchFilmsError(error));
    })
  }
}

function fetchActorsPending(){
  return {
    type:FETCH_ACTORS_PENDING,
  }
}
function fetchActorsSuccess(data){
  return {
    type:FETCH_ACTORS_SUCCESS,
    actorsDetailsData: data
  }
}
function fetchActorsError(error){
  return {
    type:FETCH_ACTORS_ERROR,
    error:error,
  }
}
actorsDetailsObject = {
  filmsData : {},
  actorsData : {},
};
export function fetchActorsDetails(url){
  return dispatch => {
    dispatch(fetchActorsPending());
    fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
      actorsDetailsObject.actorsData = Object.assign(responseJSON);
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
        actorsDetailsObject.filmsData = filmsDetailsArray;
        dispatch(fetchActorsSuccess(actorsDetailsObject))
      });
    })
    .catch(error => {
          dispatch(fetchActorsError(error));
    })
  }
}
