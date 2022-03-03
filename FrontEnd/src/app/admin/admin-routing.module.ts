import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { AdminGuard } from "./admin-guard.service";

import { AdminComponent } from "./admin.component";
import { CategoriesComponent } from "./categories/categories.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductsComponent } from "./products/products.component";


const adminRoutes:Routes = [
    { path: 'admin', component:AdminComponent,children:[
        { path: '', component:DashboardComponent}, 
        { path: 'dashboard', component:DashboardComponent},
        { path: 'products', component:ProductsComponent},
        { path: 'orders', component:OrdersComponent},
        { path: 'categories', component:CategoriesComponent}
        ],canActivate:[AdminGuard]},
];

@NgModule({
   imports:[RouterModule.forChild(adminRoutes)],
   exports: [RouterModule]
})

export class AdminRoutingModule{}

