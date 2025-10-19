import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  it('when rendering with label and value, then displays both correctly', () => {
    render(<Input label="Nombre" value="Juan" id="nombre" readOnly />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Juan')).toBeInTheDocument();
  });

  it('when typing in input, then calls onChange handler', () => {
    const handleChange = jest.fn();
    render(<Input label="Nombre" value="" onChange={handleChange} id="nombre" />);
    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Pedro' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('when isError is true, then shows error styling', () => {
    render(<Input label="Nombre" id="nombre" isError />);
    const input = screen.getByLabelText('Nombre');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
