import { useEffect } from 'react';
import debounce from 'just-debounce-it';
import { useTable } from 'react-table';
import { TDProps, TableProps, RemovingKeyProps } from '@/@types/index';
import TD from './TD';
import { Each } from '../Each/Each';
import { omit } from 'lodash';

export declare function removingKeyProps<T>(options: T): T;

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

  const removingKeyProps: typeof RemovingKeyProps = (props: any) => {
    return omit(props, 'key');
  };

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
              <Each
                of={headerGroups}
                render={(headerGroup) => (
                  <tr
                    {...removingKeyProps(headerGroup.getHeaderGroupProps())}
                    className="rounded-t-lg h-[57px]"
                  >
                    <Each
                      of={headerGroup.headers}
                      render={(column: any) => (
                        <th
                          {...removingKeyProps(
                            column.getHeaderProps({
                              style: {
                                textAlign: column.align,
                                width: column.width,
                                minWidth: 85,
                              },
                            }),
                          )}
                          className="p-3 text-xs font-normal tracking-wider text-left"
                        >
                          {column.render('Header')}
                        </th>
                      )}
                    />
                  </tr>
                )}
              />
              <tr />
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="divide-y-[1px] divide-[#E8EEF2]"
            >
              <Each
                of={rows}
                render={(row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...removingKeyProps(row.getRowProps())}
                      className={
                        clickRow
                          ? 'cursor-pointer hover:bg-light-grey h-[55px]'
                          : 'h-[55px] hover:bg-light-grey'
                      }
                      onClick={
                        clickRow ? () => clickRow(row.original) : undefined
                      }
                    >
                      <Each
                        of={row.cells}
                        render={(cell: any) => (
                          <TD
                            {...removingKeyProps<TDProps>(
                              cell.getCellProps({
                                cell,
                                clickButton,
                                clickSecondary,
                                align: cell.column.align,
                                maxWidth: cell.column.maxWidth,
                              }),
                            )}
                          />
                        )}
                      />
                    </tr>
                  );
                }}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
