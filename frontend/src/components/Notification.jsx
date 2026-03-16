import React from 'react';

function Notification({ message }) {
  if (!message) return null;

  return (
    <div className="notification" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default Notification;
