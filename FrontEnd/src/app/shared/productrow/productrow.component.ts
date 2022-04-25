import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  resultsnumber= 0;
  loading=true;
  isSearch = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void { 
    this.hasResults = true;
    if (this.category === 'Search Results') {
      this.loading = true;
      this.isSearch = true;
      this.getSearchResults().then((result) =>  
      this.result.forEach((result) => {
        result.productUrl = result.title.replace(/ /gi, '-') + '.html';
      }));
    } else { 
      this.loading = false; 
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
    }, 1000);
  }
  getSearchResults(): Promise<any> { 
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.result = this.searchService.getSearchResults();  
        if (this.result.length === 0) {
          this.hasResults = false;
        } 
        this.resultsnumber = this.result.length
        resolve(this.result);
        this.loading = false;
      },1500);
    });
    return promise;
  }
}
