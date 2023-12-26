/* eslint-disable @typescript-eslint/ban-ts-comment */
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

// import { fetchWso2AccessToken } from '@/features/wso2Auth/utils/fetchWso2AccessToken';
// import { getSaml } from '@/hooks/getSaml';

const createAxiosInstance = async () => {
  //   const accessToken = await fetchWso2AccessToken();

  const instance = Axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Accept: 'application/json',
      //   Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      //   'X-Ad-Token': getSaml(),
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

  // This is a temporary fix to handle errors for GET request. Need to investigate error handling for GET in orval/tanstack and refactor later
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
