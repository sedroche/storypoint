import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'patternfly-react';

import { sessionSvc } from '../api/SessionSvc';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToSession: false,
      disableBtn: true,
      showErrMsg: false
    }
  }

  componentDidMount() {
    sessionSvc.getSessionID().then((sessionId) => {
      this.setState({sessionId: sessionId});
    });
  }

  handleInputChange = (event) => {
    if (event.target.value && event.target.value.trim()) {
      this.setState({disableBtn: false, 
                     userName: event.target.value, 
                     validationState: 'success', 
                     showErrMsg: false});
    } else {
      this.setState({disableBtn: true, validationState: 'error', showErrMsg: true});
    }
  };

  startSession = () => {
    this.setState({redirectToSession: true})
  };

  redirectToSession = () => {
    if (this.state.redirectToSession) {
      window.localStorage.setItem("userName", this.state.userName);
      return <Redirect to={`/session/${this.state.sessionId}`}/>
    }
  }

  render() {
    return( 
      <div className="homepage">
        {this.redirectToSession()}
        <header>
          <h1> Start a New Storypoint Session </h1>
        </header>
        <div className="col-md-12">
          <Form onSubmit={this.startSession}>
            <FormGroup controlId="userName" validationState={this.state.validationState}>
              <ControlLabel>
                Username:
              </ControlLabel>
              <FormControl type="text" onChange={this.handleInputChange} />
              {this.state.showErrMsg && <HelpBlock> Username can't be empty </HelpBlock>}
            </FormGroup>
            <Button className="startSessionBtn" bsStyle="primary" type="submit" value="Submit" disabled={this.state.disableBtn}>
              Start Session
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}