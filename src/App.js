import React from 'react';
import { BrowserRouter, Link, NavLink, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ABTesting from './components/ABTestFramework';
import AddCountry from './components/NewCountry';


import './App.css';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ABTesting} />

          <Route path="/add-country" component={AddCountry} />
        </Switch>
      </div>
    </BrowserRouter>



  );
}

export default App;
