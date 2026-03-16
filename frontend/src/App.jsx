import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
import ProgressBar from './components/ProgressBar.jsx';

const LOCAL_STORAGE_KEY = 'developer-productivity-dashboard-tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

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

  const handleAddTask = ({ text, priority, category, dueDate }) => {
    if (!text || !text.trim()) return;

    const safePriority = priority || 'Medium';
    const safeCategory = category || 'Other';

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        priority: safePriority,
        category: safeCategory,
        dueDate: dueDate || '',
      },
    ]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <Header title="Developer Productivity Dashboard" />
      <main className="main-content">
        <section className="add-task-section">
          <AddTask onAddTask={handleAddTask} />
        </section>
        <section className="tasks-section">
          <h2>Tasks</h2>
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            onSearchChange={setSearchQuery}
            onStatusFilterChange={setStatusFilter}
            onCategoryFilterChange={setCategoryFilter}
          />
        </section>
        <section className="progress-section">
          <h2>Progress</h2>
          <ProgressBar
            completed={completedCount}
            total={tasks.length}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
