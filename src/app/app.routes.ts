import { Routes } from '@angular/router';
import { ProductList } from './pages/product/product-list/product-list';
import { ProductDetail } from './pages/product/product-detail/product-detail';
import { Profile } from './pages/user/profile/profile';
import { Cart } from './pages/order/cart/cart';
import { Checkout } from './pages/order/checkout/checkout';
import { Login } from './pages/user/login/login';
import { Register } from './pages/user/register/register';

export const routes: Routes = [
    {path:'',component:ProductList},
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:'detail/:id',component:ProductDetail},
    {path:'cart',component:Cart},
    {path:'checkout',component:Checkout},
    {path:'profile',component:Profile},
];
