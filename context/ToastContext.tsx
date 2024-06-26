/* eslint-disable no-unneeded-ternary */

import { createContext, useEffect, useState } from 'react';
import Toast from '@/components/Toast/Toast';
import { errorMessages } from '@/constants/errorMessages';

const ERROR = 'error';
const SUCCESS = 'success';
const WARNING = 'warning';
const INFORMATION = 'information';

type Context = {
  showSuccessMessage: (message: string) => void;
  showErrorMessage: (errorCode?: string, customMessage?: string) => void;
  showWarningMessage: (message: string) => void;
};

export const ToastContext = createContext({} as Context);

export default function ToastProvider({ children }: { children: any }) {
  const [values, setValues] = useState({
    visible: false,
    message: '',
    type: SUCCESS,
  });

  const hideMessage = () => {
    setValues({ ...values, visible: false });
  };

  const showSuccessMessage = (message: string) => {
    setValues({
      visible: true,
      type: SUCCESS,
      message,
    });
  };

  const showErrorMessage = (errorCode?: string, customMessage?: string) => {
    let message = customMessage ? customMessage : 'Ocurrió un error inesperado';
    if (errorCode) {
      message = errorMessages[errorCode] || message;
    }
    setValues({
      visible: true,
      type: ERROR,
      message,
    });
  };

  const showInfoMessage = (message: string) => {
    setValues({
      visible: true,
      type: INFORMATION,
      message,
    });
  };

  const showWarningMessage = (message: string) => {
    setValues({
      visible: true,
      type: WARNING,
      message,
    });
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const providedContext = {
    showSuccessMessage,
    showErrorMessage,
    showInfoMessage,
    showWarningMessage,
  };

  useEffect(() => {
    if (values.visible) {
      setTimeout(() => {
        hideMessage();
      }, 3000);
    }
  }, [values.visible]);

  return (
    <ToastContext.Provider value={providedContext}>
      <Toast
        visible={values.visible}
        type={values.type}
        message={values.message}
      />
      {children}
    </ToastContext.Provider>
  );
}
