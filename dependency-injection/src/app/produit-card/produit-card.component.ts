import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { prodviderProduitServiceFactory } from './../services/own-provider'; 

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss']
})
export class ProduitCardComponent implements OnInit {

  constructor( private http: HttpClient  ) { }

  ngOnInit(): void {
    prodviderProduitServiceFactory(this.http)
    .getAllProduits()
    .subscribe( produits => console.log( produits ) )
  }
}


