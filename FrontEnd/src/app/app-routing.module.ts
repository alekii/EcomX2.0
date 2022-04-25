import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomRouteReuseStrategy } from './services/custom-route-reuse-strategy.service';
import { HomeComponent } from './home/home.component';
import { RefreshComponent } from './refresh/refresh.component';
import { CheckoutGuard } from './checkout/checkout-guard.service';
import { OrderSuccesComponent } from './order-succes/order-succes.component';
import { CategoryResolver } from './products/resolvers/category.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    resolve: { myData: CategoryResolver }
  },

  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent, 
    resolve: { myData: CategoryResolver }
  },
  { path: 'cart', component: CartComponent },
  { path: 'refresh', component: RefreshComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard] },
  { path: 'ordersuccess/:orderID', component: OrderSuccesComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CategoryResolver, {
    provide: RouteReuseStrategy,
    useClass: CustomRouteReuseStrategy
  }],
})
export class AppRoutingModule { }
