import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Validator from 'validator';
import { withRouter } from 'react-router-dom';

import { login } from '../../actions/auth';

class LoginPage extends Component {

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
      this.props.login(this.state.data)
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%', marginTop: '50px' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              <Image src='/images/logo.png' /> Log-in to your account
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
                <Button color='blue' fluid size='large'>Login</Button>
              </Segment>
            </Form>

            <Segment stacked>
              <Button onClick={() => this.props.history.push('/signup')} color='blue' fluid size='large'>Sign Up</Button>
              <Button onClick={() => this.props.history.push('/forgot_password')} color='blue' fluid size='large' className="marginTop4">Forgot Password</Button>
            </Segment>
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

export default connect(mapStateToProps, { login })(withRouter(LoginPage));