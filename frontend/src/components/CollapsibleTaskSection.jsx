import React from 'react';

function CollapsibleTaskSection({
  category,
  tasks,
  isExpanded,
  onToggle,
  children,
}) {
  if (!tasks.length) return null;

  return (
    <div className="task-section">
      <button
        type="button"
        className="task-section-header"
        onClick={onToggle}
      >
        <span className="task-section-arrow" aria-hidden="true">
          {isExpanded ? '▾' : '▸'}
        </span>
        <span className="task-section-title">{category}</span>
        <span className="task-section-count">{tasks.length}</span>
      </button>
      {isExpanded && <div className="task-section-body">{children}</div>}
    </div>
  );
}

export default CollapsibleTaskSection;
