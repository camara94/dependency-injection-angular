import { HttpClient } from '@angular/common/http';
import { CategoryService } from './category-service';
import { InjectionToken } from '@angular/core';
export const categoryServiceProviderFactory = ( http: HttpClient, url: string ): CategoryService => new CategoryService(http, url);
export const CATEGORY_SERVICE_TOKEN = new InjectionToken<CategoryService>('CATEGORY_SERVICE_TOKEN');