import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuoteForm } from './QuoteForm';
import { BrowserRouter } from 'react-router-dom';

const mockDispatch = jest.fn();
const mockSubmitQuote = jest.fn();

jest.mock('@src/services/api', () => ({
  useQuoteMutation: () => [mockSubmitQuote, { isLoading: false }],
}));
jest.mock('@src/storeHooks', () => ({
  useAppDispatch: () => mockDispatch,
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));


describe('QuoteForm', () => {
  const renderQuoteForm = () =>
    render(
      <BrowserRouter>
        <QuoteForm />
      </BrowserRouter>
    );
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('when user is on the form ,then should display all form elements', () => {
    renderQuoteForm();

    expect(screen.getByLabelText(/Nro. de documento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Celular/i)).toBeInTheDocument();
    expect(screen.getByText(/Acepto política de privacidad/i)).toBeInTheDocument();
    expect(screen.getByText(/Acepto la Política Comunicaciones Comerciales/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cotiza Aquí/i })).toBeInTheDocument();
  });

  it('when user submits the form, then should submit form', async () => {
    const mockUserData = {
      name: 'Victor',
      lastName: 'Sandoval',
      birthDay: '02-04-1990',
    };

    mockSubmitQuote.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue(mockUserData),
    });

    renderQuoteForm();

    fireEvent.change(screen.getByLabelText(/Nro. de documento/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Celular/i), {
      target: { value: '987654321' },
    });
    fireEvent.click(screen.getByText(/Acepto política de privacidad/i));
    fireEvent.click(screen.getByText(/Acepto la Política Comunicaciones Comerciales/i));
    fireEvent.click(screen.getByRole('button', { name: /Cotiza Aquí/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'quote/setUserData',
          payload: {
            docNumber: '12345678',
            cell: '987654321',
            ...mockUserData,
          },
        })
      );
    });
  });

  it('when user submits the form, then should show validation errors', async () => {
    renderQuoteForm();

    fireEvent.click(screen.getByRole('button', { name: /Cotiza Aquí/i }));

    await waitFor(() => {
      expect(screen.getByText(/El celular es requerido/i)).toBeInTheDocument();
    });
  });
});
