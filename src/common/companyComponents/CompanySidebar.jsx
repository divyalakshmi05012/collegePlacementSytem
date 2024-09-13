import React from 'react';
import { Link } from 'react-router-dom';

const CompanySidebar = () => {
  return (
    <div className="company-sidebar">
      <ul>
        <li><Link to="application">StudentApplications</Link></li>
        <li><Link to="job">JobPost</Link></li>
        <li><Link to="interview">InterviewSchedule</Link></li>
      </ul>
    </div>
  );
};

export default CompanySidebar;

