import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthComponent } from './auth.component';
import { AuthRouting } from "./auth-routing.module";

@NgModule({
    declarations:[
      SignupComponent,
      LoginComponent,
      AuthComponent
    ],

    imports:[
        CommonModule, 
        AuthRouting,
        ReactiveFormsModule
    ]
})

export class AuthModule{}