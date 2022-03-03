import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductpageComponent } from "../products/productpage/productpage.component";
import { RouteResolver } from "../products/resolvers/route.resolver";

const productRoute:Routes = [
    { path: 'product/:id/:productName', component: ProductpageComponent,resolve: { myData: RouteResolver }  },
    
]

@NgModule({
   imports:[RouterModule.forChild(productRoute)],
   exports:[RouterModule],
   providers:[RouteResolver]
})

export class ShareRoutingModule{}