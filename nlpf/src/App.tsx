import React from 'react';
import logo from './logo.svg';
import FormSearch from './search/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Caradhras NLPF application
        </p>
        <FormSearch />
      </header>
    </div>
  );
}

export default App;
