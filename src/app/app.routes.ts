import { Routes } from '@angular/router';
import { ProductList } from './pages/product/product-list/product-list';
import { ProductDetail } from './pages/product/product-detail/product-detail';
import { Profile } from './pages/user/profile/profile';
import { Cart } from './pages/order/cart/cart';
import { Checkout } from './pages/order/checkout/checkout';
import { Login } from './pages/user/login/login';
import { Register } from './pages/user/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'register',component:Register},


    {path:'',component:ProductList,canActivate:[authGuard]},
    {path:'detail/:id',component:ProductDetail,canActivate:[authGuard]},
    {path:'cart',component:Cart,canActivate:[authGuard]},
    {path:'checkout',component:Checkout,canActivate:[authGuard]},
    {path:'profile',component:Profile,canActivate:[authGuard]},
];
