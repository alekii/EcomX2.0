import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
  import { CartComponent } from './cart/cart.component';
 import { CheckoutComponent } from './checkout/checkout.component';
import { CustomRouteReuseStrategy } from './services/custom-route-reuse-strategy.service';
 import { HomeComponent } from './home/home.component'; 
 import { RefreshComponent } from './refresh/refresh.component';
import { RouteResolver } from './products/resolvers/route.resolver';
import { CheckoutGuard } from './checkout/checkout-guard.service';
import { OrderSuccesComponent } from './order-succes/order-succes.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { myData: RouteResolver },
  },
  { path: 'cart', component: CartComponent },
 { path: 'refresh', component: RefreshComponent },
  { path: 'checkout', component:CheckoutComponent,canActivate:[CheckoutGuard]},
  {path:'ordersuccess/:orderID', component:OrderSuccesComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteResolver,{
    provide:RouteReuseStrategy,
    useClass:CustomRouteReuseStrategy
  }],
})
export class AppRoutingModule {}
