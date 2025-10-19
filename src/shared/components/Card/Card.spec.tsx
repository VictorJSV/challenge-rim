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

  it('when isActive is true, then applies c-card--active class', () => {
    const { container } = render(<Card isActive>Active Card</Card>);
    expect(container.firstChild).toHaveClass('c-card--active');
  });

  /* it('when isActive is true and type is button, then shows checkmark icon', () => {
    const { getByText } = render(
      <Card type="button" isActive>Active Button</Card>
    );
    expect(getByText('✔')).toBeInTheDocument();
  });

  it('when isActive is false, then does not show checkmark icon', () => {
    const { queryByText } = render(
      <Card type="button" isActive={false}>Inactive Button</Card>
    );
    expect(queryByText('✔')).not.toBeInTheDocument();
  }); */
});
