import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from '../Home'
import UserAr from '../UserAr'

import './App.css';

class App extends Component {

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/ar/:id" component={UserAr}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
