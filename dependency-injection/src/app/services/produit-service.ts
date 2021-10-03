import { HttpClient } from '@angular/common/http';
export class ProduitService {
    http: HttpClient;
    constructor( http: HttpClient ) {
        this.http = http;
    }

}