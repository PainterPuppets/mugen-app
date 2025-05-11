import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from "axios";
import { Response } from "@/interfaces/response";
import { message } from "antd";
import { keysToCamel } from "@/utils/helper";
import csrf from "./csrf";

export interface RequestConfig extends AxiosRequestConfig {
  /**
   * withToken 为 true 时尝试往 Header 中加入 access token
   */
  withToken?: boolean;
}

export const onRequestFulfilled: (
  config: RequestConfig,
) => Promise<RequestConfig> = async config => {
  console.log(
    `[request][${config.method}] 开始请求 ${config.url} [body] ${JSON.stringify(
      config.data,
    )}`,
  );
  const CSRFToken = csrf.getCSRFToken();
  
  return Promise.resolve({
    ...config,
    headers: {
      ...config.headers,
      "X-CSRFToken": CSRFToken,
    },
  });
};

export const onRequestRejected: (error: any) => any = error => {
  message.error('请求已取消');
  return Promise.reject(error);
};


const onResponseFulfilled: (value: AxiosResponse<Response>) => any = (
  response
) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (!response.data.success) {
    console.log(
      `[request][${response.request._method}] 请求失败 ${
        response.request._url
      } [body] ${JSON.stringify(response.data)}`,
    );
    return Promise.reject(keysToCamel(response));
  }

  return Promise.resolve(keysToCamel(response));
};

/**
 * 2xx 以外的 HTTP 响应以及服务器不成功的响应都会经过这边
 * 如果需要使用非标准的接口，可单独创建实例与拦截器
 */
const onResponseRejected: (error?: AxiosError) => any = (error) => {
  if (!error) {
    return Promise.reject({ detail: "发生未知错误" });
  }

  if (!error.response) {
    message.error("服务器开小差啦");
  } else if (error.response.data.detail) {
    message.error(error.response.data.detail);
  }

  return Promise.reject(keysToCamel(error));
};

class BaseProvider {
  provider: AxiosInstance;
  constructor() {
    this.provider = axios.create({
      withCredentials: true,
    });
    this.provider.interceptors.request.use(
      onRequestFulfilled,
      onRequestRejected,
    );
    this.provider.interceptors.response.use(
      onResponseFulfilled,
      onResponseRejected,
    );
  }

  request(...args: any[]) {
    return this.provider
      .request(...(args as [AxiosRequestConfig]))
      .then((res) => {
        return keysToCamel(res.data);
      });
  }

  get<R = any>(url: string, config?: RequestConfig): Promise<Response<R>> {
    return this.provider.get(url, config).then((res) => {
      return res.data
    });
  }

  // get<T = any>(url: string, config?: AxiosRequestConfig): Promise<Response<T>> {
  //   return this.provider.get(url, config).then((data) => );
  // }

  post<T = any>(...args: any[]): Promise<Response<T>> {
    return this.provider
      .post(
        ...(args as [string, any | undefined, AxiosRequestConfig | undefined])
      )
      .then((res) => {
        return res.data;
      });
  }

  put<T = any>(...args: any[]): Promise<Response<T>> {
    return this.provider
      .put(
        ...(args as [string, any | undefined, AxiosRequestConfig | undefined])
      )
      .then((res) => {
        return res.data;
      });
  }

  patch<T = any>(...args: any[]): Promise<Response<T>> {
    return this.provider
      .patch(
        ...(args as [string, any | undefined, AxiosRequestConfig | undefined])
      )
      .then((res) => {
        return res.data;
      });
  }

  delete<T = any>(...args: any[]): Promise<Response<T>> {
    return this.provider
      .delete(...(args as [string, AxiosRequestConfig | undefined]))
      .then((res) => {
        return res.data;
      });
  }

  head<T = any>(...args: any[]): Promise<Response<T>> {
    return this.provider
      .head(...(args as [string, AxiosRequestConfig | undefined]))
      .then((res) => {
        return res.data;
      });
  }
}

let baseProvider = new BaseProvider();

export default baseProvider;
