import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />}
  />
)



const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.user.token
})

export default connect(mapStateToProps, {})(GuestRoute);