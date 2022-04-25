import { TaskService } from "./task.service";
import { Category } from './../shared/category.model';
import { Injectable } from "@angular/core";
import { SelectMultipleControlValueAccessor } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    categories: Category[]=[] 
    constructor(private taskService: TaskService) { }

    loadCategories() {
        this.taskService.loadCategories().subscribe((res: any) => {
            this.categories = res;  
        });
    }
    async getCategories() {
        await sleep(200);
        return this.categories; 
    }
}

function sleep(ms: number) { 
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms)
    })
}
