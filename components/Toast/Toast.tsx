import 'tailwindcss/tailwind.css';
import clsx from 'clsx';
import { statusColor } from './constants';

const Toast = ({
  type,
  message,
  visible,
}: {
  type: string;
  message: string;
  visible: boolean;
}) => {
  const { bg, Svg } = statusColor[type];

  const clsxToast = clsx({
    'fixed flex p-3 lg:mr-4 z-50 mt-8 right-0 min-w-[320px] max-w-[520px] overflow-hidden rounded-lg shadow-md':
      true,
    [bg]: true,
    hidden: !visible,
  });

  const clsxDiv = clsx({
    'flex items-start w-full': true,
    [bg]: true,
  });

  return (
    <div className={clsxToast}>
      <div className={clsxDiv}>
        <div className="w-1/12">
          <Svg />
        </div>
        <p className="text-sm pl-2 text-white font-normal leading-6 w-9/10">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toast;
