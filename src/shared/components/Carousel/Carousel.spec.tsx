import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

jest.mock('react-snap-carousel', () => ({
  useSnapCarousel: () => ({
    scrollRef: jest.fn(),
    hasPrevPage: true,
    hasNextPage: true,
    prev: jest.fn(),
    next: jest.fn(),
    pages: [{}, {}, {}],
    activePageIndex: 1,
    snapPointIndexes: new Set([0, 2]),
  }),
}));

const TestItem = ({ index }: { index: number }) => (
  <Carousel.Item index={index} width={100}>
    Item {index}
  </Carousel.Item>
);

describe('Carousel', () => {
  it('when rendered, then displays children', () => {
    render(
      <Carousel>
        <TestItem index={0} />
        <TestItem index={1} />
      </Carousel>
    );
    expect(screen.getByText('Item 0')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('when prev button is clicked, then calls prev function', () => {
    const { container } = render(
      <Carousel>
        <TestItem index={0} />
      </Carousel>
    );
    const prevButton = container.querySelector('.c-carousel__button--prev') as HTMLButtonElement;
    fireEvent.click(prevButton);
    expect(prevButton).not.toBeDisabled();
  });

  it('when activePageIndex is 1 and pages length is 3, then displays indicator correctly', () => {
    render(
      <Carousel>
        <TestItem index={0} />
        <TestItem index={1} />
        <TestItem index={2} />
      </Carousel>
    );
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });
});
