import { TaskService } from "./task.service";
import { Category } from './../shared/category.model';
import { Injectable } from "@angular/core";
import { SelectMultipleControlValueAccessor } from "@angular/forms";
import { SlicePipe } from "@angular/common";

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

        if(this.categories.length===0){
            await sleep(2000).then(async res=>{
                if(this.categories.length===0){
                    await sleep(2000)
                }
            })
        }
        return this.categories; 
    }
}

function sleep(ms: number) { 
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms)
    })
}
