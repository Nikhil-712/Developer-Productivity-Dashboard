import React, { useMemo, useState } from 'react';
import TaskItem from './TaskItem.jsx';
import CollapsibleTaskSection from './CollapsibleTaskSection.jsx';

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  searchQuery,
  statusFilter,
  categoryFilter,
  sortBy,
  viewMode,
  onSearchChange,
  onStatusFilterChange,
  onCategoryFilterChange,
  onSortByChange,
  onViewModeChange,
}) {
  const [expandedSections, setExpandedSections] = useState({});

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

  const priorityWeight = (priority) => {
    if (priority === 'High') return 0;
    if (priority === 'Medium') return 1;
    if (priority === 'Low') return 2;
    return 3;
  };

  const sortedTasks = [...filteredTasks];

  if (sortBy === 'Priority') {
    sortedTasks.sort((a, b) => {
      return priorityWeight(a.priority) - priorityWeight(b.priority);
    });
  }

  const categoriesOrder = [
    'Development',
    'Bug Fix',
    'Deployment',
    'Documentation',
    'Other',
  ];

  const groupedByCategory = useMemo(() => {
    const groups = new Map();
    sortedTasks.forEach((task) => {
      const key = task.category || 'Other';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(task);
    });
    return groups;
  }, [sortedTasks]);

  const allCategories = useMemo(() => {
    const dynamic = Array.from(groupedByCategory.keys()).filter(
      (c) => !categoriesOrder.includes(c)
    );
    return [...categoriesOrder, ...dynamic].filter((c) => groupedByCategory.has(c));
  }, [groupedByCategory]);

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

          <div className="field-group">
            <label htmlFor="sort-by">Sort By</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              <option value="None">None</option>
              <option value="Priority">Priority</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="view-mode">View</label>
            <select
              id="view-mode"
              value={viewMode}
              onChange={(e) => onViewModeChange(e.target.value)}
            >
              <option value="list">List</option>
              <option value="card">Card</option>
            </select>
          </div>
        </div>
      </div>

      {!sortedTasks.length ? (
        <p className="empty-state">
          {hasTasks
            ? 'No tasks match your search and filters.'
            : 'No tasks yet. Add your first task!'}
        </p>
      ) : (
        <div className={viewMode === 'card' ? 'task-list-cards' : ''}>
          {allCategories.map((category) => {
            const tasksForCategory = groupedByCategory.get(category) || [];
            const isExpanded =
              expandedSections[category] !== undefined
                ? expandedSections[category]
                : true;

            const toggleSection = () => {
              setExpandedSections((prev) => ({
                ...prev,
                [category]: !isExpanded,
              }));
            };

            return (
              <CollapsibleTaskSection
                key={category}
                category={category}
                tasks={tasksForCategory}
                isExpanded={isExpanded}
                onToggle={toggleSection}
              >
                <ul className={viewMode === 'card' ? 'task-list card-view' : 'task-list'}>
                  {tasksForCategory.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={onToggleTask}
                      onDelete={onDeleteTask}
                      onUpdate={onUpdateTask}
                    />
                  ))}
                </ul>
              </CollapsibleTaskSection>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TaskList;
