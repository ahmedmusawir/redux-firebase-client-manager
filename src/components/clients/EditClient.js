import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

export class EditClient extends Component {
  constructor(props) {
    super(props);
    //Create Refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    //Update Client
    const updateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value
    };

    //Update firestore
    firestore
      .update({ collection: 'clients', doc: client.id }, updateClient)
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
      return (
        <div>
          <h1>
            {client.firstName} {client.lastName}
          </h1>
          <div>
            <div className="row">
              <div className="col-md-6">
                <Link to="/" className="btn btn-link text-secondary">
                  <i className="fa fa-arrow-circle-left" /> Back To Dashboard
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="card-header bg-secondary text-light">
                Edit Client
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="firstName"
                    minLength="2"
                    placeholder="First Name"
                    required
                    defaultValue={client.firstName}
                    ref={this.firstNameInput}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="lastName"
                    minLength="2"
                    placeholder="Last Name"
                    required
                    defaultValue={client.lastName}
                    ref={this.lastNameInput}
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    minLength="2"
                    placeholder="Email"
                    defaultValue={client.email}
                    ref={this.emailInput}
                  />
                  <input
                    type="tel"
                    className="form-control mb-2"
                    name="phone"
                    minLength="10"
                    placeholder="Phone"
                    defaultValue={client.phone}
                    ref={this.phoneInput}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="balance"
                    minLength="2"
                    placeholder="Balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                    disabled={disableBalanceOnEdit}
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
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
