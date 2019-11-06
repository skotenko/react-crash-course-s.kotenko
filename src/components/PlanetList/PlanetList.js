import React from 'react';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import PlanetItem from "../PlanetItem/PlanetItem";
import './PlanetList.css';

class PlanetList extends React.Component {

  baseURL = 'https://swapi.co/api/';
  _source = null;

  state = {
    isLoading: false,
    isError: false,
    isCancel: false,
    planets: [],
  };

  onCancel = () => {

    if (this.state.isLoading) {
      this.setState({
        isLoading: false,
        isCancel: true,
        isError: false,
      });

      // Cancel request
      this._source.cancel();

      setTimeout(() => {
        this.setState({
          isLoading: false,
          isCancel: false,
          isError: false,
        });
      }, 2000);
    }
  };

  fetchPlanets = () => {
    this._source = axios.CancelToken.source();

    axios.get(`${this.baseURL}planets/`, {cancelToken: this._source.token})
      .then(res => {
        const planets = res.data.results;
        this.setState({
          isLoading: false,
          isError: false,
          planets: planets,
        });
      })
      .catch(error => {

        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          // handle error
          this.setState({
            isError: true,
            planets: [],
          });

          if (error.response) {
            console.error(error.response.data);
          } else if (error.request) {
            console.error(error.request);
          } else {
            console.error('Error', error.message);
          }
        }
      });
  };

  onSend = () => {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
        isError: false,
        isCancel: false,
      });

      this.fetchPlanets();
    } else {
      // todo Add tips for request button ("Please wait, or cancel request")
    }
  };

  render() {
    const {planets, isLoading, isError, isCancel} = this.state;
    let text = "Get planets";
    let disabled = false;

    if (isLoading) {
      text = "Loading";
      disabled = true;
    } else if (isCancel) {
      text = "Canceled by user";
    } else if (isError) {
      text = "Error";
    }

    return (
      <div className="PlanetList">
        <div className="PlanetList__actions">
          <button onClick={this.onSend} disabled={disabled} className="PlanetList__btn">{text}</button>
          <button onClick={this.onCancel} className="PlanetList__btn">Cancel Request</button>
        </div>
        <h2>The Star Wars Planets:</h2>
        <ol className="PlanetList__list">
          {
            planets.map(item => {
              const uuid = uuidv1();
              return <PlanetItem key={uuid} name={item.name}/>;
            })
          }
        </ol>
      </div>
    );
  };
}

export default PlanetList;
