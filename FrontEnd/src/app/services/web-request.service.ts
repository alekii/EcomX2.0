import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  

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
    
   createOrder(uri:string, order:Object){
    return  this.httpClient.post(`${this.ROOT_URL}/${uri}`,order
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
  getOutOfStock(uri: string) {  
    return  this.httpClient.get(`${this.ROOT_URL}/${uri}`)

}
updateStock(uri:string,updatedProduct: { quantityInStock: string; productToUpdate: object; }) { 
  return this.httpClient.put(`${this.ROOT_URL}/${uri}`, updatedProduct)
} 


getTodayOrders(uri: string) { 
  return this.httpClient.get(`${this.ROOT_URL}/${uri}`) 
} 

getOrderDetails(uri: string, _id: Object) { 
  return this.httpClient.get(`${this.ROOT_URL}/${uri}/${_id}`, )

}

searchProduct(uri:string,searchTerm:String){
  return this.httpClient.get(`${this.ROOT_URL}/${uri}/${searchTerm}`)
}

}
