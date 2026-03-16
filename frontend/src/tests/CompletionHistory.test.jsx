import { render, screen } from '@testing-library/react';
import CompletionHistory from '../components/CompletionHistory.jsx';

it('renders recently completed tasks', () => {
  const tasks = [
    { id: 1, text: 'Fix login bug' },
    { id: 2, text: 'Update README' },
  ];

  render(<CompletionHistory recentCompleted={tasks} />);

  expect(screen.getByText(/recently completed/i)).toBeInTheDocument();
  expect(screen.getByText('Fix login bug')).toBeInTheDocument();
});
