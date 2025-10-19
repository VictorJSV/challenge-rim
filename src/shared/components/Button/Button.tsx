import { forwardRef, PropsWithChildren } from 'react';
import './Button.scss'
import { classes } from '@src/shared/utils';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant: 'fill-primary' | 'fill-accent' | 'text';
}

const Button = forwardRef<PropsWithChildren<HTMLButtonElement>, ButtonProps>(
  ({ children, variant, ...props }, ref) => {
    return (
      <button
        className={classes('c-button', variant && `c-button--${variant}`)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
