import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

export class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;
    const { firestore, history } = this.props;

    //If no balance, make 0
    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div className=" animated bounceInLeft">
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link text-secondary">
              <i className="fa fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-secondary text-light">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                name="firstName"
                minLength="2"
                placeholder="First Name"
                required
                onChange={this.onChange}
                value={this.state.firstName}
              />
              <input
                type="text"
                className="form-control mb-2"
                name="lastName"
                minLength="2"
                placeholder="Last Name"
                required
                onChange={this.onChange}
                value={this.state.lastName}
              />
              <input
                type="email"
                className="form-control mb-2"
                name="email"
                minLength="2"
                placeholder="Email"
                onChange={this.onChange}
                value={this.state.email}
              />
              <input
                type="tel"
                className="form-control mb-2"
                name="phone"
                minLength="10"
                placeholder="Phone"
                onChange={this.onChange}
                value={this.state.phone}
              />
              <input
                type="text"
                className="form-control mb-2"
                name="balance"
                minLength="2"
                placeholder="Balance"
                onChange={this.onChange}
                value={this.state.balance}
                disabled={disableBalanceOnAdd}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-secondary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
