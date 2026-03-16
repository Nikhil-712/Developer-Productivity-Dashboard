import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList.jsx';

const tasks = [
  { id: 1, text: 'Task A', completed: false, priority: 'High', category: 'Development' },
  { id: 2, text: 'Task B', completed: true, priority: 'Low', category: 'Documentation' },
];

const noop = () => {};

it('renders tasks and filters', () => {
  render(
    <TaskList
      tasks={tasks}
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
    />
  );

  expect(screen.getByText(/search tasks/i)).toBeInTheDocument();
  expect(screen.getByText('Task A')).toBeInTheDocument();
  expect(screen.getByText('Task B')).toBeInTheDocument();
});
