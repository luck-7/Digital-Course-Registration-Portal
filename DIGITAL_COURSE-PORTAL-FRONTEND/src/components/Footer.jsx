import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Course Registration Portal</h5>
            <p>A platform for students to discover and enroll in courses.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/home" className="text-white">Home</a></li>
              <li><a href="/courses" className="text-white">Courses</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-envelope me-2"></i> info@courseportal.edu</li>
              <li><i className="fas fa-phone me-2"></i> (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p className="mb-0">© 2025 Course Registration Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;