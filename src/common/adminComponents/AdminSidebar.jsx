import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li><Link to="application">ManageApplications</Link></li>
        <li><Link to="drives">ManageDrives</Link></li>
        <li><Link to="student">ManageStudent</Link></li>
        <li><Link to="report">Reports</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

