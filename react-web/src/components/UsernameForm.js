import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'patternfly-react';

export class UsernameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pristine: true
    }
  }

  handleInputChange = event => {
    if (this.state.pristine) {
      this.setState({pristine: false});
    }
    if (event.target.value && event.target.value.trim()) {
      this.setState({userName: event.target.value});
    } else {
      this.setState({userName: null});
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onFormComplete(this.state.userName);
  }

  render() {
    return( 
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="userName" validationState={!this.state.pristine && !this.state.userName ? 'error': 'success'}>
            <ControlLabel>
              Username:
            </ControlLabel>
            <FormControl type="text" onChange={this.handleInputChange} />
            {(!this.state.userName && !this.state.pristine) && <HelpBlock> Username can't be empty </HelpBlock>}
          </FormGroup>
          <Button className="pull-right" bsStyle="primary" type="submit" value="Submit" disabled={this.state.userName ? false : true}>
            {this.props.btnContext}
          </Button>
        </Form>
      </div>
    );
  }
}