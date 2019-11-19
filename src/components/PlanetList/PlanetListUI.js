import React from 'react';
import uuidv1 from 'uuid/v1';
import PlanetItem from "../PlanetItem/PlanetItem";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import Spinner from "../Spinner/Spinner";


function PlanetListUI({isError, isLoading, isCancel, planets}) {

  let errorMessage = isError ? <ErrorIndicator/> : null;
  let loadingMessage = isLoading ? <Spinner/> : null;
  let cancelMessage = isCancel ? <div>Canceled</div> : null;

  return (
    <>
      {errorMessage}
      {loadingMessage}
      {cancelMessage}
      <ol className="PlanetList__list">
        {
          planets.map(item => {
            const uuid = uuidv1();
            return <PlanetItem key={uuid} name={item.name}/>;
          })
        }
      </ol>
    </>
  );
}

export default PlanetListUI;
