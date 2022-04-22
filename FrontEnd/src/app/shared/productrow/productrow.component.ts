import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';
import { Products } from 'src/app/shared/products.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-productrow',
  templateUrl: './productrow.component.html',
  styleUrls: ['./productrow.component.css'],
})
export class ProductrowComponent implements OnInit {
  @Input() columns: any;
  @Input() category: string;
  products: Products[];
  result: Products[] = [];
  hasResults = true;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // this.products = this.route.snapshot.data['myData']

    this.hasResults = true;
    if (this.category === 'Search Results') {
      this.getSearchResults().then((result) => 
      this.result.forEach((result) => {
        result.productUrl = result.title.replace(/ /gi, '-') + '.html';
      }));
    } else { 
    let products =  this.taskService.getProductsByCategory(this.category)  
        products.subscribe((response: any) => {
        this.result = response;
        this.result.forEach((result) => {
          result.productUrl = result.title.replace(/ /gi, '-') + '.html';
        });
      });
    }
  }
  getResults() {
    setTimeout(() => {
      this.products.forEach((cat: any) => {
        if (
          cat.category.trim().toLowerCase() ===
          this.category.trim().toLowerCase()
        ) {
          this.result.push(cat);
        }
      });
    }, 100);
  }
  getSearchResults(): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.result = this.searchService.getSearchResults(); 
        if (this.result.length === 0) {
          this.hasResults = false;
        }
        resolve(this.result);
      }, 100);
    });
    return promise;
  }
}
