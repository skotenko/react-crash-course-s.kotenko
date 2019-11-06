import React from 'react';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import PlanetItem from "../PlanetItem/PlanetItem";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import Spinner from "../Spinner/Spinner";
import './PlanetList.css';

class PlanetList extends React.Component {

  baseURL = 'https://swapi.co/api/';

  /**
   * Cancel token
   * @type {null}
   * @private
   */
  _source = null;

  state = {
    isLoading: false,
    isError: false,
    isCancel: false,
    planets: [],
  };

  onCancelHandler = () => {
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
    } else {
      // todo Add tips for cancel button ("Please send request")
    }
  };

  onSendHandler = () => {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
        isError: false,
        isCancel: false,
        planets: [],
      });

      this.fetchPlanets();
    } else {
      // todo Add tips for request button ("Please wait, or cancel request")
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
            isLoading: false,
            isCancel: false,
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

  render() {
    const {planets, isLoading, isError, isCancel} = this.state;
    let text = "Get planets";
    let disabled = false;

    if (isLoading) {
      text = "Loading";
      disabled = true;
    } else if (isCancel) {
      text = "Canceled. Get again";
    } else if (isError) {
      text = "Error. Try again";
    }

    const errorMessage = isError ? <ErrorIndicator/> : null;
    const spinner = isLoading ? <Spinner/> : null;
    // const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="PlanetList">
        <div className="PlanetList__actions">
          <button onClick={this.onSendHandler} disabled={disabled} className="PlanetList__btn">{text}</button>
          <button onClick={this.onCancelHandler} className="PlanetList__btn">Cancel Request</button>
        </div>
        <h2>The Star Wars Planets:</h2>
        {errorMessage}
        {spinner}
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
