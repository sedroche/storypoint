import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import './App.css';

import NavBar from './NavBar';
import { Home } from './Home';
import { Session } from './Session';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/session/:id" component={Session} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
