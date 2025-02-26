import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MyAccountComponent } from './components/my-account/my-account.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products/:id', component: DetailProductComponent },
    { path: 'orders', component: OrderComponent },
    { path: 'orders/:id', component: OrderDetailComponent },
    { path: 'history', component: OrderHistoryComponent },
    { path: 'detail-product/:id', component: DetailProductComponent },
    { path: 'notification', component: NotificationComponent },
    { path: 'my-account', component: MyAccountComponent }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
// import { DetailProductComponent } from './components/detail-product/detail-product.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent }, // Route mặc định cho HomeComponent
//   { path: 'detail-product/:id', component: DetailProductComponent }, // Route cho DetailProductComponent
//   // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
