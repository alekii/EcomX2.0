import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm : FormGroup
  PasswordForm : FormGroup
  submitted: boolean;
  userRegistered:Boolean

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['',[Validators.required,Validators.pattern(/^[a-zA-Z].{1,16}$/)]],
      lastName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(16)]],
      email:['',Validators.email], 
        password:[''],
        confirmpassword:['',Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/)],
      },
        
      {
        validators:[this.validatePassword('password', 'confirmpassword')]
      }
    )
    
  }
  validatePassword(pass:string, confirmpass:string):ValidatorFn { 
       return(controls:AbstractControl):ValidationErrors | null  =>{
         let passControl = controls.get(pass);
         let confirmpassControl = controls.get(confirmpass); 
       
        if(confirmpassControl?.errors != confirmpassControl?.errors?.MatchPassword){
            return null
        }
       
         if(passControl?.value != confirmpassControl?.value){
          controls.get(confirmpass)?.setErrors({
            MatchPassword:true
          })
          return {MatchPassword:true}
         } else {
           return null
         }
      
       }
  }

get f(){
  return this.signUpForm.controls
}

createUser(){  
  this.submitted = true
  if(this.signUpForm.valid){  

    this.authService.createUser(this.signUpForm.value).subscribe(res =>{  
      if(res.status === 200){
        this.userRegistered = true
        this.router.navigateByUrl('/auth/login')
      }
    },(error)=>{;
    })

  }
}


}
