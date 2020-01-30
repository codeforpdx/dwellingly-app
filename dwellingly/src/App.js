import React from 'react';
import dwellinglyLogo from './assets/images/dwellingly.png'
import codeforpdxLogo from './assets/codeforpdx/c4pdx.gif'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={dwellinglyLogo} className="" alt="dwellingly" /> 
        <img src={codeforpdxLogo} className="App-logo" alt="logo" />
      
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
