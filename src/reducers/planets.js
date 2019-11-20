import axios from "axios";

import {FETCH_PLANETS_REQUEST, FETCH_PLANETS_FAILURE, FETCH_PLANETS_SUCCESS, FETCH_PLANETS_CANCELED}
  from "../constants/actions";

export const initialState = {
  planets: [],
  isLoading: false,
  isError: false,
  isCancel: false,
};

export function planetsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLANETS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isCancel: false,
      };

    case FETCH_PLANETS_SUCCESS: {
      const planets = action.payload;

      return {
        ...state,
        planets: planets,
        isLoading: false,
      };
    }

    case FETCH_PLANETS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case FETCH_PLANETS_CANCELED:
      return {
        ...state,
        isLoading: false,
        isCancel: true,
      };

    default:
      return state;
  }
}

const planetsLoading = () => ({
  type: FETCH_PLANETS_REQUEST,
});
const planetsCanceled = () => ({
  type: FETCH_PLANETS_CANCELED,
});

const planetsLoaded = (planets) => ({
  type: FETCH_PLANETS_SUCCESS,
  payload: planets,
});

const planetsLoadingError = (reason) => ({
  type: FETCH_PLANETS_FAILURE,
  payload: reason,
});

let source;

export const fetchPlanets = (baseURL) => (dispatch, store) => {
  const state = store.getState();

  if (!state.planetsReducer.isLoading) {
    dispatch(planetsLoading());

    source = axios.CancelToken.source(); // Save token for cancel of current request

    axios.get(baseURL, {cancelToken: source.token})
      .then(res => {
        dispatch(planetsLoaded(res.data.results));
      })
      .catch(error => {

        if (axios.isCancel(error)) {
          console.info('Request canceled', error);
          dispatch(planetsCanceled());
        } else {

          dispatch(planetsLoadingError('Server Error'));
          if (error.response) {
            console.error(error.response.data);
          } else if (error.request) {
            console.error(error.request);
          } else {
            console.error('Error', error.message);
          }
        }
      });
  }
};

export function cancelPlanetsRequest() {
  source.cancel();
}
