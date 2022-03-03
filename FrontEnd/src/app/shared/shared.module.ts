import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductrowComponent } from './productrow/productrow.component'; 
import { ShareRoutingModule } from "./shared-routing.module";

@NgModule({
    declarations:[ProductrowComponent,
    ],
    imports:[CommonModule,ShareRoutingModule],
    exports:[ProductrowComponent]
})

export class SharedModule {}