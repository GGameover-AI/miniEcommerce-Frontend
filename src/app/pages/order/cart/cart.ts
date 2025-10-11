import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { ProductModel } from '../../../models/product-model';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart()
  }

  currentCart: ProductModel[] = []

  //#region QTY Control
  onIncrease(idProduct: number) {
    this.cartService.changeQTY(idProduct, 1)
  }
  onDecrease(idProduct: number) {
    this.cartService.changeQTY(idProduct, -1)
  }

  onRemove(idProduct: number) {
    setTimeout(() => {
      this.cartService.removeFromCart(idProduct)
    }, 200)
  }
  //#endregion

  onClearList(){
    if(confirm('ต้องการลบรายการทั้งหมดหรือไม่')){
      this.cartService.clearCart()
    }
  }

  //TotalPrice
  totalPrice(){
    return this.currentCart.reduce((sum,p) => sum + (p.price * p.quantity),0)
  }

  loadCart() {
    this.cartService.cartStock$.subscribe(
      (res) => {
        this.currentCart = res
      }
    )
  }
}
