import React from 'react';

import { isEnrolled }  from './data';

function CourseCard({ course, user, onEnroll, onDrop }) {
  const enrolled = user && isEnrolled(user.id, course.id);
  const capacityPercentage = (course.enrolled / course.capacity) * 100;
  const capacityColor = capacityPercentage >= 90 ? 'bg-danger' : capacityPercentage >= 75 ? 'bg-warning' : 'bg-success';

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100">
        {enrolled && (
          <span className="enrolled-badge badge rounded-pill">
            <i className="fas fa-check me-1"></i> Enrolled
          </span>
        )}
        <img src={course.image} className="card-img-top course-img" alt={course.title} />
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text text-muted">{course.instructor}</p>
          <p className="card-text">{course.description}</p>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-primary">{course.department}</span>
            <small className="text-muted">{course.enrolled}/{course.capacity} students</small>
          </div>
          <div className="progress mb-3">
            <div 
              className={`progress-bar ${capacityColor}`} 
              role="progressbar" 
              style={{ width: `${capacityPercentage}%` }}
              aria-valuenow={course.enrolled}
              aria-valuemin="0"
              aria-valuemax={course.capacity}
            ></div>
          </div>
          {user && user.role === 'student' && (
            enrolled ? (
              <button 
                className="btn btn-outline-danger w-100"
                onClick={() => onDrop(course.id)}
              >
                <i className="fas fa-times me-1"></i> Drop Course
              </button>
            ) : (
              <button 
                className="btn btn-primary w-100"
                onClick={() => onEnroll(course.id)}
                disabled={course.enrolled >= course.capacity}
              >
                {course.enrolled >= course.capacity ? (
                  'Course Full'
                ) : (
                  <>
                    <i className="fas fa-plus me-1"></i> Enroll
                  </>
                )}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;