import React, { useMemo, useState } from 'react';
import EditTask from './EditTask.jsx';

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

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

  const isOverdue = useMemo(() => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    if (Number.isNaN(due.getTime())) return false;
    return due < today;
  }, [task.dueDate, task.completed]);

  const getDeadlineText = () => {
    if (!task.dueDate) return '';
    const now = new Date();
    const due = new Date(task.dueDate);
    if (Number.isNaN(due.getTime())) return '';

    const diffMs = due.getTime() - now.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs === 0) return 'Due today';

    if (diffMs > 0) {
      if (Math.abs(diffHours) < 24) {
        return `Due in ${diffHours} hour${diffHours === 1 ? '' : 's'}`;
      }
      return `Due in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
    }

    const overdueHours = Math.abs(diffHours);
    const overdueDays = Math.abs(diffDays);

    if (overdueHours < 24) {
      return `Overdue by ${overdueHours} hour${overdueHours === 1 ? '' : 's'}`;
    }
    return `Overdue by ${overdueDays} day${overdueDays === 1 ? '' : 's'}`;
  };

  const handleSave = (updated) => {
    onUpdate(updated);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="task-item task-item-editing">
        <EditTask task={task} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      </li>
    );
  }

  return (
    <li className={`task-item${isOverdue ? ' task-item-overdue' : ''}`}>
      <div className="task-main">
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className={task.completed ? 'completed' : ''}>
            {isOverdue && !task.completed && (
              <span className="task-overdue-icon" aria-hidden="true">
                ⚠
              </span>
            )}
            {task.text}
          </span>
        </label>
        <div className="task-actions">
          <button
            type="button"
            className="secondary-button small-button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
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
          <span
            className={`task-pill task-due-date${
              isOverdue && !task.completed ? ' task-pill-overdue' : ''
            }`}
          >
            Due: {formatDueDate(task.dueDate)}
            {getDeadlineText() && (
              <span className="task-deadline-text"> · {getDeadlineText()}</span>
            )}
          </span>
        )}
        {Array.isArray(task.tags) && task.tags.length > 0 && (
          <span className="task-pill task-tags">
            Tags:{' '}
            {task.tags.map((tag) => (
              <span key={tag} className="task-tag-chip">
                #{tag}
              </span>
            ))}
          </span>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
