import { forwardRef } from 'react';
import './Input.scss';
import { classes } from '@src/shared/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  type?: 'text' | 'number';
  variant?: 'default' | 'outlined';
  alignToLeft?: boolean;
  label?: string;
  isError?: boolean;
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, isError, alignToLeft, variant = 'default', ...props }, ref) => {
    return (
      <label
        className={classes('c-input', alignToLeft && 'c-input--to-left', variant && `c-input--variant-${variant}`)}
        htmlFor={props.id}
      >
        {label && (
          <span className="c-input__label">
            {label}
          </span>
        )}
        <input
          className="c-input__field"
          ref={ref}
          type={type}
          aria-invalid={isError}
          {...props}
        />
      </label>
    );
  }
);

export default Input;
