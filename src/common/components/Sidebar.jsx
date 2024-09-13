import React from 'react';
import { Link, useParams} from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="application">Applications</Link></li>
        <li><Link to="interviews">Interview Schedule</Link></li>
        <li><Link to="jobs">JobList</Link></li>
        <li><Link to="apply">ApplicationForm</Link></li>
        <li><Link to="reports">Reports</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

