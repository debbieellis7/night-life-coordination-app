import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ''
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false })
    }
  }

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
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  }


  render() {
    const { errors, data, loading } = this.state;

    return (
      <Grid textAlign='center' style={{ height: '100%', marginTop: '50px' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            <Image src='/images/logo.png' /> Forgot Password
          </Header>
          <Form onSubmit={this.onSubmit} loading={loading} size='large'>
            <Segment stacked>
              {
                Object.keys(errors).length > 0 && (
                  <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.global}</p>
                    <p>{errors.email}</p>
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
              <Button color='blue' fluid size='large'>Submit</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}


const mapStateToProps = state => ({
  errors: state.auth.errors
})

export default connect(mapStateToProps, {})(ForgotPasswordForm);