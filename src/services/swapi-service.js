import axios from "axios";
import * as actions from "../store/swapi.co/actions/actions";

export default class SwapiService {

  _apiBase = 'https://swapi.co/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';
  _cancelToken = axios.CancelToken.source(); // Save token for cancel of current request

  getResource = async (url) => {
    axios.get(this._apiBase, {cancelToken: this._cancelToken.token})
      .then(res => {
        // dispatch(actions.planetsLoaded(res.data.results));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          // dispatch(actions.planetsCanceled());
        } else {
          if (error.response) {
            // dispatch(actions.planetsLoadingError('Response error'));
            console.error(error.response.data);
          } else if (error.request) {
            // dispatch(actions.planetsLoadingError('Request error'));
            console.error(error.request);
          } else {
            // dispatch(actions.planetsLoadingError('Error'));
            console.error('Error', error.message);
          }
        }
      });
  };

  cancelRequest() {
    this._cancelToken.cancel();
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };
}
