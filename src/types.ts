import * as qs from 'qs';
import fetch, { Response } from 'node-fetch';
import { EventEmitter, DefaultEventMap, IEventEmitter } from 'tsee';

export interface ApiPayload {
  [key: string]: string | number | object;
}

export interface ApiResponse<T = ApiPayload> extends Response {
  json<P = T>(): Promise<P>;
}

export interface ApiEvents extends DefaultEventMap {
  ok: (resp: ApiResponse<ApiPayload>) => void;
  bad: (resp: ApiResponse<ApiPayload>) => void;
  fail: (resp: ApiResponse<ApiPayload>) => void;
  unauthorized: (resp: ApiResponse<ApiPayload>) => void;
}

export interface IApiConfig {
  root: string;
  stage?: string;
  prefix?: string;
  version?: string;
  verbose?: boolean;
  secureOnly?: boolean;
  authorization?: string;
  defaultOptions?: object;
}

export interface IApiClient {
  config: IApiConfig;
  events: EventEmitter;

  init(cfg: IApiConfig): void;
  request<T>(route: string): Promise<ApiResponse<T>>;
  buildUrl(route: string, params?: object): string;

  get<T>(route: string): Promise<ApiResponse<T>>;
  put<T>(route: string): Promise<ApiResponse<T>>;
  patch<T>(route: string): Promise<ApiResponse<T>>;
  post<T>(route: string): Promise<ApiResponse<T>>;
  delete<T>(route: string): Promise<ApiResponse<T>>;
  options<T>(route: string): Promise<ApiResponse<T>>;
}
