import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function ProtectedRoute({ user }) {
  if (!user) {
    // If not authenticated, redirect to landing page
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the layout with sidebar and outlet for nested routes
  return (
    <div className="d-flex flex-grow-1">
      <Sidebar user={user} />
      <div className="main-content flex-grow-1" style={{ zIndex: 1, position: 'relative' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedRoute;
