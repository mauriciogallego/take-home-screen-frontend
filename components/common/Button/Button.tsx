import { FC } from 'react';
import clsx from 'clsx';
import { ButtonProps } from '@/@types/index';

const Button: FC<ButtonProps> = ({
  loading,
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
  text,
  type,
}: ButtonProps) => {
  const clsName = clsx({
    [className]: !!className,
    'inline-flex justify-center items-center relative text-xs rounded-md h-10 py-3 px-5 leading-3 font-semibold focus:border-0 focus:outline-0 focus:outline-offset-0 focus:shadow-none focus:ring-0 box-border':
      true,
    'bg-primary text-white hover:bg-primary-bold': variant === 'primary',
    'bg-secondary hover:bg-secondary-h text-primary hover:text-primary-bold':
      variant === 'secondary',
    '!bg-disabled !text-white': variant === 'primary' && disabled && !loading,
    '!bg-secondary !text-secondary-disabled':
      variant === 'secondary' && disabled && !loading,
    '!bg-transparent !text-neutro-400':
      variant === 'tertiary' && disabled && !loading,
    'text-transparent': loading,
    'text-primary hover:bg-secondary hover:text-primary':
      variant === 'tertiary',
  });

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsName}
      onClick={onClick}
    >
      <span className="tracking-wide">{text}</span>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <svg
            width="16"
            height="16"
            className="animate-spin"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="6.5" stroke="#C8D0E0" strokeWidth="3" />
            <mask
              id="mask0_2157_237265"
              maskUnits="userSpaceOnUse"
              x="8"
              y="0"
              width="8"
              height="8"
            >
              <rect x="8" width="8" height="8" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0_2157_237265)">
              <circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="3" />
            </g>
          </svg>
        </div>
      )}
    </button>
  );
};

export default Button;
