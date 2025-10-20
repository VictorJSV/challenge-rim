import { render, screen, fireEvent } from '@testing-library/react';
import { PlanList } from './PlansList';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@src/shared/utils', () => ({
  ...jest.requireActual('@src/shared/utils'),
  markBoldWords: (text: string) => text,
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

import { useSelector } from 'react-redux';

describe('when PlanList is rendered', () => {
  const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
  const mockPlans = {
    list: [
      {
        name: 'Plan A',
        price: 100,
        age: 18,
        description: ['Atención médica'],
      },
      {
        name: 'Plan A y B',
        price: 200,
        age: 18,
        description: ['Atención médica'],
      },
      {
        name: 'Plan A + C',
        price: 300,
        age: 18,
        description: ['Atención médica'],
      },
    ],
  };
  beforeEach(() => {
    mockUseSelector.mockReturnValue(18);
    mockNavigate.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('then shows loading state', () => {
    render(
      <PlanList planType="self" isLoading={true} isError={false} />,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText(/Cargando planes/i)).toBeInTheDocument();
  });

  it('then shows error state', () => {
    render(
      <PlanList planType="self" isLoading={false} isError={true} />,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });

  it('then renders all plans with correct names and prices', () => {
    render(
      <PlanList planType="self" data={mockPlans} isLoading={false} isError={false} />,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText('Plan A')).toBeInTheDocument();
    expect(screen.getByText('Plan A y B')).toBeInTheDocument();
    expect(screen.getByText('Plan A + C')).toBeInTheDocument();
    expect(screen.getByText('$100 al mes')).toBeInTheDocument();
    expect(screen.getByText('$200 al mes')).toBeInTheDocument();
    expect(screen.getByText('$300 al mes')).toBeInTheDocument();
  });

  it('then applies 5% discount for "other" planType', () => {
    render(
      <PlanList planType="other" data={mockPlans} isLoading={false} isError={false} />,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText('$95 al mes')).toBeInTheDocument();
    expect(screen.getByText('$190 al mes')).toBeInTheDocument();
    expect(screen.getByText('$285 al mes')).toBeInTheDocument();
  });

  it('then clicking "Seleccionar Plan" navigates to /resumen with plan data', () => {
    render(
      <PlanList planType="self" data={mockPlans} isLoading={false} isError={false} />,
      { wrapper: MemoryRouter }
    );
    const buttons = screen.getAllByRole('button', { name: /Seleccionar Plan/i });
    fireEvent.click(buttons[1]);
    expect(mockNavigate).toHaveBeenCalledWith('/resumen', {
      state: { plan: { name: 'Plan A y B', price: 200 } },
    });
  });

  it('then renders empty list if no data is provided', () => {
    render(
      <PlanList planType="self" isLoading={false} isError={false} />,
      { wrapper: MemoryRouter }
    );
    expect(screen.queryByText('Plan A')).not.toBeInTheDocument();
  });
});