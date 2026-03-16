import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar.jsx';

it('displays completed and total counts', () => {
  render(<ProgressBar completed={3} total={5} />);

  expect(screen.getByText(/3 \/ 5 tasks completed/i)).toBeInTheDocument();
});
