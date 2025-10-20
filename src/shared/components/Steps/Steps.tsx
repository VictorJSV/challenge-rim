import React, {
  Children,
  PropsWithChildren,
  createContext,
  isValidElement,
  useContext,
} from 'react';
import './Steps.scss';
import { classes } from '@src/shared/utils';
import { ProgressBar } from './components/ProgressBar';
import IconStepper from '@src/assets/svgs/icon-stepper.svg?react';

interface StepsWrapperProps {
  Item: typeof StepsItem;
}

interface StepsProps {
  id: string;
}

interface StepContextValue {
  index: number;
  total: number;
}
const StepContext = createContext<StepContextValue>({ index: 0, total: 0 });

const Steps: React.FC<PropsWithChildren<StepsProps>> & StepsWrapperProps = ({ children, id }) => {
  const childrenArray = Children.toArray(children);
  const total = childrenArray.length;

  const items = childrenArray.map((step, index) => {
    if (isValidElement(step)) {
      return (
        <StepContext.Provider value={{ index, total }} key={index}>
          {step}
        </StepContext.Provider>
      );
    }
    return null;
  });

  return (
    <div className="c-steps">
      <div className="c-steps__mobile">
        <ProgressBar childrenArray={childrenArray} id={id} total={total} />
      </div>
      <div className="c-steps__desktop">
        <ul className="c-steps__list" id={id}>
          {items}
        </ul>
      </div>
    </div>
  );
};

interface StepsItemProps {
  title: string;
  isSelected?: boolean;
}

const StepsItem = ({ title, isSelected }: StepsItemProps) => {
  const { index, total } = useContext(StepContext);
  return (
    <li
      className={classes('c-steps__item', isSelected && 'c-steps__item--is-selected')}
      aria-label={`Paso ${index}: ${title} de ${total}`}
    >
      {index > 0 && (
        <div className="c-steps__marker" aria-hidden>
          <IconStepper />
        </div>
      )}
      <div className="c-steps__circle" aria-hidden>
        {index + 1}
      </div>
      <div className="c-steps__title" aria-hidden>
        {title}
      </div>
    </li>
  );
};

Steps.Item = StepsItem;

export default Steps;
