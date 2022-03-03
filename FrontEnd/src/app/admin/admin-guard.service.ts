import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
 import { Observable } from "rxjs";
import { AuthService } from "../auth.service"; 

@Injectable()
export class AdminGuard implements CanActivate{
 
    constructor(private auth: AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
         
        if(!this.auth.isAdminAuthorized()){
                 this.router.navigate(['/auth/login'])
                 return false
                 
        }
        else return true
        
         

       
    }









    
}

 
