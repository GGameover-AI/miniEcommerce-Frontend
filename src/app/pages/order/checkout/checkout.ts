import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { NgClass } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import { ProductModel } from '../../../models/product-model';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  constructor(private cartService:CartService){}


    userContact = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
    email: new FormControl('', [Validators.email]),
    address: new FormControl('',[Validators.required])
  })

    userCredit = new FormGroup({
      cardHolder: new FormControl('',[Validators.required]),
      cardNumber: new FormControl('',[Validators.required,Validators.maxLength(16)]),
      cardExpdate: new FormControl('',[Validators.required]),
      cardCVVorCVC: new FormControl('',[Validators.required,Validators.maxLength(3)])
    })

  get fullName(){return this.userContact.get('fullName')}
  get phone(){return this.userContact.get('phone')}
  get email(){return this.userContact.get('email')}
  get address(){return this.userContact.get('address')}

  get cardHolder(){return this.userCredit.get('cardHolder')}
  get cardNumber(){return this.userCredit.get('cardNumber')}
  get cardExpdate(){return this.userCredit.get('cardExpdate')}
  get cardCVVorCVC(){return this.userCredit.get('cardCVVorCVC')}

  onSubmit() {
    const formInfo = {...this.userContact.value,...this.userCredit.value}
    
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
