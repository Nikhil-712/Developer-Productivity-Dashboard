import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem.jsx';

const baseTask = {
  id: 1,
  text: 'Write CI/CD pipeline',
  completed: false,
  priority: 'High',
  category: 'Deployment',
  dueDate: '',
  tags: ['DevOps'],
};

it('renders task title and metadata', () => {
  render(
    <TaskItem
      task={baseTask}
      onToggle={() => {}}
      onDelete={() => {}}
      onUpdate={() => {}}
    />
  );

  expect(screen.getByText('Write CI/CD pipeline')).toBeInTheDocument();
  expect(screen.getByText(/high priority/i)).toBeInTheDocument();
  expect(screen.getByText('Deployment')).toBeInTheDocument();
  expect(screen.getByText(/#DevOps/)).toBeInTheDocument();
});

it('calls onToggle when checkbox is clicked', () => {
  const handleToggle = vi.fn();
  render(
    <TaskItem
      task={baseTask}
      onToggle={handleToggle}
      onDelete={() => {}}
      onUpdate={() => {}}
    />
  );

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(handleToggle).toHaveBeenCalledWith(baseTask.id);
});
