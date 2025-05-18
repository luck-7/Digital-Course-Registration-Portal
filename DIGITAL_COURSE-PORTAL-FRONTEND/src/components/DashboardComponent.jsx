
import { useNavigate } from 'react-router-dom';
import { getEnrolledCourses } from './data';

function Dashboard({ user }) {
  const enrolledCourses = getEnrolledCourses(user.id);
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h2 className="mb-4">Welcome back, {user.name}</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">My Courses</h5>
              {enrolledCourses.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {enrolledCourses.map(course => (
                    <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {course.title}
                      <span className="badge bg-primary">{course.department}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">You are not enrolled in any courses yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/courses')}
                >
                  <i className="fas fa-book me-2"></i> Browse Courses
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => navigate('/enrolled')}
                >
                  <i className="fas fa-user-graduate me-2"></i> View Academic Progress
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={() => alert('Academic Calendar not implemented yet')}
                >
                  <i className="fas fa-calendar-alt me-2"></i> View Academic Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Announcements</h5>
          <div className="alert alert-info">
            <strong>Registration Deadline:</strong> Course registration for Fall 2025 closes on August 25th.
          </div>
          <div className="alert alert-warning">
            <strong>System Maintenance:</strong> The portal will be unavailable on August 15th from 2:00 AM to 4:00 AM for scheduled maintenance.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;