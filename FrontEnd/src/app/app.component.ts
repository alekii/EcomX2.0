import { Component, OnInit } from '@angular/core';  
import { AuthService } from './services/auth.service';
import { User } from './shared/user.model';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'westshop';  
  ngOnInit():void{ 
  }
}
