import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { Products } from "./shared/products.model";

@Injectable()
export class SearchService{
    result:Products[]
    constructor(private productService: ProductService){}
 
    setSearchResults(searchTerm: String){
     this.result = this.productService.getProductsByCategory()
     .filter(product=>product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    getSearchResults(){
        return this.result
    }
}