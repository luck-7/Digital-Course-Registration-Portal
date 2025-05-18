import React from 'react';

function EnrollmentList({ enrollments, courses, users }) {
    const getCourse = (courseId) => {
        return courses.find(course => course.id === courseId);
    };
    
    const getStudent = (studentId) => {
        return users.find(user => user.id === studentId);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Enrollment Management</h2>
                <button className="btn btn-outline-primary">
                    <i className="fas fa-download me-1"></i> Export to CSV
                </button>
            </div>
            
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Department</th>
                            <th>Instructor</th>
                            <th>Enrollment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map(enrollment => {
                            const course = getCourse(enrollment.courseId);
                            const student = getStudent(enrollment.studentId);
                            
                            return (
                                <tr key={enrollment.id}>
                                    <td>
                                        {student && (
                                            <>
                                                <img 
                                                    src={`https://i.pravatar.cc/150?img=${student.id}`} 
                                                    className="profile-pic me-2" 
                                                    alt="Student" 
                                                />
                                                {student.name}
                                            </>
                                        )}
                                    </td>
                                    <td>{course?.title || 'Unknown Course'}</td>
                                    <td>{course?.department || 'N/A'}</td>
                                    <td>{course?.instructor || 'N/A'}</td>
                                    <td>{enrollment.enrollmentDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EnrollmentList;