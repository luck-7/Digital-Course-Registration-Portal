import React from 'react';
import CourseCard from './CourseCard';

function CourseList({ courses, user, onEnroll, onDrop, searchTerm, setSearchTerm, departmentFilter, setDepartmentFilter }) {
  const departments = [...new Set(courses.map(course => course.department))];
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || course.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <div className="row g-3">
          <div className="col-md-8">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search courses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select 
              className="form-select filter-dropdown"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        filteredCourses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            user={user}
            onEnroll={onEnroll}
            onDrop={onDrop}
          />
        ))
      ) : (
        <div className="col-12">
          <div className="alert alert-info">
            No courses found matching your criteria.
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseList;