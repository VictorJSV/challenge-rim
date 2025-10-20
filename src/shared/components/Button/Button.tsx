import { forwardRef, PropsWithChildren } from 'react';
import './Button.scss'
import { classes } from '@src/shared/utils';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant: 'fill-primary' | 'fill-accent' | 'text';
  size?: 'sm' | 'md' | 'xl';
}

const Button = forwardRef<PropsWithChildren<HTMLButtonElement>, ButtonProps>(
  ({ children, variant, size = 'sm', ...props }, ref) => {
    return (
      <button
        className={classes('c-button', variant && `c-button--variant-${variant}`, size && `c-button--size-${size}`)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
