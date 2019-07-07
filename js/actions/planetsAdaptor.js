import {fetchPlanetsPending, fetchPlanetsSuccess, fetchPlanetsError} from 'actions';

function fetchPlanets() {
    return dispatch => {
        dispatch(fetchPlanetsPending());
        fetch('https://swapi.co/api/planets/')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchPlanetsSuccess(res.result);
            return res.result;
        })
        .catch(error => {
            dispatch(fetchPlanetsError(error));
        })
    }
}

export default fetchPlanets;
