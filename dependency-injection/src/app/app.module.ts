import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProduitCardComponent } from './produit-card/produit-card.component';
import { PRODUIT_SERVICE_TOKEN, produitServiceProviderFactory } from './services/prouit-service-provider-factory';
import { urlFactory, URL_TOKEN } from './services/url-token';
import { CategoryService } from './services/category-service';
import { categoryServiceProviderFactory } from './services/category-service-provider-factory';

@NgModule({
  declarations: [
    AppComponent,
    ProduitCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: PRODUIT_SERVICE_TOKEN,
      useFactory: produitServiceProviderFactory,
      deps: [HttpClient]
    },
    {
      provide: URL_TOKEN,
      useFactory: urlFactory
    },
    {
      provide: CategoryService,
      useFactory: categoryServiceProviderFactory,
      deps: [HttpClient, URL_TOKEN]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
