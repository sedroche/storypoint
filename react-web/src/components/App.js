import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import './App.css';

import NavBar from './NavBar';
import { CreateSession } from './CreateSession';
import { Session } from './Session';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToSession: false
    }
  }

  redirectToSession = (sessionId) => {
    this.setState({redirectToSession: true, sessionId: sessionId});
  };

  sessionStarted = () => {
    this.setState({redirectToSession: false});
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          {this.state.redirectToSession && <Redirect to={`/session/${this.state.sessionId}`} />}
          <Route exact path="/" render={() => <CreateSession redirectToSession={this.redirectToSession} sessionStarted={this.sessionStarted} />} />
          <Route exact path="/session/:id" component={Session} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
