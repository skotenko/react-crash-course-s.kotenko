import {
  FETCH_PLANETS_REQUEST,
  FETCH_PLANETS_FAILURE,
  FETCH_PLANETS_SUCCESS,
  FETCH_PLANETS_CANCELED,
} from "../../constants/actions";

const initialState = {
  planets: [],
  isLoading: false,
  isError: false,
  isCancel: false,
};

export default function planets(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLANETS_REQUEST:
      return {
        // planets: [],
        isLoading: true,
        isError: false,
        isCancel: false,
      };

    case FETCH_PLANETS_SUCCESS: {
      const planets = action.payload;

      return {
        planets: planets,
        isLoading: false,
      };
    }

    case FETCH_PLANETS_FAILURE:
      return {
        // planets: [],
        isLoading: false,
        isError: true,
      };

    case FETCH_PLANETS_CANCELED:
      return {
        // planets: [],
        isLoading: false,
        isCancel: true,
      };

    default:
      return state;
  }
};
