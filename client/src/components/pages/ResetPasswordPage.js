import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Message } from 'semantic-ui-react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { validateToken, resetPassword } from '../../actions/auth';

class ResetPasswordPage extends Component {
  state = {
    loading: true,
    success: false
  }

  componentDidMount() {
    this.props.validateToken(this.props.match.params.token)
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.authsuccess) {
      this.setState({ loading: false, success: true })
    }

    if (nextProps.autherrors === true) {
      this.setState({ loading: false, success: false })
    }

    if (nextProps.setPassword) {
      this.props.history.push('/login');
    }
  }

  submit = data => {
    this.props.resetPassword(data)
  }

  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;

    return (
      <div className="resetpassword-form">
        {loading && (
          <Grid textAlign='center' style={{ height: '100%', marginTop: '50px' }} verticalAlign='middle'>
            <Message>Loading</Message>
          </Grid>
        )}
        {!loading && success && <ResetPasswordForm submit={this.submit} token={token} />}
        {!loading && !success && (
          <Grid textAlign='center' style={{ height: '100%', marginTop: '50px' }} verticalAlign='middle'>
            <Message>Invalid Token</Message>
          </Grid>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authsuccess: state.auth.success,
  autherrors: state.auth.errors,
  setPassword: !!state.auth.resetPassword
})

export default connect(mapStateToProps, { validateToken, resetPassword })(ResetPasswordPage);