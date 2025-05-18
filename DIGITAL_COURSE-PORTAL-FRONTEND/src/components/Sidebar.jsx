import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ user }) {
  const studentTabs = [
    { path: '/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/courses', icon: 'fas fa-book', label: 'Browse Courses' },
    { path: '/enrolled', icon: 'fas fa-clipboard-list', label: 'My Courses' },
    { path: '/profile', icon: 'fas fa-user', label: 'Profile' }
  ];

  const adminTabs = [
    { path: '/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/courses', icon: 'fas fa-book', label: 'Manage Courses' },
    { path: '/enrollments', icon: 'fas fa-clipboard-list', label: 'Enrollments' },
    { path: '/reports', icon: 'fas fa-chart-bar', label: 'Reports' }
  ];

  const tabs = user?.role === 'admin' ? adminTabs : studentTabs;

  return (
    <div className="sidebar col-md-3 col-lg-2 d-md-block p-3">
      <ul className="nav flex-column">
        {tabs.map(tab => (
          <li className="nav-item" key={tab.path}>
            <NavLink
              to={tab.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className={`${tab.icon} me-2`}></i>
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;