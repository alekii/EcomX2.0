import { Component, OnInit } from '@angular/core';  
import { Category } from 'src/app/shared/category.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Category []
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {

     this.taskService.loadCategories().subscribe((res:any)=>{ 
      this.categories = res
     })

}
}
