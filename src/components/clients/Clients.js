import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Clients extends Component {
  render() {
    const clients = [
      {
        id: '11111',
        firstName: 'Karen',
        lastName: 'Smith',
        email: 'karen@email.com',
        phone: '404.123.1234',
        balance: '100'
      },
      {
        id: '22222',
        firstName: 'Kay',
        lastName: 'Smith',
        email: 'k@email.com',
        phone: '604.123.1234',
        balance: '1100'
      },
      {
        id: '33333',
        firstName: 'Karma',
        lastName: 'Smith',
        email: 'karemail.com',
        phone: '704.123.1234',
        balance: '1000'
      }
    ];

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fa fa-user" /> Clients
              </h2>
            </div>
            <div className="col-md-6">...</div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.balance}</td>
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
      );
    } else {
      return <h1>Loading ...</h1>;
    }
  }
}

export default Clients;
