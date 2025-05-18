
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginComponent';
import RegisterForm from './components/RegisterComponent';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import Dashboard from './components/DashboardComponent';
import AdminPanel from './components/AdminPanelComponent';
import CourseList from './components/CourseList';
import CourseCard from './components/CourseCard';
import EnrollmentList from './components/EnrollmentListComponent';
import Profile from './components/Profile';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import { mockCourses, mockEnrollments, getEnrolledCourses, isEnrolled } from './components/data';

function App() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(mockCourses);
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  const clearToast = () => {
    setToastMessage('');
  };

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle login with JWT authentication
  const handleLogin = async (data) => {
    try {
      // Check if we have the expected data structure
      if (!data) {
        throw new Error('No data received from login');
      }

      // Extract user data from the response
      // The backend might return user data directly or nested in a user property
      const userData = data.user || data;

      // Log the user data for debugging
      console.log('Processing user data in App.js:', userData);

      // For development/testing: If we don't have a proper user object with an ID,
      // create a mock user object to allow testing the UI
      const userObj = userData && userData.username ? userData : {
        // Mock user data for development/testing
        id: 1,
        username: userData?.username || 'testuser',
        name: userData?.name || 'Test User',
        email: userData?.email || 'test@example.com',
        department: userData?.department || 'Computer Science',
        role: 'student'
      };

      // Update user state with either the real user data or our mock data
      setUser({
        id: userObj.id || 1, // Fallback ID if none provided
        username: userObj.username,
        name: userObj.name || userObj.username, // Fallback to username if name is not provided
        email: userObj.email || '',
        department: userObj.department || '',
        role: (userObj.role || 'student').toLowerCase(), // Default to student if role is not provided
      });

      setLoginError('');

      // Save user to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userObj));

      // Show success toast notification for successful login
      showToast(`Login successful! Welcome back, ${userObj.name || 'User'}!`, 'success');

      // Close login modal
      try {
        const modalElement = document.getElementById('loginModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
          }
        }
      } catch (error) {
        console.error('Error closing login modal:', error);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Network error. Please try again.');
    }
  };

  const handleRegister = (user) => {
    setUser({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      department: user.department,
      role: user.role.toLowerCase(),
    });

    // Do not set active tab to dashboard after registration
    // Let the user explore the landing page first

    setRegisterError('');
    localStorage.setItem('user', JSON.stringify(user));

    // Show success toast
    showToast(`Account created successfully. Welcome, ${user.name}!`, 'success');

    try {
      const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      if (modal) {
        modal.hide();
        document.querySelector('.modal-backdrop')?.remove();
      }
    } catch (error) {
      console.error('Error closing register modal:', error);
    }
  };

  const handleLogout = () => {
    // Show success toast before clearing user
    showToast('Logged out successfully', 'success');

    setUser(null);
    localStorage.removeItem('user');
  };

  const handleEnroll = (courseId) => {
    if (isEnrolled(user.id, courseId)) return;

    const course = courses.find((c) => c.id === courseId);
    if (course.enrolled >= course.capacity) return;

    const newEnrollment = {
      id: enrollments.length + 1,
      studentId: user.id,
      courseId,
      enrollmentDate: new Date().toISOString().split('T')[0],
    };

    setEnrollments([...enrollments, newEnrollment]);
    setCourses(
      courses.map((c) => (c.id === courseId ? { ...c, enrolled: c.enrolled + 1 } : c))
    );

    // Show success toast
    showToast(`Successfully enrolled in ${course.title}`, 'success');
  };

  const handleDrop = (courseId) => {
    const updatedEnrollments = enrollments.filter(
      (e) => !(e.studentId === user.id && e.courseId === courseId)
    );

    // Get course name for the message
    const course = courses.find((c) => c.id === courseId);

    setEnrollments(updatedEnrollments);
    setCourses(
      courses.map((c) => (c.id === courseId ? { ...c, enrolled: c.enrolled - 1 } : c))
    );

    // Show success toast
    showToast(`Successfully dropped ${course.title}`, 'success');
  };

  const handleAddCourse = (courseData) => {
    const newCourse = {
      id: courses.length + 1,
      ...courseData,
      enrolled: 0,
    };

    setCourses([...courses, newCourse]);

    // Show success toast
    showToast(`Course "${courseData.title}" added successfully`, 'success');
  };

  const handleUpdateCourse = (courseId, courseData) => {
    setCourses(
      courses.map((c) => (c.id === courseId ? { ...courseData, id: courseId } : c))
    );

    // Show success toast
    showToast(`Course "${courseData.title}" updated successfully`, 'success');
  };

  const handleDeleteCourse = (courseId) => {
    // Get course name for the message
    const course = courses.find((c) => c.id === courseId);

    const updatedEnrollments = enrollments.filter((e) => e.courseId !== courseId);
    setEnrollments(updatedEnrollments);
    setCourses(courses.filter((c) => c.id !== courseId));

    // Show success toast
    showToast(`Course "${course.title}" deleted successfully`, 'success');
  };

  const handleUpdateProfile = (profileData) => {
    setUser({ ...user, ...profileData });
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Show success toast
    showToast('Profile updated successfully', 'success');
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={handleLogout} />

        <LoginForm onLogin={handleLogin} error={loginError} />
        <RegisterForm onRegister={handleRegister} error={registerError} />

        {/* Toast notification */}
        <ToastNotification
          message={toastMessage}
          type={toastType}
          onClose={clearToast}
        />

        <Routes>
          {/* Public route - Landing page */}
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/dashboard" element={<Dashboard user={user} />} />

            <Route
              path="/courses"
              element={
                user?.role === 'admin' ? (
                  <AdminPanel
                    courses={courses}
                    onAddCourse={handleAddCourse}
                    onUpdateCourse={handleUpdateCourse}
                    onDeleteCourse={handleDeleteCourse}
                  />
                ) : (
                  <CourseList
                    courses={courses}
                    user={user}
                    onEnroll={handleEnroll}
                    onDrop={handleDrop}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    departmentFilter={departmentFilter}
                    setDepartmentFilter={setDepartmentFilter}
                  />
                )
              }
            />

            <Route
              path="/enrolled"
              element={
                user?.role === 'student' ? (
                  <div className="container py-4">
                    <h2 className="mb-4">My Enrolled Courses</h2>
                    {getEnrolledCourses(user.id).length > 0 ? (
                      <div className="row">
                        {getEnrolledCourses(user.id).map((course) => (
                          <CourseCard
                            key={course.id}
                            course={course}
                            user={user}
                            onEnroll={handleEnroll}
                            onDrop={handleDrop}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="alert alert-info">You are not enrolled in any courses yet.</div>
                    )}
                  </div>
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />

            <Route
              path="/enrollments"
              element={
                user?.role === 'admin' ? (
                  <EnrollmentList enrollments={enrollments} courses={courses} users={[]} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />

            <Route path="/profile" element={<Profile user={user} onUpdateProfile={handleUpdateProfile} />} />

            {/* Redirect any other path to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
