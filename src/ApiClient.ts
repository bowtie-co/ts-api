import * as qs from 'qs';
import fetch, { Response } from 'node-fetch';
import { EventEmitter, DefaultEventMap, IEventEmitter } from 'tsee';

import { ApiPayload, ApiEvents, ApiResponse, IApiConfig, IApiClient } from './types';

/**
 * Api class to handle all interactions with backend
 */
export class ApiClient implements IApiClient {
  public config: IApiConfig;
  public events: EventEmitter;

  constructor(cfg: IApiConfig) {
    this.config = cfg;
    this.events = new EventEmitter<ApiEvents>();
  }

  public init(cfg: IApiConfig): ApiClient {
    this.config = cfg;
    return this;
  }

  public request<T>(route: string, params?: object, headers?: object): Promise<ApiResponse<T>> {
    let callRoute = route;

    if (params) callRoute += qs.stringify(params, { addQueryPrefix: true });

    return fetch(callRoute);
  }

  public buildUrl(route: string, params?: object): string {
    let callRoute = route;

    if (params) callRoute += qs.stringify(params, { addQueryPrefix: true });
  }
}
