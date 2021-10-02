import { HttpClient } from '@angular/common/http';
import { ProduitService } from './produit-service';
export const prodviderProduitServiceFactory = ( http: HttpClient ): ProduitService => new ProduitService( http );

