import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('when rendered, then displays correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 Rímac Seguros y Reaseguros\./i)).toBeInTheDocument();
  });
});
