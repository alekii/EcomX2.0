import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminGuard } from "./admin-guard.service";

@NgModule({
    declarations:[ 
        AdminComponent,
        DashboardComponent,
        ProductsComponent,
        OrdersComponent,
        CategoriesComponent,
    ],

imports:[
    CommonModule,
    AdminRoutingModule,
    FormsModule
],
providers:[AdminGuard]
 
})
export class AdminModule{ }