import { render, screen } from '@testing-library/react';
import History from '../pages/History.jsx';

it('renders completion history heading and empty state', () => {
  render(<History recentCompleted={[]} />);

  expect(screen.getByText(/completion history/i)).toBeInTheDocument();
  expect(screen.getByText(/recently completed tasks/i)).toBeInTheDocument();
  expect(screen.getByText(/no tasks have been completed yet/i)).toBeInTheDocument();
});

it('renders completed tasks when provided', () => {
  const tasks = [
    { id: 1, text: 'Finish unit tests', completed: true },
    { id: 2, text: 'Refactor components', completed: true },
  ];

  render(<History recentCompleted={tasks} />);

  expect(screen.getByText('Finish unit tests')).toBeInTheDocument();
  expect(screen.getByText('Refactor components')).toBeInTheDocument();
});
