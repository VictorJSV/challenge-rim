import { render, fireEvent } from '@testing-library/react';
import Checkbox, { CheckboxProps } from './Checkbox';

describe('Checkbox component', () => {
  const defaultProps: CheckboxProps = {
    label: 'My Checkbox',
    id: 'chkTest',
  };

  it('when rendered, then it displays the label', () => {
    const { getByText, getByRole } = render(<Checkbox {...defaultProps} />);
    expect(getByText('My Checkbox')).toBeInTheDocument();
    const label = getByText('My Checkbox');
    const input = getByRole('checkbox', { hidden: true });
    expect(label).toHaveAttribute('id', 'chkTestLabel');
    expect(input).toHaveAttribute('aria-labelledby', 'chkTestLabel');
  });

  it('when checked prop is true, then input is checked', () => {
    const { getByRole } = render(<Checkbox {...defaultProps} checked />);
    const input = getByRole('checkbox');
    expect(input).toHaveAttribute('aria-checked', 'true');
  });

  it('when isError is true, then input has aria-invalid', () => {
    const { getByRole } = render(<Checkbox {...defaultProps} isError />);
    const input = getByRole('checkbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('when disabled, then input has aria-disabled and cannot be clicked', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Checkbox {...defaultProps} disabled onChange={onChange} />
    );
    const input = getByRole('checkbox');
    expect(input).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('when icon is focused and Enter is pressed, then input is clicked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox {...defaultProps} onChange={onChange} />
    );
    const icon = container.querySelector('.c-checkbox__icon') as HTMLElement;
    fireEvent.keyDown(icon, { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
  });

  it('when icon is focused and other key is pressed, then input is not clicked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox {...defaultProps} onChange={onChange} />
    );
    const icon = container.querySelector('.c-checkbox__icon') as HTMLElement;
    fireEvent.keyDown(icon, { key: 'a' });
    expect(onChange).not.toHaveBeenCalled();
  });
});
