import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'patternfly-react';

export class CreateSession extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pristine: true
    }
  }

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

  handleInputChange = (event) => {
    if (this.state.pristine) {
      this.setState({pristine: false});
    }
    if (event.target.value && event.target.value.trim()) {
      this.setState({userName: event.target.value});
    } else {
      this.setState({userName: null});
    }
  };

  startSession = () => {
    window.localStorage.setItem("userName", this.state.userName);
    this.props.redirectToSession(this.state.sessionId);
  };

  render() {
    return( 
      <div className="homepage">
        <header className="text-center">
          <h1> Start a New Storypoint Session </h1>
        </header>
        <div>
          <Form onSubmit={this.startSession}>
            <FormGroup controlId="userName" validationState={!this.state.pristine && !this.state.userName ? 'error': 'success'}>
              <ControlLabel>
                Username:
              </ControlLabel>
              <FormControl type="text" onChange={this.handleInputChange} />
              {(!this.state.userName && !this.state.pristine) && <HelpBlock> Username can't be empty </HelpBlock>}
            </FormGroup>
            <Button className="pull-right" bsStyle="primary" type="submit" value="Submit" disabled={this.state.userName && !this.state.pristine ? false : true}>
              Start Session
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}