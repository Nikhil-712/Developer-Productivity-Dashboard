import React from 'react';
import TaskItem from './TaskItem.jsx';

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  searchQuery,
  statusFilter,
  categoryFilter,
  onSearchChange,
  onStatusFilterChange,
  onCategoryFilterChange,
}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const title = (task.text || '').toLowerCase();
    const matchesSearch =
      !normalizedQuery || title.includes(normalizedQuery);

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && task.completed) ||
      (statusFilter === 'Pending' && !task.completed);

    const matchesCategory =
      categoryFilter === 'All' || task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const hasTasks = tasks.length > 0;

  return (
    <div className="task-list-wrapper">
      <div className="task-filters">
        <div className="task-search">
          <label htmlFor="task-search-input">Search Tasks</label>
          <input
            id="task-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title"
          />
        </div>

        <div className="task-filter-selects">
          <div className="field-group">
            <label htmlFor="status-filter">Filter</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="category-filter">Category</label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Development">Development</option>
              <option value="Bug Fix">Bug Fix</option>
              <option value="Deployment">Deployment</option>
              <option value="Documentation">Documentation</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {!filteredTasks.length ? (
        <p className="empty-state">
          {hasTasks
            ? 'No tasks match your search and filters.'
            : 'No tasks yet. Add your first task!'}
        </p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
