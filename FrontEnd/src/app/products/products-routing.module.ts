import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { OutofstockComponent } from "./outofstock/outofstock.component";
import { CategorypageComponent } from "./categorypage/categorypage.component"; 
import { SearchComponent } from "./search/search.component";

const productsRoutes:Routes = [
    { path: 'category/:id', component: CategorypageComponent, }, 
    { path: 'search/:searchText', component: SearchComponent },
    {path:'products/product-out-ofstock', component:OutofstockComponent},
  
]

@NgModule({
    
    imports:[
        RouterModule.forChild(productsRoutes)
    ],
    exports:[RouterModule, ReactiveFormsModule]
})

export class ProductsRoutingModule{}