import React from 'react';
import './Actions.css'

function ActionsUI({onSendHandler, onCancelHandler}) {
  return (
    <div className="PlanetList__actions">
      <button onClick={onSendHandler} className="PlanetList__btn">Load</button>
      <button onClick={onCancelHandler} className="PlanetList__btn">Cancel Request</button>
    </div>
  );
}

export default ActionsUI;
