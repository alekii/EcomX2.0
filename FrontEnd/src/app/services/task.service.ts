import { Injectable } from '@angular/core';  
import { Products } from '../shared/products.model'; 
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

   createOrder(order:Object){
     return this.service.createOrder('orders', order)
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
   
  getOutOfStock(){ 
    return this.service.getOutOfStock('products/outofstock/never')
  }

  updateStock(updatedProduct: { quantityInStock: string; productToUpdate: object; }) { 
        return this.service.updateStock('products/addstock',updatedProduct)
  }

  getTodayOrders() { 
    return this.service.getTodayOrders('orders/today')
  }
 
  getOrderDetails(_id:Object){
    return this.service.getOrderDetails('orders', _id)
  }
}

