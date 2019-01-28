import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { Grid, Message } from 'semantic-ui-react';
import { resetPasswordRequest } from '../../actions/auth';

class ForgotPasswordPage extends Component {
  state = {
    success: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ success: true })
    }
  }

  submit = data => {
    this.props.resetPasswordRequest(data)
  }

  render() {
    return (
      <div className='forgotpassword-form'>
        {this.state.success ? (
          <Grid textAlign='center' style={{ height: '100%', marginTop: '50px' }} verticalAlign='middle'>
            <Message>Email has been sent.</Message>
          </Grid>
        ) : (
            <ForgotPasswordForm submit={this.submit} />
          )}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  success: !!state.auth.success
})

export default connect(mapStateToProps, { resetPasswordRequest })(ForgotPasswordPage);