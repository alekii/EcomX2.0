import { Injectable } from '@angular/core';  
import { Products } from './shared/products.model';
import { User } from './shared/user.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService { 
  products:Products[] 
  constructor(private service: WebRequestService) {

  
   }

   getProducts(){
     return this. service.getProducts('products')
   } 

   getProductsByCategory(category:string){
    return this.service.getProductsByCategory('category',category)
   }

   getProduct(productName:string){
     return this.service.getProduct('products',productName)
   }

   createUser(user: User){
        return this.service.createUser('users', user)
   }
   
   createOrder(order:Object,token:any){
     return this.service.createOrder('orders', order,token)
   }

   addCategory(category:object) {  
     return this.service.addCategory('category',category)
  }
   updateCategoryName(category:object) { 
    return this.service.updateCategoryName('category',category)
 } 
  loadCategories() { 
    return this.service.getCategories('category') 
  }
  
  createProduct(product:object){
     return this.service.createProduct('products', product)
  }
   
  getOutOfStock(token:string){ 
    return this.service.getOutOfStock('products/outofstock/never',token)
  }

  updateStock(updatedProduct: { quantityInStock: string; productToUpdate: object; },token:any) { 
        return this.service.updateStock('products/addstock',updatedProduct,token)
  }

  getTodayOrders(  token: any) { 
    return this.service.getTodayOrders('orders/today', token )
  }
 
  getOrderDetails(_id:Object){
    return this.service.getOrderDetails('orders', _id)
  }
}

