import React from 'react';
import {Provider} from 'react-redux'
import Actions from "./components/ActionsList/Actions";
import PlanetListUI from "./components/PlanetList/PlanetListUI";

import store from './store';

import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
          </header>
          <main className="App-main">
            <Actions/>
            <PlanetListUI/>
          </main>
        </div>
      </Provider>
    );
  }
}

export default App;
