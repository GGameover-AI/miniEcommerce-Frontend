import { Routes } from '@angular/router';
import { ProductList } from './pages/product/product-list/product-list';
import { ProductDetail } from './pages/product/product-detail/product-detail';
import { Profile } from './pages/user/profile/profile';
import { Cart } from './pages/order/cart/cart';
import { Checkout } from './pages/order/checkout/checkout';

export const routes: Routes = [
    {path:'',component:ProductList},
    {path:'detail/:id',component:ProductDetail},
    {path:'cart',component:Cart},
    {path:'payment',component:Checkout},
    {path:'profile/:id',component:Profile},
];
