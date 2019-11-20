import axios from "axios";

import * as types from "../actions/actionTypes";
import * as actions from "../actions/actions";

export const initialState = {
  planets: [],
  isLoading: false,
  error: null,
  isCancel: false,
};

export function planetsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLANETS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        isCancel: false,
      };

    case types.FETCH_PLANETS_SUCCESS: {
      const planets = action.payload;

      return {
        ...state,
        planets: planets,
        isLoading: false,
      };
    }

    case types.FETCH_PLANETS_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        isLoading: false,
        error: error,
      };
    }

    case types.FETCH_PLANETS_CANCELED:
      return {
        ...state,
        isLoading: false,
        isCancel: true,
      };

    default:
      return state;
  }
}

let source;

export const fetchPlanets = (baseURL) => (dispatch, store) => {
  const state = store.getState();

  if (!state.planetsReducer.isLoading) {
    dispatch(actions.planetsLoading());

    source = axios.CancelToken.source(); // Save token for cancel of current request

    axios.get(baseURL, {cancelToken: source.token})
      .then(res => {
        dispatch(actions.planetsLoaded(res.data.results));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(actions.planetsCanceled());
        } else {
          if (error.response) {
            dispatch(actions.planetsLoadingError('Response error'));
            console.error(error.response.data);
          } else if (error.request) {
            dispatch(actions.planetsLoadingError('Request error'));
            console.error(error.request);
          } else {
            dispatch(actions.planetsLoadingError('Error'));
            console.error('Error', error.message);
          }
        }
      });
  }
};

export function cancelPlanetsRequest() {
  source.cancel();
}
