import { Injectable } from "@angular/core"; 
import { Products } from "../shared/products.model";
import { TaskService } from "./task.service";

@Injectable()
export class SearchService{
    result:Products[]
    constructor(private taskService: TaskService){}
 
    setSearchResults(searchTerm: String){ 
    this.taskService.searchProduct(searchTerm).subscribe((res:any)=>{ 
        this.result = res;
    })
    }

    getSearchResults(){
        return this.result
    }
}