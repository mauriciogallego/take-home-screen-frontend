import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Method, ResponseType } from 'axios';
import { Session } from 'next-auth';
import { FieldError, FieldErrors, FieldValues, Merge } from 'react-hook-form';
import { ReactElement } from 'react';

export interface CustomerSession extends Session {
  accessToken?: string;
  user?: {
    email?: string | null;
    username?: string | null;
  };
}

export type CustomGetServerSideProps = (
  context: GetServerSidePropsContext,
  session?: CustomerSession,
) => Promise<GetServerSidePropsResult<any>>;

export type Headers = {
  'Content-Type': string;
  'Access-Control-Allow-Origin': string;
  'Cache-Control': string;
  Pragma: string;
};

export const headers: Headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

export type Options = {
  data?: object;
  method?: Method;
  headers?: object;
  params?: object;
  reqServerSide?: unknown;
  responseType?: ResponseType;
};

export type InputProps = {
  label?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrors<FieldValues>>;
  canSeePassword?: boolean;
  register: any;
  notEditable?: boolean;
  type: HTMLInputElement['type'];
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export type DataLogin = {
  email?: string;
  password?: string;
};

export type ButtonProps = {
  variant: 'primary' | 'secondary' | 'tertiary' | 'default';
  type?: HTMLButtonElement['type'];
  disabled?: boolean;
  text: string | ReactElement;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
};

export type User = {
  id: string;
  active: boolean;
  email: string;
};

export type SvgProps = {
  width?: string;
  height?: string;
  className?: string;
  fill?: string;
  color?: string;
};

export type ModalProps = {
  visible: boolean;
  children?: ReactElement;
  title: string;
  message?: string;
  subMessage?: string;
  onCancel?: () => Promise<void> | void;
  onConfirm?: () => Promise<void> | void;
  cancelText?: string;
  confirmText?: string;
  isValid?: boolean;
};

export type Sale = {
  id: string;
  name: string;
  active: boolean;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TableProps = {
  data: object[];
  columns: any[];
  loadMore?: () => void;
  clickButton?: (type: string, row: any) => void;
  clickSecondary?: () => void;
  clickRow?: (value: any) => void;
  showMenu?: boolean;
};

export type TDProps = {
  style: any;
  cell: any;
  clickButton?: (type: string, row: any, header?: string) => void;
  clickSecondary?: () => void;
  align?: 'center' | 'left' | 'right';
  maxWidth?: number | string;
  showMenu?: boolean;
};

export type RFQ = {
  id: string;
  body: string;
  subject: string;
  customerEmail: string;
  items: Object | Array<any>;
  createdAt: Date;
  updatedAt: Date;
};

export interface IPaginatedResult<T> {
  results: T[];
  pagination: {
    total: number | undefined;
    size: number;
    skip: number;
    take: number;
    hasMore?: boolean;
  };
}
