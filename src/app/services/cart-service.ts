import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartStock = new BehaviorSubject<ProductModel[]>([])
  cartStock$ = this.cartStock.asObservable()

  addToCart(newProduct:ProductModel){
    const currentCart = this.cartStock.value
    const validProduct = currentCart.find(e => e.id === newProduct.id)

    if(validProduct){
      validProduct.quantity += 1
      this.cartStock.next([...currentCart])
    }
    else{
      this.cartStock.next([...currentCart,{...newProduct,quantity:1}])
    }

    console.log("Products In Cart : ",this.cartStock.value)
  }

  changeQTY(idProduct:number,qty:number){
    const currentCart = this.cartStock.value
    const validProduct = currentCart.find(e => e.id === idProduct)

    if(validProduct && validProduct.quantity !== 0){
      validProduct.quantity = Math.max(1,validProduct.quantity + qty)
      this.cartStock.next([...currentCart])
    }else{
      console.log("ไม่พบสินค้า")
    }
    
    console.log("changed QTY : ",this.cartStock.value , validProduct)
  }

  removeFromCart(idProduct:number){
    const currentCart = this.cartStock.value
    const updated = currentCart.filter(e => e.id !== idProduct)

    this.cartStock.next([...updated])
  }

  clearCart(){
    this.cartStock.next([])
  }
}
