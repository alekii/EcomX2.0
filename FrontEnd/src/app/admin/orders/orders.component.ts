import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/shared/products.model';
import { TaskService } from 'src/app/services/task.service';
import { Orders } from './orders.model';
import { TokenStorage } from './../../services/tokenstorage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderDetails: any[]
  orderIDs: Orders[]
  products: Products[] = []
  @ViewChild('shipmentInfo') shipmentDetails: ElementRef
  orderID: any
  seenDetails: boolean;
  constructor(private taskService: TaskService, private tokenStorage: TokenStorage) { }
  ngOnInit(): void {
    let Token = this.tokenStorage.getToken()?.replace(/"/gi, "")
    if (Token) {
      this.taskService.getTodayOrders().subscribe((res: any) => {
        this.orderIDs = res
      })
    }
  }

  getOrderDetails(index: number) {
    this.seenDetails = true
    this.products = []
    this.orderID = this.orderIDs[index].orderID
    let _id = this.orderIDs[index]._id
    this.taskService.getOrderDetails(_id).subscribe((response: any) => {
      this.orderDetails = response
      for (let i = 0; i < this.orderDetails[0].length; i++) {
        this.products.push(this.orderDetails[0][i])
        this.products[i].category = response[2][i]
        this.products[i].productUrl = (this.products[i].title).replace(/ /gi, "-") + ".html"

      }
    })
  }

}
