import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PlanetListUI from "./PlanetListUI";
import './PlanetList.css';

function PlanetList() {
  let [planets, setPlanets] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);
  let [isCancel, setIsCancel] = useState(false);

  const baseURL = 'https://swapi.co/api/';
  const _source = axios.CancelToken.source();

  useEffect(() => {
    console.log('useEffect');

    fetchPlanets();
  }, []);

  const onCancelHandler = () => {
    if (isLoading) {
      setIsLoading(false);
      setIsCancel(true);
    }
  };

  const onSendHandler = () => {
    if (!isLoading) {
      fetchPlanets();
    }
  };

  function fetchPlanets() {
    setIsLoading(true);
    setIsError(false);
    setIsCancel(false);

    axios.get(`${baseURL}planets/`, {cancelToken: _source.token})
      .then(res => {
        setPlanets(res.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);

        if (axios.isCancel(error)) {
          console.info('Request canceled', error.message);

          setIsCancel(true);
        } else {
          setIsError(true);

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

  return (
    <PlanetListUI isError={isError}
                  isLoading={isLoading}
                  isCancel={isCancel}
                  planets={planets}
    />
  );
}

export default PlanetList;
