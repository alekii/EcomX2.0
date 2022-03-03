import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service'; 

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
  constructor(private fb : FormBuilder,private auth:AuthService, private router:Router,private route:ActivatedRoute) { }
  
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
    .login(this.user).subscribe(res => {
      if(res.status===200){
        this.router.navigate(['../'])
        this.auth.saveToLocalStorage(res); 
      }
    }, (error) => { 
      this.errorMessage=true
    }
    )
  //  .pipe(switchMap(()=>
  //        this.auth.getUserProfile()))
    
    
    
  }

}
