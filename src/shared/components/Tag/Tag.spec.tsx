import { render, screen } from '@testing-library/react';
import Tag from './Tag';

describe('Tag component', () => {
  it('when rendered component then should display the children', () => {
    render(<Tag type="accent">Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('when rendered component then should have the correct class names', () => {
    render(<Tag type="accent">Test Tag</Tag>);
    const tagElement = screen.getByText('Test Tag');
    expect(tagElement).toHaveClass('c-tag');
    expect(tagElement).toHaveClass('c-tag--accent');
  });
});
