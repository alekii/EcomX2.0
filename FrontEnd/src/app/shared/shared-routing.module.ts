import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductpageComponent } from "../products/productpage/productpage.component";

const productRoute: Routes = [
    {
        path: 'product/:id/:productName', component: ProductpageComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(productRoute)],
    exports: [RouterModule]
})

export class ShareRoutingModule { }