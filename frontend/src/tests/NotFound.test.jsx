import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound.jsx';

it('renders 404 page and dashboard link', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  const link = screen.getByRole('link', { name: /go back to dashboard/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/dashboard');
});
