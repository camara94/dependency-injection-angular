import { Component, OnInit } from '@angular/core';
import { ProduitService } from './../services/produit-service';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss']
})
export class ProduitCardComponent implements OnInit {

  constructor( private produitService: ProduitService ) { }

  ngOnInit(): void {
    this.produitService
        .getAllProduits()
        .subscribe( produits => console.log(produits) );

  }

}
