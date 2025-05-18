const mockCourses = [
  { id: 1, title: 'Introduction to Programming', description: 'Learn the basics of programming with Python', instructor: 'Dr. Smith', department: 'Computer Science', capacity: 30, enrolled: 25, image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67' },
  { id: 2, title: 'Data Structures', description: 'Understand fundamental data structures and algorithms', instructor: 'Prof. Johnson', department: 'Computer Science', capacity: 25, enrolled: 22, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97' },
  { id: 3, title: 'Calculus I', description: 'Introduction to differential and integral calculus', instructor: 'Dr. Williams', department: 'Mathematics', capacity: 40, enrolled: 35, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb' },
  { id: 4, title: 'Physics for Engineers', description: 'Fundamental physics concepts for engineering students', instructor: 'Prof. Brown', department: 'Physics', capacity: 35, enrolled: 30, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d' },
  { id: 5, title: 'Digital Design', description: 'Introduction to digital logic and circuit design', instructor: 'Dr. Davis', department: 'Electrical Engineering', capacity: 20, enrolled: 18, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d' },
  { id: 6, title: 'Database Systems', description: 'Learn about relational databases and SQL', instructor: 'Prof. Miller', department: 'Computer Science', capacity: 25, enrolled: 20, image: 'https://images.unsplash.com/photo-1547658719-da2b51169166' }
];

const mockEnrollments = [
  { id: 1, studentId: 1, courseId: 1, enrollmentDate: '2023-05-15' },
  { id: 2, studentId: 1, courseId: 2, enrollmentDate: '2023-05-16' }
];

const getEnrolledCourses = (studentId) => {
  const enrolledCourseIds = mockEnrollments
    .filter(enrollment => enrollment.studentId === studentId)
    .map(enrollment => enrollment.courseId);
  
  return mockCourses.filter(course => enrolledCourseIds.includes(course.id));
};

const isEnrolled = (studentId, courseId) => {
  return mockEnrollments.some(enrollment => 
    enrollment.studentId === studentId && enrollment.courseId === courseId
  );
};

export { mockCourses, mockEnrollments, getEnrolledCourses, isEnrolled };