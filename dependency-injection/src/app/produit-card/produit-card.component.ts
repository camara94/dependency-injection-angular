import { Component, Inject, OnInit } from '@angular/core';
import { PRODUIT_SERVICE_TOKEN } from '../services/prouit-service-provider-factory';
import { ProduitService } from './../services/produit-service';
import { URL_TOKEN } from './../services/url-token';
import { CategoryService } from './../services/category-service';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss']
})
export class ProduitCardComponent implements OnInit {

  constructor(
    @Inject(PRODUIT_SERVICE_TOKEN) private produitService: ProduitService,
    @Inject( URL_TOKEN ) private BASE_URL: string,
    @Inject( CategoryService ) private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    console.log(this.BASE_URL);
    this.categoryService
        .getAllCategories()
        .subscribe( categories => console.log(categories))
  }

}
