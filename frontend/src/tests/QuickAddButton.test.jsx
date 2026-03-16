import { render, screen, fireEvent } from '@testing-library/react';
import QuickAddButton from '../components/QuickAddButton.jsx';

it('calls onClick when quick add button is pressed', () => {
  const handleClick = vi.fn();
  render(<QuickAddButton onClick={handleClick} />);

  const button = screen.getByRole('button', { name: /quick add task/i });
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
