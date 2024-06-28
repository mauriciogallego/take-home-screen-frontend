/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect } from 'react';
import debounce from 'just-debounce-it';
import { useTable } from 'react-table';
import { TableProps } from '@/@types/index';
import TD from './TD';

export default function Table({
  columns = [],
  data = [],
  loadMore,
  clickButton = () => null,
  clickSecondary = () => null,
  clickRow,
}: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    if (loadMore) {
      const controlLoadMore = debounce(loadMore, 550);
      const onScroll = async (event: any) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        if (scrollHeight - scrollTop <= clientHeight * 1.1) {
          controlLoadMore();
        }
      };

      document
        .getElementById('main-scroll')
        ?.addEventListener('scroll', onScroll);

      return () => {
        document
          .getElementById('main-scroll')
          ?.removeEventListener('scroll', onScroll);
      };
    }
    return () => {
      document
        .getElementById('main-scroll')
        ?.removeEventListener('scroll', () => null);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="inline-block pb-5">
        <div className="bg-white sm:rounded-b-lg">
          <table
            {...getTableProps({
              style: {
                width: '100%',
              },
            })}
            className="divide-y-[1px] divide-[#E8EEF2]"
          >
            <thead className="rounded-t-lg">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="rounded-t-lg h-[57px]"
                >
                  {headerGroup.headers.map((column: any) => (
                    <th
                      {...column.getHeaderProps({
                        style: {
                          textAlign: column.align,
                          width: column.width,
                          minWidth: 85,
                        },
                      })}
                      className="p-3 text-xs font-normal tracking-wider text-left"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
              <tr />
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="divide-y-[1px] divide-[#E8EEF2]"
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className={
                      clickRow
                        ? 'cursor-pointer hover:bg-light-grey h-[55px]'
                        : 'h-[55px] hover:bg-light-grey'
                    }
                    onClick={
                      clickRow ? () => clickRow(row.original) : undefined
                    }
                    {...row.getRowProps()}
                  >
                    <>
                      {row.cells.map((cell: any) => (
                        <TD
                          {...cell.getCellProps({
                            cell,
                            clickButton,
                            clickSecondary,
                            align: cell.column.align,
                            maxWidth: cell.column.maxWidth,
                          })}
                        />
                      ))}
                    </>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
