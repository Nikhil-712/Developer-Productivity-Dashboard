import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../pages/Settings.jsx';

it('renders settings sections and allows changing options', () => {
  render(<Settings />);

  expect(screen.getByText(/settings/i)).toBeInTheDocument();
  expect(screen.getByText(/customize your dashboard experience/i)).toBeInTheDocument();

  const themeSelect = screen.getByLabelText(/theme/i);
  const viewSelect = screen.getByLabelText(/task list view/i);

  expect(themeSelect.value).toBe('light');
  expect(viewSelect.value).toBe('list');

  fireEvent.change(themeSelect, { target: { value: 'dark' } });
  fireEvent.change(viewSelect, { target: { value: 'board' } });

  expect(themeSelect.value).toBe('dark');
  expect(viewSelect.value).toBe('board');
});
