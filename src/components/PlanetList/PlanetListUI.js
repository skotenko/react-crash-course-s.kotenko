import React, {useReducer} from 'react';
import {planetsReducer, initialState} from '../../reducers/planets';
import uuidv1 from 'uuid/v1';

import PlanetItem from "../PlanetItem/PlanetItem";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import Spinner from "../Spinner/Spinner";

import './PlanetList.css';


function PlanetListUI() {
  let [state] = useReducer(planetsReducer, initialState);
  
  console.log(state);

  const errorMessage = state.isError ? <ErrorIndicator/> : null;
  const loadingMessage = state.isLoading ? <Spinner/> : null;
  const cancelMessage = state.isCancel ? <div>Canceled</div> : null;

  return (
    <>
      {errorMessage}
      {loadingMessage}
      {cancelMessage}
      <ol className="PlanetList__list">
        {
          state.planets.map(item => {
            const uuid = uuidv1();
            return <PlanetItem key={uuid} name={item.name}/>;
          })
        }
      </ol>
    </>
  );
}

export default PlanetListUI;
