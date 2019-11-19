import React from 'react';
import Actions from "./components/ActionsList/Actions";
import PlanetList from "./components/PlanetList/PlanetList";

import store from './store';

import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        </header>
        <main className="App-main">
          <Actions/>
          <PlanetList/>
        </main>
      </div>
    );
  }
}

export default App;
