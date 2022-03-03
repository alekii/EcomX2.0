import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
 
@Injectable()
export class ProductResolver implements Resolve<any>{
  loaded = false
    productName: string;
    constructor( 
               private route: ActivatedRoute){ 
    }

   async resolve() { 
        if(!this.loaded){ 
           let myData =  "this.categoryService.loadCategories()"
            return myData
        }else{
          return 
        }
      }

}