import React, { useState } from 'react';

function Profile({ user, onUpdateProfile }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setEditMode(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Profile</h2>
        {!editMode && (
          <button 
            className="btn btn-outline-primary"
            onClick={() => setEditMode(true)}
          >
            <i className="fas fa-edit me-1"></i> Edit Profile
          </button>
        )}
      </div>
      
      {editMode ? (
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-3 text-center">
                  <img 
                    src={`https://i.pravatar.cc/150?img=${user.id}`} 
                    className="img-thumbnail mb-3" 
                    alt="Profile" 
                    style={{ width: '150px', height: '150px' }}
                  />
                  <button className="btn btn-sm btn-outline-secondary w-100">
                    Change Photo
                  </button>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
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
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary me-2"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 text-center">
                <img 
                  src={`https://i.pravatar.cc/150?img=${user.id}`} 
                  className="img-thumbnail mb-3" 
                  alt="Profile" 
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <div className="col-md-9">
                <h4>{user.name}</h4>
                <p className="text-muted mb-1">
                  <i className="fas fa-envelope me-2"></i> {user.email}
                </p>
                <p className="text-muted mb-1">
                  <i className="fas fa-graduation-cap me-2"></i> {user.department}
                </p>
                <p className="text-muted mb-1">
                  <i className="fas fa-user-tag me-2"></i> {user.role === 'admin' ? 'Administrator' : 'Student'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;