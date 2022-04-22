import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { TokenStorage } from './../services/tokenstorage.service';


const TOKEN_HEADER_KEY = 'x-auth-token';
@Injectable()
export class  AuthInterceptor implements HttpInterceptor {

    constructor(private tokenStorage:TokenStorage){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
      let authrequest = req;
      const token = this.tokenStorage.getToken()?.replace(/"/gi,"");  
      if(token!=null){
        authrequest = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)}) 
      } 
        return next.handle(authrequest);
    }
}

export const authInterceptorProviders = [
  { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
]