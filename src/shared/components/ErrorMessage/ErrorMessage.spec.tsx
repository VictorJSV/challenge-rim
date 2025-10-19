import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  test('when rendered with children, then it displays the children', () => {
    render(<ErrorMessage>Test error message</ErrorMessage>);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('c-error-message');
  });

  test('when id prop is provided, then it sets the id attribute on the root div', () => {
    render(<ErrorMessage id="errorId">Test</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'errorId');
  });
});
