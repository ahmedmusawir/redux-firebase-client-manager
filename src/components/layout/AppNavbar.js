import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

export class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutclick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-5">
        <Link to="/" className="navbar-brand">
          Client Panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto my-0">
            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          {isAuthenticated ? (
            <ul className="navbar-nav ml-auto my-0">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  {auth.email}
                </a>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={this.onLogoutclick}>
                  Logout
                </a>
              </li>
            </ul>
          ) : null}
          {allowRegistration && !isAuthenticated ? (
            <ul className="navbar-nav ml-auto my-0">
              <li className="nav-item mr-3">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);
