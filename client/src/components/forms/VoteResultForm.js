import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Modal } from 'semantic-ui-react';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { withRouter } from 'react-router-dom';
import { voteLike, getVotes, unLike, updateVoteLike } from '../../actions/businessAction';

class VoteResultForm extends Component {

  state = {
    showModal: false,
    showModalConfirm: false,
  }

  onClickVote = (e, ) => {
    e.preventDefault();
    const { isAuthenticated, isConfirmed, businessID, userEmail } = this.props;
    if (isAuthenticated && isConfirmed) {
      const { votes } = this.props;
      if (votes.filter(item => item.businessID === businessID).length > 0) {
        let voteChecker = votes.filter(item => item.businessID === businessID)

        let checkEmail = voteChecker[0].likes.filter(item => item.userEmail === userEmail);
        let toCheckEmail;

        if (checkEmail.length > 0) {
          toCheckEmail = checkEmail[0].userEmail;
        }

        if (toCheckEmail !== undefined && toCheckEmail === userEmail) {
          // Unlike
          this.props.unLike(userEmail, businessID);
        } else {
          // Like
          this.props.updateVoteLike(userEmail, businessID)
        }

      } else {
        // Like
        this.props.voteLike(userEmail, businessID)
      }
    } else if (isAuthenticated && isConfirmed === false) {
      this.setState({ showModalConfirm: true })
    } else {
      this.setState({ showModal: true })
    }
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {

    // Show Total Vote numbers
    let voteValue = this.props.votes.filter(item => item.businessID === this.props.businessID)
    let b = voteValue.map(item => item.likes.length);

    // Change Button Color
    let c = [];
    if (voteValue.length > 0) {
      let likesValue = voteValue[0];
      c = likesValue.likes.filter(item => item.userEmail === this.props.userEmail)
    }


    return (
      <React.Fragment>
        <div className="ui labeled button" onClick={this.onClickVote}>
          <button className={c.length > 0 ? "ui blue button" : "ui basic blue button"}>
            <i className="thumbs up outline icon"></i> Going
            </button>
          <div className="ui basic left pointing blue label">
            {b[0] ? b[0] : "0"}
          </div>
        </div>
        <Modal className="confirmEmailMessage" size="tiny" open={this.state.showModalConfirm} onClose={() => this.setState({ showModalConfirm: false })} closeIcon>
          <Header content='Night Life Coordination App' />
          <Modal.Content>
            <ConfirmEmailMessage />
          </Modal.Content>
          <Modal.Actions>

          </Modal.Actions>
        </Modal>
        <Modal size="tiny" open={this.state.showModal} onClose={this.closeModal} closeIcon>
          <Header content='Night Life Coordination App' />
          <Modal.Content>
            <p>
              Log-in to your account to vote
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='blue' onClick={() => this.props.history.push('/login')}>
              Login
            </Button>
            <Button color='blue' onClick={() => this.props.history.push('/signup')}>
              Signup
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  userID: state.auth.user.userId,
  userEmail: state.auth.user.email,
  isAuthenticated: !!state.auth.user.email,
  isConfirmed: !!state.auth.user.confirmed,
  votes: state.searchResult.votes
})

export default connect(mapStateToProps, { voteLike, getVotes, unLike, updateVoteLike })(withRouter(VoteResultForm));