import { Response, RequestInit } from 'node-fetch';
import { EventEmitter, DefaultEventMap } from 'tsee';
import { IStringifyOptions, IParseOptions } from 'qs';

export enum ApiMethod {
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  POST = 'POST',
  DELETE = 'DELETE'
}

export interface ApiHeaders {
  [header: string]: string;
}

export interface ApiParameters {
  [key: string]: string | number | object;
}

export interface ApiPayload {
  [key: string]: string | number | object;
}

export interface ApiOptions extends RequestInit {
  method?: ApiMethod;
  headers?: ApiHeaders;
}

export interface ApiRequest<T> {
  url: string;
  body?: ApiPayload | ApiPayload[];
  params?: ApiParameters;
  options?: ApiOptions;
}

export interface ApiFetchResponse<T = ApiPayload> extends Response {
  json<P = T>(): Promise<P>;
}

// export interface ApiJsonResponse<T> {
//   req: ApiRequest<T>;
//   resp: ApiFetchResponse;
//   code: number;
//   data?: ApiPayload | ApiPayload[];
//   status: string;
// }

export interface ApiEvents extends DefaultEventMap {
  ok: (resp: ApiFetchResponse<ApiPayload>) => void;
  bad: (resp: ApiFetchResponse<ApiPayload>) => void;
  fail: (resp: ApiFetchResponse<ApiPayload>) => void;
  unauthorized: (resp: ApiFetchResponse<ApiPayload>) => void;
}

export interface QSConfig {
  parse?: IParseOptions;
  stringify?: IStringifyOptions;
}

export interface ApiConfig {
  qs?: QSConfig;
  base?: string;
  stage?: string;
  prefix?: string;
  version?: string;
  verbose?: boolean;
  secureOnly?: boolean;
  authorization?: string;
  defaultOptions?: ApiOptions;
}

export interface ApiClient {
  config: ApiConfig;
  events: EventEmitter<ApiEvents>;

  init(cfg?: ApiConfig): void;
  buildUrl(route: string, params?: ApiParameters): string;
  buildOptions(options?: ApiOptions): ApiOptions;
  fetch<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>>;
  // json<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>>;

  get<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>>;
  put<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>>;
  patch<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>>;
  post<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>>;
  delete<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>>;
}
