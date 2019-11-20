import React from 'react';
import {useDispatch, useStore} from 'react-redux';

import {fetchPlanets, cancelPlanetsRequest} from '../../reducers/planets';

import './Actions.css'

function ActionsUI() {
  const dispatch = useDispatch();
  const store = useStore();

  return (
    <div className="Actions">
      <button onClick={() => fetchPlanets('https://swapi.co/api/planets/')(dispatch, store)} className="action">Load
      </button>
      <button onClick={() => cancelPlanetsRequest()} className="action">Cancel Request</button>
    </div>
  );
}

export default ActionsUI;
