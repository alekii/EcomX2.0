import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './helpers/authinterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './home/hero/hero.component';
import { BannerComponent } from './home/hero/banner/banner.component';
import { SidebarComponent } from './home/hero/sidebar/sidebar.component';
import { FullContainer } from './home/full-container/full-container.component';
import { HalfContainerComponent } from './home/half-container/half-container.component';
import { HomeComponent } from './home/home.component';
import { CsvService } from './services/csv.service';
import { ProductService } from './services/product.service';
import { FilterPipe } from './shared/filter.pipe'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartService } from './services/ShoppinCart.Service';
import { CartComponent } from './cart/cart.component';
import { SearchService } from './services/search.service';
import { RefreshComponent } from './refresh/refresh.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
 import { AuthModule } from './auth/auth.module';
import { CheckoutGuard } from './checkout/checkout-guard.service';
import { OrderSuccesComponent } from './order-succes/order-succes.component';
import { OutofstockComponent } from './products/outofstock/outofstock.component';
import { TokenStorage } from './services/tokenstorage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    BannerComponent,
    SidebarComponent, 
    HomeComponent,
    FullContainer,
    HalfContainerComponent,
    FilterPipe, 
    CartComponent, 
    RefreshComponent,
    CheckoutComponent, 
    DropdownDirective, OrderSuccesComponent, OutofstockComponent,  
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ProductsModule,
    AdminModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProviders,TokenStorage,CsvService, ProductService, ShoppingCartService, SearchService,
  CheckoutGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
