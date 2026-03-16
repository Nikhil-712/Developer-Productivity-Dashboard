import { render, screen } from '@testing-library/react';
import Header from '../components/Header.jsx';

it('renders title and greeting', () => {
  render(
    <Header
      title="Developer Productivity Dashboard"
      greeting="Good Morning"
      subtitle="You have 3 pending tasks."
    />
  );

  expect(screen.getByText('Developer Productivity Dashboard')).toBeInTheDocument();
  expect(screen.getByText(/Good Morning/i)).toBeInTheDocument();
  expect(screen.getByText(/3 pending tasks/i)).toBeInTheDocument();
});
