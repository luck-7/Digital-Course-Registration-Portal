import { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';

function ToastNotification({ message, type = 'success', onClose }) {
  const [toast, setToast] = useState(null);
  
  useEffect(() => {
    if (message) {
      const toastEl = document.getElementById('toast-notification');
      const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
      setToast(bsToast);
      bsToast.show();
      
      // Auto-close after delay
      setTimeout(() => {
        onClose && onClose();
      }, 3500);
    }
  }, [message, onClose]);
  
  if (!message) return null;
  
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div 
        id="toast-notification" 
        className={`toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'}`}
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            {message}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto" 
            data-bs-dismiss="toast" 
            aria-label="Close"
            onClick={() => onClose && onClose()}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default ToastNotification;
