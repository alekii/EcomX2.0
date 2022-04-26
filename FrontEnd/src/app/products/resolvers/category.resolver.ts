import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryResolver implements Resolve<any>{
  loaded = false
  productName: string;
  constructor(private categoryService: CategoryService) {
  }

  resolve() {
    if (!this.loaded) {
      this.categoryService.loadCategories()
      return
    } else {
      return
    }
  }

}