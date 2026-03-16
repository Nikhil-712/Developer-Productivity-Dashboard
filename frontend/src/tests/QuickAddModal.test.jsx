import { render, screen, fireEvent } from '@testing-library/react';
import QuickAddModal from '../components/QuickAddModal.jsx';

it('renders when open and calls onQuickAdd', () => {
  const handleQuickAdd = vi.fn();
  const handleClose = vi.fn();

  render(
    <QuickAddModal
      isOpen={true}
      onClose={handleClose}
      onQuickAdd={handleQuickAdd}
    />
  );

  const input = screen.getByPlaceholderText(/add a task/i);
  fireEvent.change(input, { target: { value: 'Quick task' } });

  const addButton = screen.getByRole('button', { name: /add/i });
  fireEvent.click(addButton);

  expect(handleQuickAdd).toHaveBeenCalledTimes(1);
});
