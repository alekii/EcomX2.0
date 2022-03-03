import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs'; 
import { Category } from '../../shared/category.model';

@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.component.html',
  styleUrls: ['./categorypage.component.css']
})
export class CategorypageComponent implements OnInit,OnDestroy { 
  categories:Category[]
  category:string
  subscription: Subscription

  constructor(private route:ActivatedRoute, ) { }
 

  ngOnInit(): void { 
   this.subscription = this.route.params
    .subscribe((params:Params)=>{
      this.category = params['id'] 
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
