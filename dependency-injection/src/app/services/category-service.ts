import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../shared/category';
import { URL_TOKEN } from './url-token';
export class CategoryService {
    http: HttpClient;

    constructor( 
        http: HttpClient,
        @Inject( URL_TOKEN ) private BaseURL: string
    ) {
        this.http = http;
    }
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>( this.BaseURL + 'categories');
    }
}