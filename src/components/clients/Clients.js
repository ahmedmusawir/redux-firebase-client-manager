import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

export class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      //Add Balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }
    return null;
  }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="page-title">
                <i className="fa fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              {/* <h5 className="text-right text-secondary"> */}
              <p className="total badge badge-light mx-auto">
                Total Owed:{' '}
                <span className="text-danger">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
          {/* FOR LARGE SCREENS */}
          <div className="d-none d-sm-block">
            <table className="table table-striped">
              <thead className="thead">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.email}</td>
                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fa fa-arrow-circle-right" /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* FOR MOBILE ONLY */}
          {clients.map(client => (
            <div className="card d-block d-sm-none mb-3" key={client.id}>
              <div className="card-header bg-secondary text-light">
                {client.firstName} {client.lastName}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong className="text-secondary">Email:</strong>{' '}
                  {client.email}
                </li>
                <li className="list-group-item">
                  <strong className="text-secondary">Balance:</strong> $
                  {parseFloat(client.balance).toFixed(2)}{' '}
                </li>
                <li className="list-group-item">
                  {' '}
                  <Link
                    to={`/client/${client.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa fa-arrow-circle-right" /> Details
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
