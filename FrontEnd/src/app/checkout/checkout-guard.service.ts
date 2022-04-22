import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ShoppingCartService } from "../services/ShoppinCart.Service";

@Injectable( )
export class CheckoutGuard implements CanActivate{
   
   constructor(private userAuth : AuthService,
       private cart:ShoppingCartService,
       private router: Router ){}
   
   
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(!this.userAuth.isAuthenticated() || this.cart.getNoItems()<=0){ 
        this.router.navigate(['/auth/login'])
        return false 
     }else {
         return true
    }
    
} 
}