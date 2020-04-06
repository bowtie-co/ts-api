import * as qs from 'qs';
import fetch from 'node-fetch';
import { EventEmitter } from 'tsee';

import {
  ApiMethod,
  // ApiHeaders,
  ApiOptions,
  ApiEvents,
  ApiFetchResponse,
  ApiConfig,
  ApiClient,
  ApiRequest,
  ApiParameters
} from './types';

export const DefaultApiOptions: ApiOptions = {
  method: ApiMethod.GET,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const DefaultApiConfig: ApiConfig = {
  base: '',
  defaultOptions: DefaultApiOptions
};

export class Api implements ApiClient {
  public config: ApiConfig = DefaultApiConfig;
  public events: EventEmitter;

  constructor(config?: ApiConfig) {
    this.init(config);
  }

  public init(config?: ApiConfig): void {
    this.events = new EventEmitter<ApiEvents>();

    if (config) {
      this.config = config;
    }
  }

  public async get<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>> {
    return this.fetch(Object.assign(request, { method: ApiMethod.GET }));
  }

  public async put<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>> {
    return this.fetch(Object.assign(request, { method: ApiMethod.PUT }));
  }

  public async patch<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>> {
    return this.fetch(Object.assign(request, { method: ApiMethod.PATCH }));
  }

  public async post<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>> {
    return this.fetch(Object.assign(request, { method: ApiMethod.POST }));
  }

  public async delete<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>> {
    return this.fetch(Object.assign(request, { method: ApiMethod.DELETE }));
  }

  public async fetch<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>> {
    return fetch(this.buildUrl(request.url), this.buildOptions(request.options));
  }

  // public async json<T>(request: ApiRequest<T>): Promise<ApiFetchResponse<T>> {
  //   return this.fetch(request).then((resp) => resp.json());
  // }

  public buildUrl(route: string, params?: ApiParameters): string {
    return this.config.base + route + (qs ? qs.stringify(params) : '');
  }

  public buildOptions(options?: ApiOptions): ApiOptions {
    return Object.assign({}, this.config.defaultOptions, options);
  }

  // handleMiddlewares (response) {
  //   return this.middlewares.reduce((promiseChain, currentTask) => {
  //     return promiseChain.then(currentTask)
  //   }, Promise.resolve(response))
  // }

  // handleEvents (response) {
  //   if (this.eventNames().includes(response.status.toString())) {
  //     this.emit(response.status.toString(), response)
  //   }

  //   if (/2\d\d/.test(response.status)) {
  //     if (this.eventNames().includes('success')) {
  //       this.emit('success', response)
  //     }
  //   } else {
  //     if (this.eventNames().includes('error')) {
  //       this.emit('error', response)
  //     }
  //   }

  //   return Promise.resolve(response)
  // }
}
