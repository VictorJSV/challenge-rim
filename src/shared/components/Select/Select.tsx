import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import './Select.scss';
import { useClickOutside } from '@src/shared/hooks/useClickOutside';
import { classes } from '@src/shared/utils';
import IconDown from '@src/assets/svgs/icon-down.svg?react';

export interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'aria-hidden' | 'className' | 'tabIndex'
  > {
  options: Option[];
  label?: string;
  isError?: boolean;
  id: string;
  alignToRight?: boolean;
  variant?: 'default' | 'outlined';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, isError, label, id, disabled, alignToRight, variant = 'default', ...props }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const value = selectRef.current?.value;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<Option>({ label: 'Seleccione...', value: '' });

    useImperativeHandle(ref, () => selectRef.current || ({} as HTMLSelectElement));
    useClickOutside(wrapperRef, () => setIsOpen(false), isOpen);

    useEffect(() => {
      const selectedOption = options.find((opt) => opt.value === value);
      setCurrentValue(selectedOption || { label: 'Seleccione...', value: '' });
    }, [value, options]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen((open) => !open);
      }
    };

    const handleClickOption = (val: string) => {
      if (selectRef.current) {
        const event = new Event('change', { bubbles: true });
        selectRef.current.value = val;
        selectRef.current.dispatchEvent(event);
      }
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        e.preventDefault();
      } else if (e.key === 'Tab') {
        setIsOpen(false);
      }
    };

    return (
      <div className="c-select" ref={wrapperRef}>
        {label && (
          <label htmlFor={id} className="c-select__label">
            {label}
          </label>
        )}
        <select
          ref={selectRef}
          aria-hidden="true"
          tabIndex={-1}
          disabled={disabled}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
          role="none"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          className={classes(
            'c-select__button',
            isOpen && 'c-select__button--open',
            alignToRight && 'c-select__button--to-right',
            variant && `c-select__button--variant-${variant}`,
          )}
          role="combobox"
          aria-haspopup="listbox"
          aria-controls={`${id}Listbox`}
          aria-label={label}
          aria-expanded={isOpen}
          aria-invalid={isError}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          type="button"
        >
          <span className="c-select__value">{currentValue.label}</span>
          <span className="c-select__arrow" aria-hidden="true">
            <IconDown />
          </span>
        </button>
        {isOpen && (
          <ul className="c-select__listbox" id={`${id}Listbox`}>
            {options.map((opt) => (
              <li
                key={opt.value}
                className={classes(
                  'c-select__option',
                  value === opt.value && ' c-select__option--selected'
                )}
                aria-selected={value === opt.value}
                onClick={() => handleClickOption(opt.value)}
              >
                {opt.label}
                {value === opt.value && (
                  <span className="c-select__check" aria-hidden="true">
                    ✔
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Select;
