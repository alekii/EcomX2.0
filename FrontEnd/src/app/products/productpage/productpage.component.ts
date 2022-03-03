import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Cart } from '../../shared/cart.model';
import { Products } from '../../shared/products.model';
import { ShoppingCartService } from '../../ShoppinCart.Service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css'],
})
export class ProductpageComponent implements OnInit {
  id: number;
  productName: string;
  product: Products;
  cartForm: FormGroup;
  quantity: number;
  loadStatus: string;
  isVisible = false;
  cart: Cart[];
  quantityInStock: number;
  opq: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private shoppingCart: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productName = params['productName'].replace(/\-/, ' ');
    });
    this.taskService.getProduct(this.productName).subscribe((res: any) => {
      this.product = res; 
      this.opq = res.quantityInStock
      let getNoInStock = this.shoppingCart.getNoInStock(this.product._id)
      this.product.quantityInStock -= getNoInStock
    },(error)=>{ 
        this.router.navigate(['/products/product-out-ofstock'])
      
    }, );

    this.cartForm = new FormGroup({
      quantity: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
    this.cartForm.setValue({
      quantity: 1,
    });
    this.cart = this.shoppingCart.getCartItems(); 
  }

  increaseQuantity() {
    let quantity = Math.abs(this.cartForm.value['quantity']);
    if (quantity >= this.product.quantityInStock) return;
    let newQuantity = quantity + 1;
    this.cartForm.setValue({
      quantity: newQuantity,
    });
  }
  decreaseQuantity() {
    let quantity = this.cartForm.value['quantity'];
    if (quantity <= 1) return;
    let newQuantity = quantity - 1;
    this.cartForm.setValue({
      quantity: newQuantity,
    });
  }

  onSubmit() {
    if (!this.cartForm.valid) return
    const quantity = Math.abs(this.cartForm.value['quantity']);
    if (quantity > this.product.quantityInStock || quantity <= 0) {
      this.loadStatus =
        this.product.quantityInStock + ' items left to shop';
    }
    else {
      this.product.quantityInStock -= quantity
      const amount = this.product.price * quantity;
      this.isVisible = true;
      this.loadStatus = 'Adding to cart....';
      this.shoppingCart.addCartItems(this.product._id, this.product.productID, this.product, quantity, this.opq);
      setTimeout(() => {
        this.loadStatus = 'Added To Cart Successfully.';
        this, (this.isVisible = false);
      }, 500);
    }
  }
} 
