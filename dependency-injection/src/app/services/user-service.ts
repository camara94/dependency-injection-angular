import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../shared/user';
import { URL_TOKEN } from './url-token';
export class UserService {
    http: HttpClient;
    constructor( 
        http: HttpClient,
        @Inject( URL_TOKEN ) private BaseURL: string
    ) {
        this.http = http;
    }
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>( this.BaseURL + 'auth' );
    }
}