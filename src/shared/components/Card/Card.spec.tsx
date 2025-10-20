import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('when rendered, then children are inside a div by default', () => {
    const { getByText } = render(<Card>Test Content</Card>);
    expect(getByText('Test Content').parentElement?.tagName).toBe('DIV');
  });

  it('when rendered, then applies c-card class by default', () => {
    const { container, getByText } = render(<Card>Test</Card>);
    expect(container.firstChild).toHaveClass('c-card');
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('when type is button, then renders as a button', () => {
    const { getByRole } = render(<Card type="button">Button Card</Card>);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('when button is clicked, then calls onClick', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Card type="button" onClick={onClick}>Clickable</Card>
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('when isActive is true, then applies active class', () => {
    const { container } = render(<Card isActive>Active Card</Card>);
    expect(container.firstChild).toHaveClass('c-card--is-active');
  });
});
