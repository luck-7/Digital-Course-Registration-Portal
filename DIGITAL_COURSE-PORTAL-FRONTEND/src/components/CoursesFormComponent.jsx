import React, { useState } from 'react';


function CourseForm({ course, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    course || {
      title: '',
      description: '',
      instructor: '',
      department: 'Computer Science',
      capacity: 30,
      enrolled: 0,
      image: ''
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{course ? 'Edit Course' : 'Add New Course'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              className="form-control" 
              id="description" 
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="instructor" className="form-label">Instructor</label>
            <input 
              type="text" 
              className="form-control" 
              id="instructor" 
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <select 
              className="form-select" 
              id="department" 
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
            </select>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="capacity" className="form-label">Capacity</label>
              <input 
                type="number" 
                className="form-control" 
                id="capacity" 
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="enrolled" className="form-label">Currently Enrolled</label>
              <input 
                type="number" 
                className="form-control" 
                id="enrolled" 
                name="enrolled"
                min="0"
                max={formData.capacity}
                value={formData.enrolled}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image URL</label>
            <input 
              type="url" 
              className="form-control" 
              id="image" 
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-outline-secondary me-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;