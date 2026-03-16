import React, { useState } from 'react';

function EditTask({ task, onSave, onCancel }) {
  const [text, setText] = useState(task.text || '');
  const [priority, setPriority] = useState(task.priority || 'Medium');
  const [category, setCategory] = useState(task.category || 'Other');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(task.tags) && task.tags.length ? task.tags.join(', ') : ''
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSave({
      ...task,
      text: text.trim(),
      priority,
      category,
      dueDate,
      tags,
    });
  };

  return (
    <form className="edit-task" onSubmit={handleSubmit}>
      <div className="edit-task-main-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Update task title"
        />
      </div>
      <div className="edit-task-meta-row">
        <div className="field-group">
          <label htmlFor={`edit-priority-${task.id}`}>Priority</label>
          <select
            id={`edit-priority-${task.id}`}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor={`edit-category-${task.id}`}>Category</label>
          <select
            id={`edit-category-${task.id}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Development">Development</option>
            <option value="Bug Fix">Bug Fix</option>
            <option value="Deployment">Deployment</option>
            <option value="Documentation">Documentation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor={`edit-due-${task.id}`}>Due date</label>
          <input
            id={`edit-due-${task.id}`}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor={`edit-tags-${task.id}`}>Tags (comma separated)</label>
          <input
            id={`edit-tags-${task.id}`}
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="DevOps, Deployment"
          />
        </div>
      </div>
      <div className="edit-task-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-button">
          Save
        </button>
      </div>
    </form>
  );
}

export default EditTask;
