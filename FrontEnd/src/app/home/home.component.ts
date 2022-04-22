import { Component, OnInit } from '@angular/core';  
import { Category } from '../shared/category.model'; 
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  categories:Category[] 
  constructor( private taskService: TaskService) { 
   } 
   ngOnInit(){
     
      this.taskService.loadCategories().subscribe((res:any)=>{
      this.categories = res  
    })  
   }
}

