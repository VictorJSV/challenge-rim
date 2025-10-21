import { render, screen } from '@testing-library/react';
import Quote from './Quote';

jest.mock('@src/assets/images/family.png', () => '/mocked-family-image.png');

jest.mock('./components/QuoteForm', () => ({
  QuoteForm: () => <form role="form">Mocked Quote Form</form>,
}));

describe('Quote', () => {
  it('when the user enters the quote details, then it should render all elements correctly', () => {
    render(<Quote />);

    expect(screen.getByText('Seguro Salud Flexible')).toBeInTheDocument();
    expect(screen.getByText('Creado para ti y tu familia')).toBeInTheDocument();
    expect(screen.getByText(/Tú eliges cuánto pagar/i)).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
