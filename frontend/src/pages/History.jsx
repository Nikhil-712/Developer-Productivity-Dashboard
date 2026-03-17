import React from 'react';
import CompletionHistory from '../components/CompletionHistory.jsx';

function History({ recentCompleted }) {
  return (
    <div className="page-container">
      <h1>Completion History</h1>
      <p className="page-subtitle">Recently completed tasks</p>
      <CompletionHistory recentCompleted={recentCompleted} />
      {!recentCompleted.length && (
        <p className="empty-state">No tasks have been completed yet.</p>
      )}
    </div>
  );
}

export default History;
