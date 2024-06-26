import { useState, FC } from 'react';
import clsx from 'clsx';
import { InputProps } from '@/@types/index';
import { useTranslation } from 'next-i18next';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';

const Input: FC<InputProps> = ({
  label,
  register = {},
  placeholder,
  canSeePassword,
  required,
  error,
  type = 'text',
  notEditable = false,
  className = '',
}: InputProps) => {
  const { t } = useTranslation(['common']);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => setShowPassword(!showPassword);

  const inputClsx = clsx({
    [className]: !!className,
    'bg-neutro focus:bg-neutro-100 block w-full tracking-wides px-4 py-2 rounded-md text-black placeholder-gray-400 text-xs focus:outline-0 focus:outline-offset-0 focus:shadow-none focus:ring-0 box-border font-light':
      true,
    '!focus:border-1 border-red-500 text-red-500': !!error,
    'border-none': !error,
    'mt-1': !!label,
    'text-neutro-400': register.disabled,
    'text-black': notEditable,
  });

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor="email"
          className="block font-light tracking-wide text-xs px-3 py-1.5 text-neutro-300"
        >
          {label}
        </label>
      )}
      <div className="rounded-md">
        <div className="relative">
          {type === 'password' && canSeePassword && (
            <div className="absolute inset-y-0 z-10 right-0 pr-3 flex items-center">
              {showPassword ? (
                <EyeIcon
                  onClick={toggleShow}
                  className="cursor-pointer text-neutro-200 w-6"
                />
              ) : (
                <EyeSlashIcon
                  onClick={toggleShow}
                  className="cursor-pointer text-neutro-200 w-6"
                />
              )}
            </div>
          )}
          <input
            {...register}
            disabled={notEditable}
            id="scroll-input"
            type={showPassword ? 'text' : type}
            className={inputClsx}
            placeholder={placeholder}
          />
        </div>
        {required && (
          <div className="text-neutro-200 text-xxs mt-2">
            {t('mandatoryField')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
