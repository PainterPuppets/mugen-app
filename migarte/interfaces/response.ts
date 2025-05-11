import { AxiosError } from 'axios';

export type Response<D = any> = {
  success: string;
  code: number;
  data: D;
  detail?: string;
  fields?: any[];
  [filed: string]: any;
};

export type Error = {
  success: string;
  code: number;
  data?: any;
  detail: string;
  fields: any[];
};

export type ResponseError = Error & AxiosError;
