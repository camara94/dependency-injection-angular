import { Component, Inject, OnInit } from '@angular/core';
import { PRODUIT_SERVICE_TOKEN } from '../services/prouit-service-factory';
import { ProduitService } from './../services/produit-service';
import { URL_TOKEN } from './../services/url-token';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss']
})
export class ProduitCardComponent implements OnInit {

  constructor(
    @Inject(PRODUIT_SERVICE_TOKEN) private produitService: ProduitService,
    @Inject( URL_TOKEN ) private BASE_URL: string
  ) { }

  ngOnInit(): void {
    console.log(this.BASE_URL);
  }

}
