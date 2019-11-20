import React from 'react';
import {connect} from 'react-redux';
import uuidv1 from 'uuid/v1';
import {useAlert} from "react-alert";

import PlanetItem from '../PlanetItem/PlanetItem';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Spinner from '../Spinner/Spinner';

import './PlanetList.css';


function PlanetListUI({planetsState: {planets, error, isLoading, isCancel}}) {
  const alert = useAlert();

  let errorMessage = null;
  const loadingMessage = isLoading ? <Spinner/> : null;

  if (error) {
    alert.error(error);
    errorMessage = <ErrorIndicator/>;
  }

  if (isCancel) {
    alert.info('Canceled');
  }

  return (
    <>
      {errorMessage}
      {loadingMessage}
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
