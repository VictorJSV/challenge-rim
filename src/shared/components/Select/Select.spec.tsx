import { render, fireEvent, screen, within } from '@testing-library/react';
import Select, { Option } from './Select';


describe('Select component', () => {
  const options: Option[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  it('when rendered, then displays label and default value', () => {
    render(<Select options={options} label="Test Label" id="selTest" />);

    const combobox = screen.getByRole('combobox');
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(within(combobox).getByText('Option 1')).toBeInTheDocument();
  });

  it('when isError is true, then aria-invalid is set', () => {
    render(<Select options={options} id="selTest" isError />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('when disabled, then button is disabled and cannot open list', () => {
    render(<Select options={options} id="selTest" disabled />);
    const button = screen.getByRole('combobox');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('when alignToRight is true, then button has right alignment class', () => {
    render(<Select options={options} id="selTest" alignToRight />);
    expect(screen.getByRole('combobox')).toHaveClass('c-select__button--to-right');
  });

  it('when button is clicked, then opens options list', async () => {
    render(<Select options={options} id="selTest" />);
    const combobox = screen.getByRole('combobox');

    fireEvent.click(combobox);

    const listbox = await screen.findByRole('list');
    expect(listbox).toBeInTheDocument();
    expect(within(listbox).getByText('Option 1')).toBeInTheDocument();
    expect(within(listbox).getByText('Option 2')).toBeInTheDocument();
  });

  it('when option is clicked, then updates value and closes list', () => {
    render(<Select options={options} id="selTest" />);
    const combobox = screen.getByRole('combobox');

    fireEvent.click(combobox);
    fireEvent.click(within(screen.getByRole('list')).getByText('Option 2'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(within(combobox).getByText('Option 2')).toBeInTheDocument();
  });

  it('when Escape key is pressed, then closes list', () => {
    render(<Select options={options} id="selTest" />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
