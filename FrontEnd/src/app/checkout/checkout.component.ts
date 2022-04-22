import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Cart } from '../shared/cart.model';
import { ShoppingCartService } from '../services/ShoppinCart.Service';
import { TaskService } from '../services/task.service';
import { ShipmentInfo } from './shipmentInfo.model';
 
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: Cart[];
  cartTotal: number;
  order: object;
  checkoutForm: FormGroup;
  shipmentInfo: ShipmentInfo[];
  @ViewChild('cont') cont: ElementRef;

  constructor(
    private cartService: ShoppingCartService,
    private taskService: TaskService,
    private auth: AuthService,
    private router: Router  ) {}

  ngOnInit(): void {
    this.cartTotal = this.cartService.getcartTotal();
    this.getItems();

    this.checkoutForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      county: new FormControl(null),
      town: new FormControl(null),
      mpesaCode: new FormControl(),
    });

    // this.checkoutForm.get('firstName')?.setValue('Dev')
    this.checkoutForm.setValue({
      firstName: 'Dev',
      lastName: 'JJ',
      county: 'Nairobi',
      town: 'UpperHill',
      mpesaCode: '',
    });
  }

  editdetails(event: Event) {
    const form = (event.target as HTMLElement).parentElement
      ?.nextElementSibling;
    form?.children[0].classList.toggle('hide');
  }

  getItems() {
    return new Promise((resolve, reject) => {
      resolve(
        setTimeout(() => {
          this.cartItems = this.cartService.getCartItems();
        }, 1000)
      );
      reject(() => {
        throw new Error('Something went wrong');
      });
    });
  }

  getShipmentInfo() {
    this.cont.nativeElement.parentElement.classList.toggle('hide');
  }
  placeOrder() {
    this.shipmentInfo = this.checkoutForm.value; 

    this.order = {
      orderItems: this.cartItems,
      orderAmount: this.cartTotal,
      shipmentInfo: this.shipmentInfo,
    };

    this.taskService.createOrder(this.order).subscribe((res: any) => {
      if (res.orderID) {
        this.cartService.removeCartItems();
        this.router.navigate(['/ordersuccess', res.orderID]);
      }
    });
  }

  xOrder() {}
  vOrder() {}
}
