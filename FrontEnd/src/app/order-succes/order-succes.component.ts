import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-order-succes',
  templateUrl: './order-succes.component.html',
  styleUrls: ['./order-succes.component.css']
})
export class OrderSuccesComponent implements OnInit {
   orderID:number
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.orderID = +params['orderID']
    })
  }

}
