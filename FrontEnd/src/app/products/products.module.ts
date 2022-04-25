import { NgModule } from "@angular/core";

import { ProductpageComponent } from './productpage/productpage.component';
import { CategorypageComponent} from './categorypage/categorypage.component';
import { SearchComponent } from './search/search.component';
import { CommonModule } from "@angular/common";
import { ProductsRoutingModule } from "./products-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";





@NgModule({

    declarations:[
        ProductpageComponent,
        CategorypageComponent,
        SearchComponent,
    ], 
    imports:[
        CommonModule,
        ProductsRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})

export class ProductsModule{}