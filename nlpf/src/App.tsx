import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Navigation,
  About,
  FormSearch,
  Landing,
} from './components';
import CustomMap from './components/Map';
import data from './components/Data';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/about" exact component={() => <About />} />
          <Route path="/formsearch" exact component={() => <FormSearch />} />
          <Route path="/map/:lat/:lng" exact component={() => <CustomMap data={data} />} />
          <Route path="/" exact component={() => <Landing />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
