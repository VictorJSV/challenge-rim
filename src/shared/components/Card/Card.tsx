import { PropsWithChildren } from 'react';
import './Card.scss';
import { classes } from '@src/shared/utils';
import IconCheck from '@src/assets/svgs/icon-check.svg?react';

interface CardProps {
  type?: 'button' | 'default';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
}

const Card = (
  { children, type, onClick, isActive }: PropsWithChildren<CardProps> = { type: 'default', onClick: () => {} }
) => {
  if (type === 'button') {
    return (
      <button className={classes('c-card', isActive && 'c-card--is-active')} onClick={onClick}>
        <div className="c-card__icon"> {isActive && <IconCheck />} </div>
        {children}
      </button>
    );
  }
  return <div className={classes('c-card', isActive && 'c-card--is-active')} >{children}</div>;
};

export default Card;
