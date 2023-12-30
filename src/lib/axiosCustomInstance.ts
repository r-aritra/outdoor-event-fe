/* eslint-disable @typescript-eslint/ban-ts-comment */
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

const createAxiosInstance = async () => {
  const instance = Axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return instance;
};

export const axiosCustomInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const instance = await createAxiosInstance();

  let promise;
  if (config.method === 'get') {
    promise = instance({
      ...config,
      ...options,
      cancelToken: source.token,
    }).then(
      ({ data }) => data,
      (err) => ({ error: err }), // This will create an error property inside the data. use data.error to access the error
    );
  } else {
    promise = instance({
      ...config,
      ...options,
      cancelToken: source.token,
    }).then(({ data }) => data);
  }

  // @ts-expect-error
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export default axiosCustomInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
