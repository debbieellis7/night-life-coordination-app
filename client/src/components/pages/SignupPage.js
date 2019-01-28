import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Validator from 'validator';
import { withRouter } from 'react-router-dom';

import { signup } from '../../actions/auth';

class SignupPage extends Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false })
    }
  }

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props.signup(this.state.data)
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid E-mail address";
    if (!data.password) errors.password = "Password can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div className='signup-form'>
        <Grid textAlign='center' style={{ height: '100%', marginTop: '50px' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              <Image src='/images/logo.png' /> Sign-up to your account
            </Header>
            <Form onSubmit={this.onSubmit} loading={loading} size='large'>
              <Segment stacked>
                {
                  Object.keys(errors).length > 0 && (
                    <Message negative>
                      <Message.Header>Something went wrong</Message.Header>
                      <p>{errors.global}</p>
                      <p>{errors.email}</p>
                      <p>{errors.password}</p>
                    </Message>
                  )
                }
                <Form.Input
                  error={!!errors.email}
                  fluid
                  icon="user"
                  iconPosition="left"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail address"
                  value={data.email}
                  onChange={this.onChange}
                />
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
                <Button color='blue' fluid size='large'>Submit</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.user.token,
  errors: state.auth.errors
})

export default connect(mapStateToProps, { signup })(withRouter(SignupPage));