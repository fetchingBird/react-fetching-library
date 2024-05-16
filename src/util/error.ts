import axios, { AxiosError } from 'axios';

export const isAxiosError = <ResponseDataType>(
  error: unknown
): error is AxiosError<ResponseDataType> => {
  return axios.isAxiosError(error);
};
