import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  const formatDueDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <li className="task-item">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? 'completed' : ''}>{task.text}</span>
      </label>
      <div className="task-meta">
        {task.priority && (
          <span
            className={`task-pill task-priority-${
              String(task.priority).toLowerCase() || 'medium'
            }`}
          >
            {task.priority} priority
          </span>
        )}
        {task.category && (
          <span className="task-pill task-category">{task.category}</span>
        )}
        {task.dueDate && (
          <span className="task-pill task-due-date">
            Due: {formatDueDate(task.dueDate)}
          </span>
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
