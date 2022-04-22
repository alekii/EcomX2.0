import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "../shared/user.model";
import { TokenStorage } from "./tokenstorage.service";

const AUTH_API = 'http://localhost:3000/api/';

@Injectable({
    providedIn:'root'
})

export class AuthService{   
   constructor(private httpClient: HttpClient,
               private router: Router,
               private tokenStorage: TokenStorage) {
       
   }

   login(user:any){ 
       return this.httpClient.post(AUTH_API+'auth',user,{observe:'response'})
    }
    
   createUser(user: User){  
     return this.httpClient.post(AUTH_API+'users',user,{observe:'response'})
}

  getCurrentUser(Token:any){
    return this.httpClient.get(AUTH_API+'users/current',{
    headers: new HttpHeaders({
        'x-auth-token': Token
    }) 
   })
}
   
  
   isAuthenticated() {
    const Token = this.tokenStorage.getToken()?.replace(/"/gi,"");  
    if(!Token) return false
    return this.httpClient.get(AUTH_API+'users/current').subscribe((res:any)=> {  
    }, (error)=>{
        console.log(error)
        this.router.navigate(['/auth/login'])
    })
} 
    isAdminAuthorized() {  
        const Token = this.tokenStorage.getToken()?.replace(/"/gi,"") 
        if(!Token) return false
        return this.httpClient.get(AUTH_API+'users/admin').subscribe((res:any)=> {   
        }, (error)=>{ 
            this.router.navigate(['/auth/login'])  
        })
    }
   


}