
import { HttpClient } from '@angular/common/http';
import { ProduitService } from './produit-service';
import { InjectionToken } from '@angular/core';
export const produitServiceFactory = ( http: HttpClient ): ProduitService => new ProduitService(http);
export const PRODUIT_SERVICE_TOKEN = new InjectionToken<ProduitService>('PRODUIT_SERVICE_TOKEN');