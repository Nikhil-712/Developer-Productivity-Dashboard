import React from 'react';
import Header from '../components/Header.jsx';
import AddTask from '../components/AddTask.jsx';
import TaskList from '../components/TaskList.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import StatisticsPanel from '../components/StatisticsPanel.jsx';
import CompletionHistory from '../components/CompletionHistory.jsx';
import QuickAddButton from '../components/QuickAddButton.jsx';
import QuickAddModal from '../components/QuickAddModal.jsx';
import Notification from '../components/Notification.jsx';

function Dashboard({
  tasks,
  pendingCount,
  completedCount,
  recentCompleted,
  notification,
  onAddTask,
  onQuickAddTask,
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
  isQuickAddOpen,
  setIsQuickAddOpen,
  getGreeting,
}) {
  return (
    <div className="app-container">
      <Notification message={notification} />
      <Header
        title="Developer Productivity Dashboard"
        greeting={getGreeting()}
        subtitle={`You have ${pendingCount} pending task${
          pendingCount === 1 ? '' : 's'
        }.`}
      />
      <main className="main-content">
        <StatisticsPanel tasks={tasks} />
        <section className="add-task-section">
          <AddTask onAddTask={onAddTask} />
        </section>
        <section className="tasks-section">
          <h2>Tasks</h2>
          <TaskList
            tasks={tasks}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            sortBy={sortBy}
            viewMode={viewMode}
            onSearchChange={onSearchChange}
            onStatusFilterChange={onStatusFilterChange}
            onCategoryFilterChange={onCategoryFilterChange}
            onSortByChange={onSortByChange}
            onViewModeChange={onViewModeChange}
          />
        </section>
        <section className="progress-section">
          <h2>Progress</h2>
          <ProgressBar completed={completedCount} total={tasks.length} />
        </section>
        <CompletionHistory recentCompleted={recentCompleted} />
      </main>
      <QuickAddButton onClick={() => setIsQuickAddOpen(true)} />
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onQuickAdd={onQuickAddTask}
      />
    </div>
  );
}

export default Dashboard;
