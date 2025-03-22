import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrdersTableComponent } from './components/admin/orders-table/orders-table.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { UserDetailComponent } from './components/admin/user-detail/user-detail.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    DetailProductComponent,
    LoginComponent,
    RegisterComponent,
    DetailProductComponent,
    OrderDetailComponent,
    AppComponent,
    OrderHistoryComponent,
    NotificationComponent,
    MyAccountComponent,
    AdminComponent,
    OrdersTableComponent,
    NavbarComponent,
    UserTableComponent,
    UserDetailComponent,
    ChatBoxComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true, // Đảm bảo Angular sử dụng nhiều Interceptor nếu cần
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
