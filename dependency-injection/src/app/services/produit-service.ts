import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produit } from './../shared/produit';
import { baseURL } from './../shared/baseURL';

export class ProduitService {
 http: HttpClient;
 constructor( http: HttpClient ) {
     this.http = http;
 }

 getAllProduits(): Observable<Produit[]> {
     return this.http.get<Produit[]>( baseURL + 'produits' );
 }
}