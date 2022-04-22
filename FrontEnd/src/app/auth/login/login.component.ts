import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { TokenStorage } from './../../services/tokenstorage.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted:Boolean;
  user:Object
  errorMessage: boolean;
  constructor(
     private fb : FormBuilder,
     private auth:AuthService,
     private tokenStorage:TokenStorage, 
     private router:Router,
     private route:ActivatedRoute,
     private location: Location)
     { }
  
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
   }

  onSubmit(){
    this.submitted = true 
    this.user = {
      email:this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    let auth = this.auth
    .login(this.user).subscribe((res:any) => {
      if(res.status===200){  
        this.tokenStorage.saveToken(JSON.stringify(res.headers.get('x-auth-token')));
        this.tokenStorage.saveUser(res.body);   
        this.location.back()
      }
    }, () => { 
      this.errorMessage=true
    }
    )
  //  .pipe(switchMap(()=>
  //        this.auth.getUserProfile()))
    
    
    
  }

}
