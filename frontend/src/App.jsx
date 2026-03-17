import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import History from './pages/History.jsx';
import Settings from './pages/Settings.jsx';
import NotFound from './pages/NotFound.jsx';

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
    <div className="app-shell">
      <nav className="main-nav">
        <div className="main-nav-title">Developer Productivity Dashboard</div>
        <div className="main-nav-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            History
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Settings
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route
          path="/dashboard"
          element={(
            <Dashboard
              tasks={tasks}
              pendingCount={pendingCount}
              completedCount={completedCount}
              recentCompleted={recentCompleted}
              notification={notification}
              onAddTask={handleAddTask}
              onQuickAddTask={handleQuickAddTask}
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
              isQuickAddOpen={isQuickAddOpen}
              setIsQuickAddOpen={setIsQuickAddOpen}
              getGreeting={getGreeting}
            />
          )}
        />
        <Route
          path="/history"
          element={<History recentCompleted={recentCompleted} />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
