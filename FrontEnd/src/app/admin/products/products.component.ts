import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/shared/category.model';
import { Products } from 'src/app/shared/products.model';
import { TaskService } from 'src/app/services/task.service';
import { TokenStorage } from './../../services/tokenstorage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  categories: Category[] = [];
  outOfStock: Products[] = [];
  @ViewChild('loadStatus') loadStatus: ElementRef;
  valid: boolean;
  @ViewChild('parentUl') parent: ElementRef;
  @ViewChild('message') message :ElementRef;
  token:any

  constructor(
    private taskService: TaskService,
    private router: Router,
    private renderer: Renderer2,
    private auth: AuthService,
    private tokenStorage:TokenStorage
  ) {}

  ngOnInit(): void {
    let task = this.taskService.loadCategories();
    this.token = this.tokenStorage.getToken()?.replace(/"/gi, '');
    if (!this.token) {
      this.router.navigate(['/auth/login']);
      return;
    }
    let getOutOfStock = this.taskService.getOutOfStock();

    task.subscribe((res: any) => {
      this.categories = res;
    });

    getOutOfStock.subscribe((res: any) => { 
      this.outOfStock = res;
    });
  }

  onSubmit(form: NgForm) {
    this.auth.isAdminAuthorized();
    const p = this.loadStatus.nativeElement;
    if (!form.valid && form.value.category != 'Select Category') {
      this.valid = false;
      p.textContent = 'Please check your entries and try again';
      return;
    }

    let categoryId = this.categories.find(
      (c) => c.name === form.value.category
    )?._id;
    let product = {
      title: form.value.title,
      price: form.value.price,
      quantityInStock: form.value.quantity,
      imagePath: form.value.imagePath,
      category: categoryId,
    };
    this.taskService.createProduct(product).subscribe((res:any) => {
      console.log(res);
      if (res.status === 200) {
        this.valid = true;
        p.textContent = 'Product added Successfully';
        form.reset();
      } else {
        p.textContent = 'Price/Quantity should be a number'; 
      }
    });
  }
  updateQuantity(index: number) {
    const paro = this.parent.nativeElement;
    const li = paro.children[index];
    if (li.children.length >= 1) return;
    const nextSibling = this.parent.nativeElement.children[index + 1];
    const form = this.renderer.createElement('form');
    const textinput = this.renderer.createElement('input');
    this.renderer.appendChild(form, textinput);
    this.renderer.setAttribute(textinput, 'type', 'text');
    const submitButton = this.renderer.createElement('input');
    this.renderer.appendChild(form, submitButton);
    this.renderer.listen(submitButton, 'click', (e) => {
      e.preventDefault();
      this.updateStock(li, form, textinput.value, index);
    });
    this.renderer.setAttribute(submitButton, 'type', 'submit');
    this.renderer.setAttribute(submitButton, 'value', 'Add Stock');
    this.renderer.appendChild(paro.children[index], form); 
  }

  updateStock(
    li: HTMLUListElement,
    form: HTMLFormElement,
    stockAmount: string,
    index: number
  ) {
console.log(typeof(stockAmount))
    if (!this.token) {
      this.router.navigate(['/auth/login']);
      return;
    }
  let updatedProduct = {
    
    quantityInStock: stockAmount,
    productToUpdate: this.outOfStock[index]._id
  }
  
  this.taskService.updateStock(updatedProduct).subscribe((res:any)=>{ 
    const newStock = Number(stockAmount);
    const product = this.outOfStock[index];
    this.renderer.setStyle(form, 'display', 'none');
    this.renderer.setStyle(li, 'display', 'none'); 
    this.message.nativeElement.textContent = product.title + " has been added with " + newStock + " items "
  }, (error:any)=>{ 
    this.message.nativeElement.textContent = "We were unable to handle your request at this time"
  })
  }
}
