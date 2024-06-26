import axios from 'axios';
import { signOut } from 'next-auth/react';
import Router from 'next/router';
import { headers, Options } from '@/@types/index';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const instance = axios.create({
  baseURL: `${URL}/v1`.trim(),
  timeout: 30000,
});

const interceptorRequest = async (config: any) => {
  let session: string = '';
  if (typeof window !== 'undefined') {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      session = access_token;
    }
  }

  if (session) config.headers.Authorization = `Bearer ${session}`;

  return config;
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
};

const interceptorResponse = async (config: any) => {
  if (
    config.response.status === 401 &&
    config.response.data.message === 'AUTHORIZATION_REQUIRED'
  ) {
    await signOut({ redirect: false });
    Router.push('/login');
    removeToken();

    return Promise.resolve(true);
  }
  return Promise.reject(config);
};
instance.interceptors.request.use(interceptorRequest);
instance.interceptors.response.use((config) => config, interceptorResponse);

async function createRequest(url: string, options: Options) {
  const response = await instance.request({
    ...options,
    url,
    data: options.data,
    method: options.method,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  return response;
}

export const setToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const get = async (url: string, options?: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'GET',
  });
  return request;
};

export const post = async (url: string, options: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'POST',
    data: options.data,
  });
  return request;
};

export const patch = async (url: string, options: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'PATCH',
    data: options.data,
  });
  return request;
};

export const del = async (url: string, options: Options) => {
  const request = await createRequest(url, {
    ...options,
    method: 'DELETE',
    data: options.data,
  });
  return request;
};
