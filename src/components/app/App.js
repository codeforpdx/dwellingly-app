import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">JOIN Messenger</h1>
        </header>
        <p>This is the application for JOIN</p>
      </div>
    );
  }
}

export default App;
