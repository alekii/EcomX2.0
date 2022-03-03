import { Component, OnDestroy, OnInit, Output } from '@angular/core'; 
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Cart } from '../shared/cart.model';
import { ShoppingCartService } from '../ShoppinCart.Service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  itemsInCart:number;
  subscription : Subscription;
  searchForm:FormGroup;  
  constructor(private shoppingCart: ShoppingCartService,
    private router:Router,
    private route:ActivatedRoute) {  
    }

  ngOnInit(): void {
    this.itemsInCart = this.shoppingCart.getNoItems();
    this.subscription = this.shoppingCart.cartChanged
    .subscribe(
      (cart:Cart[])=>{ 
          this.itemsInCart = this.shoppingCart.getNoItems(); 
      });

    this.searchForm = new FormGroup({
      searchTerm: new FormControl(null)
    })  
  }
  ngOnDestroy(): void { 
    this.subscription.unsubscribe();
  }

  search(){
    const searchText = (this.searchForm.value['searchTerm']).trim();  
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
    this.router.navigate(['./search/'+searchText]);
  });
  }
  logOut(){
    localStorage.removeItem('Token');
    this.router.navigate(['/'])
  }
}
