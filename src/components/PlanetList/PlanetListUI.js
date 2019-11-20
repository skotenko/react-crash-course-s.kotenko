import React from 'react';
import {connect} from 'react-redux';
import uuidv1 from 'uuid/v1';

import PlanetItem from '../PlanetItem/PlanetItem';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Spinner from '../Spinner/Spinner';

import './PlanetList.css';


function PlanetListUI({planetsState: {planets, isError, isLoading, isCancel}}) {

  const errorMessage = isError ? <ErrorIndicator/> : null;
  const loadingMessage = isLoading ? <Spinner/> : null;
  const cancelMessage = isCancel ? <div>Canceled</div> : null;

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

const mapStateToProps = state => {
  return {planetsState: state.planetsReducer};
};

export default connect(mapStateToProps)(PlanetListUI);
