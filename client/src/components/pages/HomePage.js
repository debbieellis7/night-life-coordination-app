import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import InlineError from "../messages/InlineError";
import { fetchBusinesses, getVotes } from '../../actions/businessAction';
import VoteResultForm from '../forms/VoteResultForm';

class HomePage extends Component {
  state = {
    data: {
      query: ''
    },
    loading: false,
    errors: {},
    thebusinessList: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.businessList) {
      this.setState({ thebusinessList: nextProps.businessList, loading: false });
    }
    if (Object.keys(nextProps.searchError).length > 0) {
      this.setState({ loading: false, errors: nextProps.searchError });
    }

  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const theQuery = this.state.data.query;
      if (!this.state.data.query) return;
      this.setState({ thebusinessList: [], loading: true });
      this.props.fetchBusinesses(theQuery);
      this.props.getVotes();
    }
  };

  validate = data => {
    const errors = {};
    if (!data.query) errors.query = "Can't be blank";
    return errors;
  };

  render() {
    const { thebusinessList } = this.state;

    return (
      <div className="ui center aligned container">
        <div className="marginTop40">
          <h1 className="mt-2">Plans Tonight?</h1>
          <h3>See which bars are hoppin' tonight and RSVP ahead of time!</h3>
          <h3>Search for a city and start your city night.</h3>
          <div>
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.onSubmit} >
              <div className="ui left icon action input eight wide field searchDiv">
                <i className="search icon"></i>
                <input type="text" id="query" name="query" placeholder="Where You At?" value={this.state.data.query} onChange={this.onChange} />
                <button className="ui blue button">Search</button>
              </div>
            </form>
            <br />
            <div className="ui four cards searchResultMarginTop">
              {Object.keys(this.state.errors).length > 0 && (
                <div className="searchResultErrorText">
                  <InlineError text={this.state.errors.code} />
                  <br />
                  <InlineError text={this.state.errors.description} />
                </div>
              )}
              {thebusinessList.map((item, index) => (
                <div className="ui card" key={index}>
                  <div className="image">
                    <a href={item.url} target="_blank" rel="noopener noreferrer"><img src={item.image_url} alt="Business cover" className="searchImageSize" /></a>
                  </div>
                  <div className="content">
                    <div className="header"><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></div>
                  </div>
                  <div className="extra content">
                    <VoteResultForm businessID={item.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.user.token,
  businessList: state.searchResult.businessList,
  searchError: state.searchResult.errors
})


export default connect(mapStateToProps, { fetchBusinesses, getVotes })(HomePage);