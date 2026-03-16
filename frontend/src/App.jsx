import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import StatisticsPanel from './components/StatisticsPanel.jsx';
import Notification from './components/Notification.jsx';
import CompletionHistory from './components/CompletionHistory.jsx';
import QuickAddButton from './components/QuickAddButton.jsx';
import QuickAddModal from './components/QuickAddModal.jsx';

const LOCAL_STORAGE_KEY = 'developer-productivity-dashboard-tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('None');
  const [viewMode, setViewMode] = useState('list');
  const [notification, setNotification] = useState('');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = ({ text, priority, category, dueDate, tags }) => {
    if (!text || !text.trim()) return;

    const safePriority = priority || 'Medium';
    const safeCategory = category || 'Other';
    const safeTags = Array.isArray(tags)
      ? tags
      : [];

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        priority: safePriority,
        category: safeCategory,
        dueDate: dueDate || '',
         tags: safeTags,
         completedAt: null,
      },
    ]);

    showNotification('Task added successfully');
  };

  const handleQuickAddTask = ({ text, priority, category }) => {
    handleAddTask({ text, priority, category, dueDate: '', tags: [] });
  };

  const handleToggleTask = (id) => {
    const target = tasks.find((task) => task.id === id);
    const nowIso = new Date().toISOString();

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: task.completed ? null : nowIso,
            }
          : task
      )
    );

    if (target) {
      if (!target.completed) {
        showNotification('Task completed');
      } else {
        showNotification('Task marked as pending');
      }
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    showNotification('Task deleted successfully');
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
    );

    showNotification('Task updated successfully');
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const recentCompleted = [...tasks]
    .filter((task) => task.completed)
    .sort((a, b) => {
      const aTime = a.completedAt ? new Date(a.completedAt).getTime() : 0;
      const bTime = b.completedAt ? new Date(b.completedAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5);

  const showNotification = (message) => {
    setNotification(message);
  };

  useEffect(() => {
    if (!notification) return;

    const id = window.setTimeout(() => {
      setNotification('');
    }, 3000);

    return () => window.clearTimeout(id);
  }, [notification]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

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
          <AddTask onAddTask={handleAddTask} />
        </section>
        <section className="tasks-section">
          <h2>Tasks</h2>
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            sortBy={sortBy}
            viewMode={viewMode}
            onSearchChange={setSearchQuery}
            onStatusFilterChange={setStatusFilter}
            onCategoryFilterChange={setCategoryFilter}
            onSortByChange={setSortBy}
            onViewModeChange={setViewMode}
          />
        </section>
        <section className="progress-section">
          <h2>Progress</h2>
          <ProgressBar
            completed={completedCount}
            total={tasks.length}
          />
        </section>
        <CompletionHistory recentCompleted={recentCompleted} />
      </main>
      <QuickAddButton onClick={() => setIsQuickAddOpen(true)} />
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onQuickAdd={handleQuickAddTask}
      />
    </div>
  );
}

export default App;
