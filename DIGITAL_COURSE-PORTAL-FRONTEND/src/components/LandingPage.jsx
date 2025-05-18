import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="text-center">
        <h1 className="display-4 mb-4">
          <i className="fas fa-graduation-cap me-2"></i>
          Course Registration Portal
        </h1>
        <p className="lead mb-4">Please login or register to access the course portal</p>
        <div>
          <button
            className="btn btn-primary btn-lg me-3"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            <i className="fas fa-sign-in-alt me-2"></i> Login
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            <i className="fas fa-user-plus me-2"></i> Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
