import { Component, OnInit } from '@angular/core';  
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { User } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'westshop'; 
  userInfo?: User
  constructor(private auth: AuthService ){}
  ngOnInit():void{
  }
}
