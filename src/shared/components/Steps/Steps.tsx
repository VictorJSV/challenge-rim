import React, { Children, PropsWithChildren, createContext, isValidElement, useContext } from 'react';
import './Steps.scss';
import { classes } from '@src/shared/utils';

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
    <ul className="c-steps" id={id}>
      {items}
    </ul>
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
      { index > 0 && <div className="c-steps__marker" aria-hidden>---</div> }
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
