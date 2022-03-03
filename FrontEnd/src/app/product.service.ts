import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CsvService } from './csv.service';
import { Products } from './shared/products.model';
import { shareReplay} from "rxjs/operators"

@Injectable()
export class ProductService implements OnDestroy{
  products: Products[] = [];
  subscription: Subscription
  constructor(private csvService: CsvService, private httpClient: HttpClient) {}
 
  public loadProducts() { 
   this.subscription = this.csvService.readCsv().pipe(shareReplay(1))
      .subscribe(
        (data) => {
          var row = data.split('\n');
          var headers = row[0].split(','); 
          for (var i = 1; i < row.length-1; i++) {
            var jsonObject: any = {};
            var currentRow = row[i].split(',');
            for (var j = 0; j < headers.length; j++) { 
              var header = headers[j]
              header = header.replace(/(\r)/,"");
              jsonObject[header] = currentRow[j];
            }
            this.products.push(jsonObject); 
          }   
        },
        (error) => {
          console.log(error);
        }
      );

    return this.products;
  }
  public getProductsByCategory() {
    return this.products;
  }
  
  public getProduct(productId:number){
    return this.products[(productId)]
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe()
  }


}
