import { render, screen, fireEvent } from '@testing-library/react';
import { useAppSelector } from '@src/storeHooks';
import { useGetPlansQuery } from '@src/services/api';
import Plans from './Plans';

jest.mock('./components/PlansList/PlansList', () => ({
  PlanList: (props: any) => <div data-testid="plan-list">{JSON.stringify(props)}</div>,
}));
jest.mock('@src/storeHooks', () => ({
  useAppSelector: jest.fn(),
}));
jest.mock('@src/services/api', () => ({
  useGetPlansQuery: jest.fn(),
}));

describe('Plans', () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue({ name: 'Victor' });
    (useGetPlansQuery as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: 'Plan A' }],
      isLoading: false,
      isError: false,
    });
  });

  it('when rendered, then shows user name in title', () => {
    render(<Plans />);
    expect(screen.getByText(/Victor ¿Para quién deseas cotizar?/)).toBeInTheDocument();
  });

  it('when rendered, then shows both plan type cards', () => {
    render(<Plans />);
    expect(screen.getByText('Para mi')).toBeInTheDocument();
    expect(screen.getByText('Para alguien más')).toBeInTheDocument();
  });

  it('when "Para mi" card is clicked, then PlanList is rendered with planType "self"', () => {
    render(<Plans />);
    fireEvent.click(screen.getByText('Para mi'));
    expect(screen.getByTestId('plan-list')).toHaveTextContent('self');
  });

  it('when "Para alguien más" card is clicked, then PlanList is rendered with planType "other"', () => {
    render(<Plans />);
    fireEvent.click(screen.getByText('Para alguien más'));
    expect(screen.getByTestId('plan-list')).toHaveTextContent('other');
  });

  it('when back button is clicked, then window.history.back is called', () => {
    const backSpy = jest.spyOn(window.history, 'back').mockImplementation(() => {});
    render(<Plans />);
    fireEvent.click(screen.getByText('Volver'));
    expect(backSpy).toHaveBeenCalled();
    backSpy.mockRestore();
  });
});