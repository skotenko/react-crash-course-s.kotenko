import React from 'react';

function PlanetItem({name, uuid}) {
  return (
    <li key={uuid}>{name}</li>
  );
}

export default PlanetItem;
