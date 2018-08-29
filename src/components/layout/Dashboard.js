import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layout/Sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 clients-box">
        <Sidebar />

        <Clients />
      </div>
    </div>
  );
};

export default Dashboard;
