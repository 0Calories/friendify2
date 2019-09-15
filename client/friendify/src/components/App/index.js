import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from '../Home'
import UserAr from '../UserAr'
import QRCode from '../QRCode'

import './App.css';

class App extends Component {

  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/ar/:id" component={UserAr}></Route>
          <Route path="/qrcode/:id" component={QRCode}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
