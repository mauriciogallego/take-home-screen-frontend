/* eslint-disable react/style-prop-object */
import { useContext, useEffect, useState } from 'react';

import Router from 'next/router';
import { LoadingContext } from '@/context/LoadingContext';

const Spinner = () => {
  const { loading } = useContext(LoadingContext);
  const [changePage, setChangePage] = useState(false);

  useEffect(() => {
    const start = () => setChangePage(true);
    const done = () => setChangePage(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', done);
    Router.events.on('routeChangeError', done);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', done);
      Router.events.off('routeChangeError', done);
    };
  }, []);

  if (loading.length > 0 || changePage) {
    return (
      <div
        test-id="spinner"
        className="fixed z-[100] bg-slate-50 opacity-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <svg
            width="48"
            className="animate-spin"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="21.5" stroke="#C8D0E0" strokeWidth="5" />
            <mask
              id="mask0_1176_1047"
              maskUnits="userSpaceOnUse"
              x="24"
              y="0"
              width="24"
              height="24"
            >
              <rect x="24" width="24" height="24" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0_1176_1047)">
              <circle
                cx="24"
                cy="24"
                r="21.5"
                stroke="#4687B8"
                strokeWidth="5"
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
  return null;
};

export default Spinner;
