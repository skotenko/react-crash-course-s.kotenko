import * as types from "./actionTypes";

export const planetsLoading = () => ({
  type: types.FETCH_PLANETS_REQUEST,
});

export const planetsCanceled = () => ({
  type: types.FETCH_PLANETS_CANCELED,
});

export const planetsLoaded = (planets) => ({
  type: types.FETCH_PLANETS_SUCCESS,
  payload: planets,
});

export const planetsLoadingError = (reason) => ({
  type: types.FETCH_PLANETS_FAILURE,
  payload: reason,
});
