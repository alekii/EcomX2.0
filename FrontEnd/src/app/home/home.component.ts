import { Component, OnInit } from '@angular/core';  
import { Category } from '../shared/category.model'; 
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  categories:Category[] 
  constructor( private categoryService: CategoryService) { 
   } 
   ngOnInit(){ 
    this.categoryService.getCategories().then((res)=>{
      this.categories =res
    }); 
   }
}

