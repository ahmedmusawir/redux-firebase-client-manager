import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layout/Sidebar';

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 clients-box">
        <Sidebar />
        <Clients />
      </div>
      {/* <div className="col-sm-12 col-md-2 btn-box">
      </div> */}
    </div>
  );
};

export default Dashboard;
