import { render, screen } from '@testing-library/react';
import StatisticsPanel from '../components/StatisticsPanel.jsx';

it('shows basic task statistics', () => {
  const tasks = [
    { id: 1, text: 'A', completed: true, priority: 'High' },
    { id: 2, text: 'B', completed: false, priority: 'Medium' },
  ];

  render(<StatisticsPanel tasks={tasks} />);

  expect(screen.getByText(/total tasks/i)).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
});
