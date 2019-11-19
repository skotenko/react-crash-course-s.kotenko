import React from 'react';
import './Actions.css'

function ActionsUI({onSendHandler, onCancelHandler}) {
  return (
    <div className="Actions">
      <button onClick={onSendHandler} className="action">Load</button>
      <button onClick={onCancelHandler} className="action">Cancel Request</button>
    </div>
  );
}

export default ActionsUI;
