import React from 'react';
import logo from './logo.svg';
import './App.css';
import Actions from "./components/Actions/Actions";
import PlanetList from "./components/PlanetList/PlanetList";

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
