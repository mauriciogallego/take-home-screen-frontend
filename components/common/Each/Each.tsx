import { Children, FC, ReactElement } from 'react';

export const Each: FC<{
  render: (item: any, index: number) => ReactElement;
  of: any[];
}> = ({ render, of }) =>
  Children.toArray(of.map((item, index) => render(item, index)));
