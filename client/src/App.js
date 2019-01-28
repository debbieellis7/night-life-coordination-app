import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';
import Footer from './components/navigation/Footer';


class App extends Component {
  render() {
    const { location, isAuthenticated } = this.props;
    return (
      <div className="App">
        {isAuthenticated && <TopNavigation />}
        <div className="mainContainer">
          <Route location={location} exact path="/" component={HomePage} />
          <Route location={location} exact path="/confirmation/:token" component={ConfirmationPage} />
          <GuestRoute location={location} exact path="/login" component={LoginPage} />
          <GuestRoute location={location} exact path="/signup" component={SignupPage} />
          <GuestRoute location={location} exact path="/forgot_password" component={ForgotPasswordPage} />
          <GuestRoute location={location} exact path="/reset_password/:token" component={ResetPasswordPage} />
          <UserRoute location={location} exact path="/dashboard" component={DashboardPage} />
        </div>
        {isAuthenticated ? <Footer /> : (
          <div className="marginTop50">
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.user.email
})

export default connect(mapStateToProps)(App);