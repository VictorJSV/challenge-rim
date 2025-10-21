import { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  const TestComponent = ({ handler, active = true }: { handler: () => void; active?: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, handler, active);
    return <div data-testid="inside" ref={ref}>Inside</div>;
  };
  it('when clicking outside, then handler is called', () => {
    const handler = jest.fn();
    render(<TestComponent handler={handler} />);
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();
  });

  it('when clicking inside, then handler is not called', () => {
    const handler = jest.fn();
    const { getByTestId } = render(<TestComponent handler={handler} />);
    fireEvent.mouseDown(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });
});
