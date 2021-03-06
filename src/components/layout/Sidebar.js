import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Link to="/client/add" className="btn btn-secondary float-right mr-3">
      <i className="fa fa-plus" /> New Client
    </Link>
  );
};

export default Sidebar;
