import React from 'react';
import {Provider} from 'react-redux';
import {positions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Actions from './components/ActionsList/Actions';
import PlanetListUI from './components/PlanetList/PlanetListUI';

import store from './store/store';

import './App.css';
import logo from './logo.svg';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <main className="App-main">
              <Actions/>
              <PlanetListUI/>
            </main>
          </div>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
