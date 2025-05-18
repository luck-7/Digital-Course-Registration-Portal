import React, { useState } from 'react';


function AdminPanel({ courses, onAddCourse, onUpdateCourse, onDeleteCourse }) {
  const [showForm, setShowForm] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  
  const handleEdit = (course) => {
    setCurrentCourse(course);
    setShowForm(true);
  };
  
  const handleAddNew = () => {
    setCurrentCourse(null);
    setShowForm(true);
  };
  
  const handleSubmit = (courseData) => {
    if (currentCourse) {
      onUpdateCourse(currentCourse.id, courseData);
    } else {
      onAddCourse(courseData);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Course Management</h2>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="fas fa-plus me-1"></i> Add New Course
        </button>
      </div>
      
      {showForm && (
        <CourseForm 
          course={currentCourse} 
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Department</th>
              <th>Capacity</th>
              <th>Enrolled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.instructor}</td>
                <td>{course.department}</td>
                <td>{course.capacity}</td>
                <td>{course.enrolled}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(course)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDeleteCourse(course.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;