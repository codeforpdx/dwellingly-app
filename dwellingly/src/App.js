import React from 'react';
import logo from './c4pdx.gif';
import dwellinglylogo from './dwellingly.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={dwellinglylogo} className="" alt="dwellingly" /> 
        <img src={logo} className="App-logo" alt="logo" />
      
        <a
          className="App-link"
          href="http://www.codeforpdx.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code for PDX
        </a>
        <p>
          Community Built Civic Tech.
        </p>
      </header>
    </div>
  );
}

export default App;
