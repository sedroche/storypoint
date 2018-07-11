import React from 'react';

import { UsernameInput } from './UsernameInput';

export class CreateSession extends React.Component {
  
  startSession = userName => {
    fetch(process.env.REACT_APP_API_HOST + "/session")
      .then(res => res.json())
      .then(response => {
        this.props.onSessionId({sessionId: response.id, userName: userName});
      })
  };

  render() {
    return( 
      <div className="homepage">
        <header className="text-center">
          <h1> Start a New Storypoint Session </h1>
        </header>
        <UsernameInput onFormComplete={this.startSession} btnContext='Start Session' />
      </div>
    );
  }
}