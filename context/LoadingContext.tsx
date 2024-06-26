import { createContext, ReactElement, useMemo, useReducer } from 'react';

type Context = {
  loading: string[];
  add: (path: string, message?: string) => void;
  remove: (path: string) => void;
};

type Action = {
  type: 'ADD' | 'REMOVE';
  path: string;
};

export const LoadingContext = createContext({} as Context);

const useGetReducer = () => {
  const [state, dispatch] = useReducer(
    (prevState: string[], action: Action) => {
      switch (action.type) {
        case 'ADD':
          return [...prevState, action.path];
        case 'REMOVE':
          return prevState.filter((ele) => ele !== action.path);
        default:
          return [...prevState];
      }
    },
    [],
  );

  const providedContext = useMemo(
    () => ({
      loading: state,
      add: (path: string) => {
        dispatch({ type: 'ADD', path });
      },
      remove: (path: string) => {
        dispatch({ type: 'REMOVE', path });
      },
    }),
    [state],
  );

  return providedContext;
};

export default function LoadingProvider({
  children,
}: {
  children: ReactElement;
}) {
  const providedContext = useGetReducer();

  return (
    <LoadingContext.Provider value={providedContext}>
      {children}
    </LoadingContext.Provider>
  );
}
