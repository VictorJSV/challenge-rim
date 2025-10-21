import { Children, ReactNode, cloneElement, isValidElement } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import './Carousel.scss';
import { classes } from '@src/shared/utils';
import IconBack from '@src/assets/svgs/icon-back.svg?react';

interface CarouselItemProps {
  children?: ReactNode;
  width?: string | number;
  index: number;
  isSnapPoint?: boolean;
}

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const {
    scrollRef,
    hasPrevPage,
    hasNextPage,
    prev,
    next,
    pages,
    activePageIndex,
    snapPointIndexes,
  } = useSnapCarousel();

  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === CarouselItem) {
      const isSnapPoint = snapPointIndexes.has(child.props.index);
      return cloneElement(child, { isSnapPoint });
    }
    return child;
  });

  return (
    <div className="c-carousel">
      <ul className="c-carousel__scroll" ref={scrollRef}>
        {enhancedChildren}
      </ul>

      <div className="c-carousel__controls">
        <button
          className={classes(
            'c-carousel__button',
            'c-carousel__button--prev',
            !hasPrevPage && 'c-carousel__button--disabled'
          )}
          onClick={() => prev()}
          disabled={!hasPrevPage}
        >
          <IconBack className={hasPrevPage ? 'fill-blue-berry' : 'fill-neutral-500'} />
        </button>
        <div>
          {activePageIndex + 1} / {pages.length}
        </div>
        <button
          className={classes(
            'c-carousel__button',
            'c-carousel__button--next',
            !hasNextPage && 'c-carousel__button--disabled'
          )}
          onClick={() => next()}
          disabled={!hasNextPage}
        >
          <IconBack className={hasNextPage ? 'fill-blue-berry' : 'fill-neutral-500'} />
        </button>
      </div>
    </div>
  );
};

const CarouselItem = ({ children, width, isSnapPoint }: CarouselItemProps) => (
  <li
    className={classes('c-carousel__item', isSnapPoint && 'c-carousel__item--snap-point')}
    style={{ width }}
  >
    {children}
  </li>
);

Carousel.Item = CarouselItem;

export default Carousel;
