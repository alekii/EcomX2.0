import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, } from "@angular/router"; 
import { Observable } from "rxjs";
import { WebRequestService } from "src/app/web-request.service"; 
import { Products } from "../../shared/products.model"; 

@Injectable()
export class RouteResolver implements Resolve<any>{
  loaded = false
  productName: any;
  myData:Products
    constructor(private  route: ActivatedRoute,
       private webService:WebRequestService,){
      //  this.productService.loadProducts();
    }

   async resolve(route:ActivatedRouteSnapshot)  { 
        if(!this.loaded){
       
        //   const myData =await this.productService.loadProducts(); 
        this.loaded= true 

     // this.productName= (this.route.params['productName']).replace(/\-/," "); 
        
      
      
    return  this.webService.getProduct("products","Infinix");
        
     
   

     console.log(this.myData)
      //  return this.myData
        }else{
          return "hh"
        }
      }

}