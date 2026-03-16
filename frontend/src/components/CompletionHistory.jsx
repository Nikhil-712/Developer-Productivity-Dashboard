import React from 'react';

function CompletionHistory({ recentCompleted }) {
  if (!recentCompleted.length) {
    return null;
  }

  return (
    <section className="history-section">
      <h2>Recently Completed</h2>
      <ul className="history-list">
        {recentCompleted.map((task) => (
          <li key={task.id} className="history-item">
            <span className="history-check">✔</span>
            <span className="history-text">{task.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CompletionHistory;
