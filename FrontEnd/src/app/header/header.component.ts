import { Component, OnDestroy, OnInit, Output } from '@angular/core'; 
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Subscription } from 'rxjs'; 
import { Cart } from '../shared/cart.model';
import { ShoppingCartService } from '../services/ShoppinCart.Service';
import { TokenStorage } from './../services/tokenstorage.service';
import { User } from '../shared/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  itemsInCart:number;
  subscription : Subscription;
  searchForm:FormGroup;  
  user:User;
  userIsPresent = false;
  constructor(private shoppingCart: ShoppingCartService,
    private router:Router,
    private route:ActivatedRoute,
    private tokenStorage: TokenStorage) {  
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
    this.tokenStorage.userProfile.subscribe((data:any)=>{ 
      if(data.firstName!==''){ 
        this.userIsPresent = true;
        this.user = data 
      }else{ 
        this.userIsPresent = false; 
      }
    });
  }
  ngOnDestroy(): void { 
    this.subscription.unsubscribe();
  }

  search(){
    const rawText = this.searchForm.value['searchTerm']
    if(rawText!=null){ 
    const searchText = rawText.trim(); 
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
    this.router.navigate(['./search/'+searchText]);
  });
  }
}
  logOut(){ 
    this.tokenStorage.signout()
    this.router.navigate(['/'])
  }
}
