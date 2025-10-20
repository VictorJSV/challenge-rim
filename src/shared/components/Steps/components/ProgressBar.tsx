import { isValidElement } from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
  childrenArray: React.ReactNode[];
  id: string;
  total: number;
}

export const ProgressBar = ({ childrenArray, id, total }: ProgressBarProps) => {
  let currentStep = 0;
  childrenArray.forEach((child, index) => {
    if (isValidElement(child) && child.props.isSelected) {
      currentStep = index;
    }
  });
  const progressPercentage = ((currentStep + 1) / total) * 100;
  return (
    <div className="c-steps-bar" role="region">
      <span className="c-steps-bar__label" id={`${id}BarLabel`} aria-hidden="true">
        Paso {currentStep + 1} de {total}
      </span>
      <div
        className="c-steps-bar__container"
        role="progressbar"
        aria-labelledby={`${id}BarLabel`}
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`Paso ${currentStep + 1} de ${total} completado`}
      >
        <div className="c-steps-bar__value" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
};
