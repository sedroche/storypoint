import React from 'react';

import { UsernameInput } from './UsernameInput';

export class CreateSession extends React.Component {
  componentDidMount() {
    // get session id
    fetch(process.env.REACT_APP_API_HOST + "/session")
    .then((res) => res.json())
    .then((response) => this.setState({sessionId: response.id}));
  }

  componentWillUnmount() {
    // Prevent from redirecting twice to /session
    this.props.sessionStarted();
  }

  startSession = (userName) => {
    window.localStorage.setItem("userName", userName);
    this.props.redirectToSession(this.state.sessionId);
  };

  render() {
    return( 
      <div className="homepage">
        <header className="text-center">
          <h1> Start a New Storypoint Session </h1>
        </header>
        <UsernameInput submit={this.startSession} btnContext='Start Session' />
      </div>
    );
  }
}