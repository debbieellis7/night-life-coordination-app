import React, { Component } from 'react';
import { Form, Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
    }
  }

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Password Can't be blank";
    if (!data.passwordConfirmation) errors.passwordConfirmation = "Confirm Password Can't be blank";
    if (data.password !== data.passwordConfirmation) errors.password = "Passwords must match";
    return errors;
  }


  render() {
    const { errors, data, loading } = this.state;

    return (
      <Grid textAlign='center' style={{ height: '100%', marginTop: '50px' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            <Image src='/images/logo.png' /> Reset password to your account
          </Header>
          <Form onSubmit={this.onSubmit} loading={loading}>
            <Segment stacked>
              {
                Object.keys(errors).length > 0 && (
                  <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.global}</p>
                    <p>{errors.password}</p>
                    <p>{errors.passwordConfirmation}</p>
                  </Message>
                )
              }
              <Form.Input
                error={!!errors.password}
                fluid
                icon="lock"
                iconPosition="left"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={this.onChange}
              />
              <Form.Input
                error={!!errors.passwordConfirmation}
                fluid
                icon="lock"
                iconPosition="left"
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Confirm password"
                value={data.passwordConfirmation}
                onChange={this.onChange}
              />

              <Button color='blue' fluid size='large'>Reset</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ResetPasswordForm;