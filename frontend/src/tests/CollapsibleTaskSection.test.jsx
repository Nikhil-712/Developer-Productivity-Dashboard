import { render, screen, fireEvent } from '@testing-library/react';
import CollapsibleTaskSection from '../components/CollapsibleTaskSection.jsx';

it('toggles visibility when header is clicked', () => {
  const handleToggle = vi.fn();

  render(
    <CollapsibleTaskSection
      category="Development"
      tasks={[{ id: 1 }]}
      isExpanded={true}
      onToggle={handleToggle}
    >
      <div>Child content</div>
    </CollapsibleTaskSection>
  );

  const header = screen.getByRole('button', { name: /development/i });
  fireEvent.click(header);
  expect(handleToggle).toHaveBeenCalledTimes(1);
});
