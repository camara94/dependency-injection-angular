import { InjectionToken } from '@angular/core';
import { baseURL } from './../shared/baseURL';
export const URL_TOKEN = new InjectionToken<string>('URL_TOKEN');
export const urlFactory = (): string => baseURL;
