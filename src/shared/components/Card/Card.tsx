import { PropsWithChildren } from 'react';
import './Card.scss';
import { classes } from '@src/shared/utils';

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
      <button className={classes('c-card', isActive && 'c-card--active')} onClick={onClick}>
        <div className="c-card__icon"> {isActive && '✔'} </div>
        {children}
      </button>
    );
  }
  return <div className={classes('c-card', isActive && 'c-card--active')} >{children}</div>;
};

export default Card;
