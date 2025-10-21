import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('when rendered, then displays correctly', () => {
    render(<Header />);
    const logo = screen.getByLabelText('Logotipo de Rimac');
    const infoText = screen.getByText('¡Compra por este medio!');
    expect(infoText).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
