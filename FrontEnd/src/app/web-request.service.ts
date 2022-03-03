import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { User} from './shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService { 
  readonly ROOT_URL: any;
  constructor(private httpClient : HttpClient) {
    this.ROOT_URL = "http://localhost:3000/api"
   }
  
  getProducts(uri:string){
   return  this.httpClient.get(`${this.ROOT_URL}/${uri}`)
  } 
  
   getProductsByCategory(uri:string,category:string){
       return this.httpClient.get(`${this.ROOT_URL}/${uri}/${category}`)
        
   }

   getProduct(uri:string,productName:string){
       return this.httpClient.get(`${this.ROOT_URL}/${uri}/${productName}`,  )
   }
   
   createUser(uri: string, payload:User){  
      return this.httpClient.post(`${this.ROOT_URL}/${uri}`, payload, {observe:'response'})
   }

   createOrder(uri:string, order:Object,Token:any){
    return  this.httpClient.post(`${this.ROOT_URL}/${uri}`,
    order,  {headers: new HttpHeaders({'x-auth-token':Token})}
    )
   } 
   
  addCategory(uri:string,category: object) { 
     
    return  this.httpClient.post(`${this.ROOT_URL}/${uri}`,category,  )
  }

  updateCategoryName(uri:string,category:object) {  
    return  this.httpClient.put(`${this.ROOT_URL}/${uri}`,category)
 }
  
  getCategories(uri: string) { 
    return  this.httpClient.get(`${this.ROOT_URL}/${uri}`)
  }
   
  createProduct(uri:string,product:object){
    return this.httpClient.post(`${this.ROOT_URL}/${uri}`,product, {observe:'response'})
 }
  getOutOfStock(uri: string,token:string) {  
    return  this.httpClient.get(`${this.ROOT_URL}/${uri}`,
    {
      headers: new HttpHeaders({'X-auth-Token':token})
    })

}
updateStock(uri:string,updatedProduct: { quantityInStock: string; productToUpdate: object; }, token:any) { 
  return this.httpClient.put(`${this.ROOT_URL}/${uri}`, updatedProduct, 
  {
    headers: new HttpHeaders({'x-auth-token':token})
  })
} 


getTodayOrders(uri: string, token: any) { 
  return this.httpClient.get(`${this.ROOT_URL}/${uri}`, {
    headers: new HttpHeaders({'x-auth-token':token})
  }) 
} 

getOrderDetails(uri: string, _id: Object) { 
  return this.httpClient.get(`${this.ROOT_URL}/${uri}/${_id}`, )

}
}
