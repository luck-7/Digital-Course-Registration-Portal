import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bootstrap from 'bootstrap';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage || 'Invalid username or password');
        return;
      }

      // Parse the response to get the JWT token and user data
      const data = await response.json();
      console.log('Login response:', data); // Log the response for debugging

      // Log detailed information about the response structure
      console.log('Login response details:', {
        hasToken: !!data.token,
        hasUser: !!data.user,
        responseKeys: Object.keys(data),
        responseType: typeof data
      });

      // Store the JWT token in localStorage if available
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else if (typeof data === 'string' && data.startsWith('ey')) {
        // If the response is just the token string
        localStorage.setItem('token', data);
      } else {
        console.warn('No token received in login response');
      }

      // Prepare user data - the structure depends on the backend response
      const userData = data.user || data;

      // Show success message in the form before closing modal
      setError('');
      const successDiv = document.createElement('div');
      successDiv.className = 'alert alert-success';
      successDiv.textContent = 'Login successful! Redirecting to dashboard...';
      document.querySelector('.modal-body form').appendChild(successDiv);

      // Give the user a moment to see the success message before closing the modal
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove focus from any form elements before closing the modal
      document.activeElement.blur();

      // Call the login callback with user data
      // Pass userData instead of raw data to ensure consistent structure
      onLogin && onLogin(userData);

      // Close the modal properly
      const modalElement = document.getElementById('loginModal');
      const modal = bootstrap.Modal.getInstance(modalElement);

      if (modal) {
        // Properly hide the modal
        modal.hide();

        // Remove the backdrop manually if needed
        setTimeout(() => {
          document.querySelector('.modal-backdrop')?.remove();
        }, 300);
      }

      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    // Focus the username input when the modal opens
    const handleModalShown = () => {
      document.getElementById('login-username')?.focus();
    };

    const modalElement = document.getElementById('loginModal');
    modalElement?.addEventListener('shown.bs.modal', handleModalShown);

    return () => {
      try {
        // Remove the event listener
        modalElement?.removeEventListener('shown.bs.modal', handleModalShown);

        // Ensure no element inside the modal has focus before hiding
        if (document.activeElement && modalElement?.contains(document.activeElement)) {
          document.activeElement.blur();
        }

        // Properly close the modal
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
          // Remove backdrop after a short delay
          setTimeout(() => {
            document.querySelector('.modal-backdrop')?.remove();
          }, 300);
        }
      } catch (error) {
        console.error('Error cleaning up login modal:', error);
      }
    };
  }, []);

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="login-username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="login-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
