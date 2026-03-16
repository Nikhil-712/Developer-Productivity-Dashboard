import React, { useState } from 'react';

function QuickAddModal({ isOpen, onClose, onQuickAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Development');

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    onQuickAdd({ text, priority, category });
    setText('');
    setPriority('Medium');
    setCategory('Development');
    onClose();
  };

  return (
    <div className="quick-add-backdrop" onClick={onClose}>
      <div
        className="quick-add-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>Quick Add Task</h2>
        <form onSubmit={handleSubmit} className="quick-add-form">
          <label className="field-group">
            <span>Task Title</span>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a task"
            />
          </label>

          <div className="quick-add-meta-row">
            <label className="field-group">
              <span>Priority</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>

            <label className="field-group">
              <span>Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Development">Development</option>
                <option value="Bug Fix">Bug Fix</option>
                <option value="Deployment">Deployment</option>
                <option value="Documentation">Documentation</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="quick-add-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuickAddModal;
