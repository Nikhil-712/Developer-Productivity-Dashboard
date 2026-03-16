import React from 'react';

function QuickAddButton({ onClick }) {
  return (
    <button
      type="button"
      className="quick-add-button"
      onClick={onClick}
      aria-label="Quick add task"
    >
      +
    </button>
  );
}

export default QuickAddButton;
