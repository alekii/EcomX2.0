 import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Category } from 'src/app/shared/category.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  clicklistener: any;
  categories: Category[] = [];
  editMode = false;
  
  constructor(
    private taskService: TaskService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  @ViewChild('categoryContainer') cc: ElementRef;
  @ViewChild('categoryNameToEdit') cte: ElementRef;

  ngOnInit(): void { 
    this.taskService.loadCategories().subscribe((response:any)=>{
         response.forEach((res:any) => {
             this.categories.push(res.name)
         }); 
    })
  }

  onSubmit(form: NgForm) { 
    const categoryName = form.value.categoryName;
    if (!categoryName) return;
    let category = {
      name:categoryName
    }
    if (this.categories.indexOf(categoryName) >= 0) return; 
    this.taskService.addCategory(category).subscribe((res:any)=>{ 
      this.categories.unshift(res.name);   
    }, (error:any)=>{
      
    }) 
    const li = this.renderer.createElement('li');
      const cat = this.renderer.createText(categoryName);
      this.renderer.appendChild(li, cat);
      this.renderer.insertBefore(
        this.cc.nativeElement,
        li,
        this.cc.nativeElement.firstChild
      );
      this.clicklistener = this.renderer.listen(li, 'click', (e) => {
          this.showUpdateForm(li)
      });
      form.reset(); 
  } 

  showUpdateArea(index:number){
    this.cte.nativeElement.textContent = this.cc.nativeElement.children[index].textContent;
        this.editMode = true; 
  }

  showUpdateForm(li:HTMLUListElement){
    this.cte.nativeElement.textContent = li.textContent;
        this.editMode = true; 
  }

  onUpdate(form: NgForm) {
    const newCategoryName = form.value.newCategoryName;  
    if (this.categories.indexOf(newCategoryName) >= 0) return;
    let nativeContent = this.cte.nativeElement.textContent ; 
    let cat = this.categories.find((p) => p=== nativeContent);  
    let newcategory = {
      oldname:cat,
      newname:newCategoryName, 
      
    } 
    this.taskService.updateCategoryName(newcategory).subscribe((res:any)=>{ 
    },(error:any)=>{

    })
      const index = this.categories.indexOf(nativeContent) 
      this.cc.nativeElement.children[index].textContent = newCategoryName;
      this.categories[index]= newCategoryName;
      this.editMode = false;
      form.reset(); 
  }
}
