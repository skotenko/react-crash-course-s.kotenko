import React from 'react';

function PlanetItem(props) {
  const {name, uuid} = props;

  return (
    <li key={uuid}>{name}</li>
  );
}

export default PlanetItem;
