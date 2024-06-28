import React from 'react';
import { useTranslation } from 'next-i18next';
import { get } from 'lodash';
import { TDProps } from '@/@types/index';
import Read from '@/svg/read';
import Eye from '@/svg/eye';
import Button from '../Button/Button';

const alignFlex = {
  left: 'start',
  right: 'end',
  center: 'center',
};
const TD = ({ cell, clickButton = () => null, align = 'left' }: TDProps) => {
  const { t } = useTranslation(['common']);
  const { type, id } = cell.column;
  const { disabled } = cell.row.original;

  const onClick = (header?: string) => {
    clickButton(type, cell.row.original, header);
  };

  switch (type) {
    case 'boolean':
      return (
        <td className="p-3 max-w-[100px]">
          <div
            className={`text-neutro-300 whitespace-nowrap text-${align} text-xs font-light overflow-hidden text-ellipsis max-w-max-w`}
          >
            {cell.value ? t('yes') : t('no')}
          </div>
        </td>
      );
    case 'detail':
      return (
        <td className="p-3 max-w-[100px] whitespace-nowrap text-neutro-300">
          <div
            className={`flex-1 flex items-center justify-${alignFlex[align]}`}
          >
            <button
              type="button"
              test-id={`detail-${cell.row.id}`}
              onClick={() => onClick()}
              disabled={disabled && disabled[id]}
            >
              <Eye
                className={
                  disabled && disabled[id]
                    ? 'fill-neutro-400'
                    : 'fill-neutro-200'
                }
                width="20"
                height="20"
              />
            </button>
          </div>
        </td>
      );
    case 'action':
      return (
        <td className="p-3 max-w-[100px] whitespace-nowrap text-neutro-300">
          <div
            className={`flex-1 flex items-center justify-${alignFlex[align]}`}
          >
            <button
              type="button"
              className="flex items-center"
              disabled={disabled && disabled[id]}
              onClick={() => onClick()}
            >
              <Read
                className={
                  disabled && disabled[id]
                    ? 'fill-neutro-400'
                    : 'fill-neutro-200'
                }
                width="20"
                height="20"
              />
            </button>
          </div>
        </td>
      );
    case 'string':
      return (
        <td className="p-3 hover:bg-light-grey max-w-[100px] truncate">
          <div
            className={`text-neutro-300 whitespace-nowrap text-${align} text-xs font-light overflow-hidden text-ellipsis max-w-max-w`}
          >
            {cell.render('Cell')}
          </div>
        </td>
      );
    case 'string-button':
      return (
        <td className="p-3 max-w-[100px]">
          <div
            className={`flex-1 flex items-center justify-${alignFlex[align]}`}
          >
            <button
              type="button"
              className="flex items-center truncate"
              disabled={disabled && disabled[id]}
              onClick={() => onClick()}
            >
              <div
                className={`text-neutro-300 whitespace-nowrap text-${align} text-xs font-light overflow-hidden text-ellipsis max-w-max-w`}
              >
                {cell.render('Cell')}
              </div>
            </button>
          </div>
        </td>
      );
    case 'button':
      return (
        <td>
          <Button
            className="text-xxs"
            text={t(cell.render('textButton'))}
            onClick={() => onClick()}
            variant={cell.render('variant')}
          />
        </td>
      );
    default:
      return (
        <td className="p-3 hover:bg-light-grey max-w-[100px] truncate">
          {cell.render('Cell')}
        </td>
      );
  }
};

export default TD;
