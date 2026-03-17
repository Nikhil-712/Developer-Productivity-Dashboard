import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard.jsx';

const noop = () => {};

it('renders dashboard header and sections', () => {
  const tasks = [
    { id: 1, text: 'Implement routing', completed: false, priority: 'High', category: 'Development' },
  ];

  render(
    <Dashboard
      tasks={tasks}
      pendingCount={1}
      completedCount={0}
      recentCompleted={[]}
      notification=""
      onAddTask={noop}
      onQuickAddTask={noop}
      onToggleTask={noop}
      onDeleteTask={noop}
      onUpdateTask={noop}
      searchQuery=""
      statusFilter="All"
      categoryFilter="All"
      sortBy="None"
      viewMode="list"
      onSearchChange={noop}
      onStatusFilterChange={noop}
      onCategoryFilterChange={noop}
      onSortByChange={noop}
      onViewModeChange={noop}
      isQuickAddOpen={false}
      setIsQuickAddOpen={noop}
      getGreeting={() => 'Good Morning'}
    />
  );

  expect(screen.getByText('Developer Productivity Dashboard')).toBeInTheDocument();
  expect(screen.getByText(/you have 1 pending task/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /tasks/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /progress/i })).toBeInTheDocument();
});
