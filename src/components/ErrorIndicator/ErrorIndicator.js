import React from 'react';
import './ErrorIndicator.css';
import icon from './death-star.png';

function ErrorIndicator() {

  return (
    <div className="ErrorIndicator">
      <img src={icon} alt=""/>
      <span>something has gone terribly wrong</span>
    </div>
  );
}

export default ErrorIndicator;
