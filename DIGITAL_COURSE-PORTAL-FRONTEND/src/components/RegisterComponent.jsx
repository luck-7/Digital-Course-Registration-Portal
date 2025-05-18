import { useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';

function RegisterForm({ onRegister, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name, email, department }),
      });

      if (response.ok) {
        const user = await response.json();

        // Show success message in the form before closing modal
        setLocalError('');
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = 'Registration successful!';
        document.querySelector('.modal-body form').appendChild(successDiv);

        // Remove focus from any form elements
        document.activeElement.blur();

        // Give the user a moment to see the success message
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Pass the registered user to App.jsx
        onRegister(user);
      } else {
        const errorText = await response.text();
        setLocalError(errorText || 'Registration failed');
      }
    } catch (err) {
      setLocalError('Error connecting to server');
      console.error('Registration error:', err);
    }
  };

  // Modal management and cleanup
  useEffect(() => {
    // Focus the username input when the modal opens
    const handleModalShown = () => {
      document.getElementById('username')?.focus();
    };

    const modalElement = document.getElementById('registerModal');
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
        console.error('Error cleaning up register modal:', error);
      }
    };
  }, []);

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registerModalLabel">Register</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <select
                  className="form-select"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>
              {(error || localError) && (
                <div className="alert alert-danger">{error || localError}</div>
              )}
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;