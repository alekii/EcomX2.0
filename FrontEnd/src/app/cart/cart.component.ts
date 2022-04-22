import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cart } from '../shared/cart.model';
import { ShoppingCartService } from '../services/ShoppinCart.Service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Cart[];
  itemsInCart = false;
  cartTotal = 0;
  subscription: Subscription;
  quantityForm: FormGroup;
  maxquantity: number;
  constructor(private shoppingCart: ShoppingCartService) {}
  ngOnInit(): void {
    this.cartItems = this.shoppingCart.getCartItems();
    this.subscription = this.shoppingCart.cartChanged.subscribe(
      (cartItems: Cart[]) => {
        this.cartItems = cartItems;
        this.cartTotal = this.shoppingCart.getcartTotal();
        this.checkItems();
        console.log(this.cartItems);
      }
    );

    this.cartTotal = this.shoppingCart.getcartTotal();
    this.checkItems();

    this.quantityForm = new FormGroup({
      selControl: new FormControl(null),
    });
  }

  checkItems() {
    if (this.cartItems.length > 0) {
      this.itemsInCart = true;
    } else {
      this.itemsInCart = false;
    }
  }
  counter(no: number) {
    return new Array(no);
  }

  onQuantityChange(index: number) {
    const quant = Number(this.quantityForm.value['selControl']);
    this.shoppingCart.updateSubtotal(index, quant);
  }

  removeFromCart(index: number) {
    this.shoppingCart.deleteCart(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
