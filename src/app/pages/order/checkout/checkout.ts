import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { NgClass } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import { ProductModel } from '../../../models/product-model';
import { OrderModel } from '../../../models/order-model';
import { OrderService } from '../../../services/order-service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  constructor(private cartService: CartService ,private orderService:OrderService,private route:Router) { }


  userContact = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
    email: new FormControl('', [Validators.email]),
    address: new FormControl('', [Validators.required])
  })

  userCredit = new FormGroup({
    cardHolder: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16)]),
    cardExpdate: new FormControl('', [Validators.required]),
    cardCVVorCVC: new FormControl('', [Validators.required, Validators.maxLength(3)])
  })

  get fullName() { return this.userContact.get('fullName') }
  get phone() { return this.userContact.get('phone') }
  get email() { return this.userContact.get('email') }
  get address() { return this.userContact.get('address') }

  get cardHolder() { return this.userCredit.get('cardHolder') }
  get cardNumber() { return this.userCredit.get('cardNumber') }
  get cardExpdate() { return this.userCredit.get('cardExpdate') }
  get cardCVVorCVC() { return this.userCredit.get('cardCVVorCVC') }

  onSubmit() {
    this.cartService.cartStock$.pipe(take(1)).subscribe(
      {
        next: (res) => {
          const orderInfo: OrderModel = {
            recipient: this.fullName?.value as string,
            phone: this.phone?.value as string,
            email: this.email?.value as string,
            address: this.address?.value as string,
            paymentType: "CreditCard",
            cardNumber: this.cardNumber?.value as string,
            cardHolder: this.cardHolder?.value as string,
            cardExp: this.cardExpdate?.value as string,
            cvc: Number(this.cardCVVorCVC?.value),
            products: res
          }

          this.orderService.createOrder(orderInfo).pipe(take(1)).subscribe(
            {
              next:(res) => {
                alert(res.message)
                this.cartService.clearCart()
                this.route.navigate([''])
              },
              error:(err)=>{
                console.log(err)
                alert(err.error)
              }
            }
          )
        }
      }
    )
  }

  //ป้องกันการใส่ตัวอักษรอื่นนอกจาก 0-9
  onlyNumber(event: KeyboardEvent) {
    const charCode = event.charCode
    //ตัวเลขคือ ASCII code ของ keyboard
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
