import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import './Checkbox.scss';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'tabIndex'> {
  label: string;
  isError?: boolean;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, isError, id, disabled, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [checked, setChecked] = useState(!!rest.checked);
    useImperativeHandle(ref, () => inputRef.current || ({} as HTMLInputElement));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === ' ' || e.key === 'Enter') && !disabled && inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleClick = () => {
      setChecked(!!inputRef.current?.checked);
    };

    return (
      <div className="c-checkbox">
        <label className="c-checkbox__label" htmlFor={id} onClick={handleClick}>
          <input
            ref={inputRef}
            className="c-checkbox__input"
            type="checkbox"
            id={id}
            disabled={disabled}
            aria-invalid={isError}
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={-1}
            role="none"
            {...rest}
          />
          <div
            className="c-checkbox__icon"
            tabIndex={0}
            role="checkbox"
            onKeyDown={handleKeyDown}
            aria-invalid={isError}
            aria-checked={checked}
            aria-disabled={disabled}
            aria-labelledby={`${id}Label`}
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M5 10l4 4 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="c-checkbox__text" id={`${id}Label`} aria-hidden="true">
            {label}
          </span>
        </label>
      </div>
    );
  }
);

export default Checkbox;
