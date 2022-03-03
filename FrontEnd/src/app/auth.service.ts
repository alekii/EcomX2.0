import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "./shared/user.model";


@Injectable({
    providedIn:'root'
})

export class AuthService{ 
    
   userProfile: BehaviorSubject<User> = new BehaviorSubject<User>({
       firstName:'',
       lastname:'',
       email:'',
       password:'',
       confirmpassword:''
   })

   constructor(private httpClient: HttpClient, private router: Router) {
       
   }

   login(user:any){
       return this.httpClient.post('http://localhost:3000/api/auth',user,{observe:'response'})
    }
    
  getCurrentUser(Token:any){
    return this.httpClient.get('http://localhost:3000/api/users/current',{
    headers: new HttpHeaders({
        'x-auth-token': Token
    }) 
   })
}
   
   saveToLocalStorage(user:any){
       this.userProfile.next(user);
       localStorage.setItem('Token',JSON.stringify(user.headers.get('x-auth-token')))
   }


   isAuthenticated() {
    const Token = localStorage.getItem('Token')?.replace(/"/gi,"")
    if(!Token) return false
    return this.httpClient.get('http://localhost:3000/api/users/current',{
     headers: new HttpHeaders({
         'x-auth-token': Token
     }) 
    }).subscribe((res:any)=> { 
    }, (error)=>{
        console.log(error)
        this.router.navigate(['/auth/login'])
    })
} 
    isAdminAuthorized() {  
        const Token = localStorage.getItem('Token')?.replace(/"/gi,"")
        if(!Token) return false
        return this.httpClient.get('http://localhost:3000/api/users/admin',{
         headers: new HttpHeaders({
             'x-auth-token': Token
         }) 
        }).subscribe((res:any)=> {    
        }, (error)=>{ 
            this.router.navigate(['/auth/login'])  
        })
    }
   


}