import React from 'react';
import logo from './logo.svg';
import './App.css';

function sayHello() {
  alert('You clicked me!');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="rectangle">
          <img src={"./images/logo_caradhras.png"} className="App-logo" alt="logo" />
          <p className="main-text"> 
            Toujours plus haut, toujours plus loin, toujours plus fort !
          </p>
        </div>
        <button className="styled-button" onClick={sayHello}>
          Heyyo Button
        </button>
        <p>
          Welcome to Caradhras NLPF application
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
