import { render, screen } from '@testing-library/react';
import Notification from '../components/Notification.jsx';

it('renders message when provided', () => {
  render(<Notification message="Task added successfully" />);

  expect(screen.getByText(/task added successfully/i)).toBeInTheDocument();
});

it('renders nothing when message is empty', () => {
  const { container } = render(<Notification message="" />);
  expect(container).toBeEmptyDOMElement();
});
