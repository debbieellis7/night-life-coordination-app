import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { comfirm } from '../../actions/auth';


class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props.comfirm(this.props.match.params.token)

    if (this.props.isAuthenticated) {
      this.setState({ loading: false, success: true })
    } else {
      this.setState({ loading: false, success: false })
    }
    if (this.props.confirmed) {
      this.setState({ loading: false, success: false })
    }
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div className="ui center aligned container">
        {loading && <Message icon>
          <Icon name="circle notched" loading />
          <Message.Header>Validating your email</Message.Header>
        </Message>}

        {!loading && success && <Message success icon>
          <Icon name="checkmark" />
          <Message.Content>
            <Message.Header>Thank you. Your account has been verified.</Message.Header>
            <Link to="/dashboard">Go to your dashboard</Link>
          </Message.Content>
        </Message>}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Ooops. Invalid token it seems.</Message.Header>
              </Message.Content>
            </Message>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.user.token,
  confirmed: !!state.auth.user.confirmed
})

export default connect(mapStateToProps, { comfirm })(ConfirmationPage);