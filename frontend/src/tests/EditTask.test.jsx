import { render, screen, fireEvent } from '@testing-library/react';
import EditTask from '../components/EditTask.jsx';

it('calls onSave with updated task data', () => {
  const task = {
    id: 1,
    text: 'Original title',
    priority: 'Medium',
    category: 'Development',
    dueDate: '',
    tags: [],
  };
  const handleSave = vi.fn();

  render(<EditTask task={task} onSave={handleSave} onCancel={() => {}} />);

  const input = screen.getByPlaceholderText(/update task title/i);
  fireEvent.change(input, { target: { value: 'Updated title' } });

  const saveButton = screen.getByRole('button', { name: /save/i });
  fireEvent.click(saveButton);

  expect(handleSave).toHaveBeenCalledTimes(1);
  expect(handleSave.mock.calls[0][0].text).toBe('Updated title');
});
