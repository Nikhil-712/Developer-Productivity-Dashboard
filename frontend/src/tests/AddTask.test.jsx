import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '../components/AddTask.jsx';

it('calls onAddTask with text and metadata', () => {
  const handleAdd = vi.fn();
  render(<AddTask onAddTask={handleAdd} />);

  const input = screen.getByPlaceholderText(/add a new task/i);
  fireEvent.change(input, { target: { value: 'Write tests' } });

  const addButton = screen.getByRole('button', { name: /add/i });
  fireEvent.click(addButton);

  expect(handleAdd).toHaveBeenCalledTimes(1);
  const payload = handleAdd.mock.calls[0][0];
  expect(payload.text).toBe('Write tests');
  expect(payload.priority).toBeDefined();
  expect(payload.category).toBeDefined();
});
