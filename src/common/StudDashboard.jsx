import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function StudDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <div className='dashboard-header'>
        <h1>MyDashboard</h1>
        <button className='logout-button' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='flex-container'>
        <div className='left-container'>
          <Sidebar />
        </div>
        <div className='right-container'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default StudDashboard;
