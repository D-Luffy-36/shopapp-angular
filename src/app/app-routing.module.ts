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
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { OrdersTableComponent } from './components/admin/orders-table/orders-table.component';
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { UserDetailComponent } from './components/admin/user-detail/user-detail.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products/:id', component: DetailProductComponent },
    { path: 'orders', component: OrderComponent, canActivate: [UserGuard] },
    { path: 'orders/:id', component: OrderDetailComponent },
    { path: 'history', component: OrderHistoryComponent },
    { path: 'detail-product/:id', component: DetailProductComponent },
    { path: 'notification', component: NotificationComponent },
    { path: 'my-account', component: MyAccountComponent, canActivate: [UserGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'admin/orders', component: OrdersTableComponent, canActivate: [AdminGuard] },
    { path: 'admin/users', component: UserTableComponent, canActivate: [AdminGuard] },
    { path: 'admin/users/:id', component: UserDetailComponent, canActivate: [AdminGuard] },
    // { path: '**', redirectTo: '' }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }

// canActivate là một phương thức trong Angular Route Guard,
// được sử dụng để kiểm soát quyền truy cập vào các route (đường dẫn) trong ứng dụng.

// Nó giúp bạn kiểm tra xem người dùng có được phép truy cập một route
//  hay không trước khi Angular tải component đó lên.