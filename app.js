// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BarChart from './components/BarChart';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/barchart">
          <BarChart />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;