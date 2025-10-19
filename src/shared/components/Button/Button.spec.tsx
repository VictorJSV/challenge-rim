import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('when rendering with children, then displays the children', () => {
    render(<Button variant="fill-primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('when applying variant prop, then adds the correct CSS classes', () => {
    render(<Button variant="fill-accent">Accent</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('c-button');
    expect(button).toHaveClass('c-button--fill-accent');
  });

  it('when using text variant, then applies text variant class', () => {
    render(<Button variant="text">Text</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('c-button--text');
  });

  it('when passing HTML props, then forwards them to button element', () => {
    render(<Button variant="fill-primary" type="submit" disabled>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('when clicking the button, then calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button variant="fill-primary" onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
